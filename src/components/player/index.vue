<template>
  <div v-show="playList.length" class="m-player">
    <!-- 普通播放器 -->
    <transition name="normal">
      <div v-show="fullScreen" class="normal-player">
        <!-- 背景图 -->
        <div class="player-background">
          <img :src="currentSong.image" width="100%" height="100%" alt="">
        </div>

        <!-- 头部 -->
        <div class="player-header">
          <span class="player-back" @click="handleCollapseClick">
            <i class="icon-back"></i>
          </span>
          <h2 class="player-title">{{currentSong.name}}</h2>
          <p class="player-subtitle">{{currentSong.singer}}</p>
        </div>

        <!-- 中部 -->
        <div
          class="player-middle"
          @touchstart.prevent="handleTouchStart"
          @touchmove.prevent="handleTouchMove"
          @touchend="handleTouchEnd">
          <div class="middle-left" ref="playerLeft">
            <div class="cd-box">
              <div class="cd-image-box">
                <img :src="currentSong.image" class="cd-image" alt="">
              </div>
            </div>
            <div class="lyric-box">
              <p class="current-lyric">{{playingLyric}}</p>
            </div>
          </div>
          <scroll class="middle-right" ref="playerLyric" :data="currentLyric && currentLyric.lines">
            <div class="lyric-box">
              <div v-if="currentLyric">
                <p
                  ref="lyricLine"
                  v-for="(item, index) in currentLyric.lines"
                  :key="index"
                  class="lyric-text"
                  :class="{'active': currentLineNum == index}"
                >{{item.txt}}</p>
              </div>
              <div v-if="isPureMusic" class="pure-music">
                <p>{{pureMusicLyric}}</p>
              </div>
            </div>
          </scroll>
        </div>

        <!-- 底部 -->
        <div class="player-bottom">
          <div class="player-dots">
            <span class="dot-item" :class="{ active: currentShow === 'cd' }"></span>
            <span class="dot-item" :class="{ active: currentShow === 'lyric' }"></span>
          </div>
          <div class="player-progress">
            <span class="progress-time time-left">{{formatPlayerSecond(currentTime)}}</span>
            <div class="progress-box">
              <progress-bar :percent.sync="percent" @changed="handlePercentChanged" />
            </div>
            <span class="progress-time time-right">{{formatPlayerSecond(currentSong.duration)}}</span>
          </div>
          <div class="player-btns">
            <div class="icon i-left" @click="handleModeChange">
              <i :class="modeIcon"></i>
            </div>
            <div class="icon i-left" @click="handlePrevClick">
              <i class="icon-prev"></i>
            </div>
            <div class="icon i-center" @click="handleTogglePlay">
              <i :class="playIcon"></i>
            </div>
            <div class="icon i-right" @click="handleNextClick">
              <i class="icon-next"></i>
            </div>
            <div class="icon i-right" @click="handleToggleFavorite(currentSong)">
              <i :class="faviroteIcon"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 迷你播放器 -->
    <transition name="mini">
      <div v-show="!fullScreen" class="mini-player" @click="handleOpenClick">
        <div class="mini-icon">
          <div class="mini-image-box">
            <img :src="currentSong.image" width="40" height="40" class="mini-image" alt="">
          </div>
        </div>
        <div class="mini-info">
          <p class="name">{{currentSong.name}}</p>
          <p class="singer">{{currentSong.singer}}</p>
        </div>
        <div class="mini-control">
          <progress-circle :percent="percent">
            <i class="icon-mini" :class="miniPlayIcon" @click.stop="handleTogglePlay"></i>
          </progress-circle>
        </div>
        <div class="mini-control" @click.stop="showPlayList=true">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>

    <!-- audio -->
    <audio
      ref="audio"
      @playing="handleAudioReady"
      @timeupdate="handleTimeUpdate"
      @pause="handleAudioPaused"
      @ended="handleAudioEnd"
    />

    <!-- 播放列表 -->
    <play-list :visible.sync="showPlayList" />
  </div>
</template>
<script lang="ts">
import Song from '@/assets/js/song'
import Player from '@/assets/js/player'
import PlayList from '@/components/playlist/index.vue'
import Scroll from '@/base/scroll/index.vue'
import ProgressBar from '@/components/progress-bar/index.vue'
import ProgressCircle from '@/components/progress-circle/index.vue'
import Lyric from 'lyric-parser'
import { Component, Mixins, Watch, Ref } from 'vue-property-decorator'
import { Getter, Mutation, Action } from 'vuex-class'
import { formatSecond } from '@/utils/utils'
import { LyricParams } from '@/types/player'
import { getVendorsPrefix } from '@/utils/dom'
const transform = getVendorsPrefix('transform')
const transitionDuration = getVendorsPrefix('transitionDuration')
interface PlayerTouch {
  initiated: boolean;
  moved: boolean;
  direction: string;
  startX: number;
  startY: number;
  percent: number;
}
@Component({
  components: {
    Scroll,
    PlayList,
    ProgressBar,
    ProgressCircle
  }
})
export default class MPlayer extends Mixins(Player) {
  private touch!: PlayerTouch
  private showPlayList = false
  private currentShow = 'cd'
  private currentTime = 0
  private currentLyric: Lyric | null = null
  private currentLineNum = 0
  private playingLyric = ''
  private isPureMusic = false
  private pureMusicLyric = ''
  @Ref('playerLeft') readonly playerLeftRef!: HTMLElement
  @Ref('playerLyric') readonly playerLyricRef!: Scroll
  @Ref('lyricLine') readonly lyricLinesRef!: HTMLElement[]
  @Ref('audio') readonly audioRef!: HTMLAudioElement
  @Getter('fullScreen') fullScreen!: boolean
  @Getter('playing') playing!: boolean
  @Getter('playList') playList!: Song[]
  @Getter('currentIndex') currentIndex!: number
  @Mutation('player/SET_FULL_SCREEN') setFullScreen!: (fullscreen: boolean) => void
  @Mutation('player/SET_CURRENT_INDEX') setCurrentIndex!: (index: number) => void
  @Action('history/setPlayHistory') setPlayHistory!: (song: Song) => void
  @Watch('playing')
  onPlayingChange (playing: boolean) {
    playing ? this.audioRef.play() : this.audioRef.pause()
  }
  @Watch('currentSong')
  onSongChange (newSong: Song, oldSong: Song) {
    if (!newSong.id || !newSong.url || newSong.id === oldSong.id) {
      return
    }
    // 重置歌词
    if (this.currentLyric) {
      this.currentLyric.stop()
      this.currentLyric = null
      this.currentLineNum = 0
      this.currentTime = 0
      this.playingLyric = ''
    }
    this.audioRef.src = newSong.url
    this.audioRef.play()
    this.getLyric()
  }

  public handleCollapseClick () {
    this.setFullScreen(false)
  }
  public handleOpenClick () {
    this.setFullScreen(true)
  }
  public handlePercentChanged () {
    this.audioRef.currentTime = this.currentTime
    if (!this.playing) {
      this.handleTogglePlay()
    }
  }
  public handlePrevClick () {
    let index = this.currentIndex - 1
    if (index < 0) {
      index = this.playList.length - 1
    }
    this.setCurrentIndex(index)
    if (!this.playing) {
      this.setPlayState(true)
    }
  }
  public handleNextClick () {
    let index = this.currentIndex + 1
    if (index >= this.playList.length) {
      index = 0
    }
    this.setCurrentIndex(index)
    if (!this.playing) {
      this.setPlayState(true)
    }
  }
  public handleTogglePlay () {
    this.setPlayState(!this.playing)
    if (this.currentLyric) {
      this.currentLyric.togglePlay()
    }
  }
  public handleAudioReady () {
    this.setPlayHistory(this.currentSong)
    this.currentLyric && this.currentLyric.seek(this.currentTime * 1000)
  }
  public handleTimeUpdate (e: Event) {
    this.currentTime = (e.target as HTMLAudioElement).currentTime
  }
  public handleAudioPaused () {
    this.setPlayState(false)
    this.currentLyric && this.currentLyric.stop()
  }
  public handleAudioEnd () {
    this.currentTime = 0
    this.handleNextClick()
  }
  public handleTouchStart (e: TouchEvent) {
    const touch = e.touches[0]
    this.touch.initiated = true
    this.touch.moved = false
    this.touch.direction = ''
    this.touch.startX = touch.pageX
    this.touch.startY = touch.pageY
  }
  public handleTouchMove (e: TouchEvent) {
    if (!this.touch.initiated) {
      return
    }
    const touch = e.touches[0]
    const diffX = touch.pageX - this.touch.startX
    const diffY = touch.pageY - this.touch.startY
    const absDiffX = Math.abs(diffX)
    const absDiffY = Math.abs(diffY)
    // 判断是纵向滚动还是横向滚动
    if (!this.touch.direction) {
      if (absDiffX > absDiffY) {
        this.touch.direction = 'h'
      } else if (absDiffY >= absDiffX) {
        this.touch.direction = 'v'
      }
    }
    if (this.touch.direction === 'v') {
      return
    }
    if (!this.touch.moved) {
      this.touch.moved = true
    }
    const width = this.currentShow === 'cd' ? 0 : -window.innerWidth
    const offsetWidth = Math.min(0, Math.max(-window.innerWidth, width + diffX))
    const playerLyricDom = this.playerLyricRef.$el as HTMLElement
    this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
    playerLyricDom.style[transform as any] = `translate3d(${offsetWidth}px, 0, 0)`
    playerLyricDom.style[transitionDuration as any] = '0'
    this.playerLeftRef.style.opacity = `${1 - this.touch.percent}`
    this.playerLeftRef.style[transitionDuration as any] = '0'
  }
  public handleTouchEnd () {
    if (!this.touch.moved) {
      return
    }
    let offsetWidth = 0
    let opacity = 0
    const duration = 300
    if (this.currentShow === 'cd') {
      if (this.touch.percent > 0.1) {
        offsetWidth = -window.innerWidth
        opacity = 0
        this.currentShow = 'lyric'
      } else {
        offsetWidth = 0
        opacity = 1
      }
    } else {
      if (this.touch.percent < 0.9) {
        offsetWidth = 0
        opacity = 1
        this.currentShow = 'cd'
      } else {
        offsetWidth = -window.innerWidth
        opacity = 0
      }
    }
    const playerLyricDom = this.playerLyricRef.$el as HTMLElement
    playerLyricDom.style[transform as any] = `translate3d(${offsetWidth}px, 0, 0)`
    playerLyricDom.style[transitionDuration as any] = `${duration}ms`
    this.playerLeftRef.style.opacity = `${opacity}`
    this.playerLeftRef.style[transitionDuration as any] = `${duration}ms`
    this.touch.initiated = false
  }
  private formatPlayerSecond (second: number) {
    return formatSecond(second)
  }
  private getLyric () {
    this.currentSong.getLyric().then((lyric: string) => {
      this.currentLyric = new Lyric(lyric, this.normalizeLyric)
      this.isPureMusic = !this.currentLyric.lines.length
      if (this.isPureMusic) {
        this.pureMusicLyric = this.currentLyric.lrc.replace(/\[(\d{2}):(\d{2}):(\d{2})]/g, '').trim()
        this.playingLyric = this.pureMusicLyric
      } else if (this.playing) {
        this.currentLyric.seek(this.currentTime * 1000)
      }
    }).catch(() => {
      this.currentLyric = null
      this.currentLineNum = 0
      this.playingLyric = ''
    })
  }
  private normalizeLyric ({ lineNum, txt }: LyricParams) {
    this.currentLineNum = lineNum
    this.playingLyric = txt
    if (lineNum > 5) {
      const lineEl = this.lyricLinesRef[(lineNum - 5) as any]
      this.playerLyricRef.scrollToElement(lineEl, 1000)
    } else {
      this.playerLyricRef.scrollTo(0, 0, 1000)
    }
  }

  private get percent () {
    return this.currentTime / this.currentSong.duration
  }
  private set percent (percent: number) {
    this.currentTime = percent * this.currentSong.duration
    this.currentLyric && this.currentLyric.seek(this.currentTime * 1000)
  }
  private get playIcon () {
    return this.playing ? 'icon-pause' : 'icon-play'
  }
  private get miniPlayIcon () {
    return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
  }

  private created () {
    this.touch = {
      initiated: false,
      moved: false,
      direction: '',
      startX: 0,
      startY: 0,
      percent: 0
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/mixin.scss';
  @import '~@/assets/styles/variables.scss';
  .normal-player {
    z-index: 150;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: $color-background;
    &.normal-enter-active, &.normal-leave-active {
      transition: all 0.4s;
      .player-header, .player-bottom {
        transition: all 0.4s;
      }
    }
    &.normal-enter, &.normal-leave-to {
      opacity: 0;
      .player-header {
        transform: translate3d(0, -100px, 0)
      }
      .player-bottom {
        transform: translate3d(0, 100px, 0)
      }
    }
    .player-background {
      z-index: -1;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0.6;
      filter: blur(20px);
    }
    .player-header {
      position: relative;
      margin-bottom: 20px;
      .player-back {
        position: absolute;
        left: 6px;
        top: 0;
        .icon-back {
          display: block;
          padding: 10px;
          transform: rotate(-90deg);
          font-size: 22px;
          color: $color-theme;
        }
      }
      .player-title {
        width: 70%;
        margin: 0 auto;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        font-weight: normal;
        color: $color-text;
        @include ellipsis();
      }
      .player-subtitle {
        text-align: center;
        line-height: 20px;
        font-size: 14px;
        color: $color-text;
      }
    }
    .player-middle {
      position: fixed;
      left: 0;
      right: 0;
      top: 80px;
      bottom: 170px;
      font-size: 0;
      white-space: nowrap;
      .middle-left, .middle-right {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        position: relative;
      }
      .middle-left {
        height: 0;
        padding-top: 80%;
        .cd-box {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;
          box-sizing: border-box;
          .cd-image-box {
            height: 100%;
            border-radius: 50%;
            animation: myrotate 20s linear infinite;
          }
          .cd-image {
            display: block;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border-radius: 50%;
            border: 10px solid rgba(255, 255, 255, 0.1);
          }
        }
        .lyric-box {
          margin: 30px auto 0;
          width: 80%;
          text-align: center;
          overflow: hidden;
          .current-lyric {
            line-height: 20px;
            font-size: 14px;
            color: $color-text-l;
          }
        }
      }
      .middle-right {
        height: 100%;
        overflow: hidden;
        .lyric-box {
          margin: 0 auto;
          width: 80%;
          overflow: hidden;
          text-align: center;
          .lyric-text {
            line-height: 32px;
            color: $color-text-l;
            font-size: 14px;
            &.active {
              color: $color-text;
            }
          }
          .pure-music {
            padding-top: 50%;
            line-height: 32px;
            font-size: 14px;
            color: $color-text-l;
          }
        }
      }
    }
    .player-bottom {
      position: absolute;
      left: 0;
      bottom: 50px;
      right: 0;
      .player-dots {
        text-align: center;
        .dot-item {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color:$color-text-l;
          &.active {
            width: 20px;
            border-radius: 5px;
            background-color:$color-text-ll;
          }
        }
      }
      .player-progress {
        margin: 0 auto;
        padding: 10px 0;
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
        .progress-time {
          flex: 0 0 40px;
          width: 40px;
          line-height: 30px;
          color: $color-text;
          font-size: 12px;
          &.time-left {
            text-align: left;
          }
          &.time-right {
            text-align: right;
          }
        }
        .progress-box {
          flex: 1;
        }
      }
      .player-btns {
        display: flex;
        align-items: center;
        justify-content: center;
        .icon {
          flex: 1;
          color: $color-theme;
          &.i-left {
            text-align: right;
          }
          &.i-center {
            padding: 0 20px;
            text-align: center;
            i {
              font-size: 40px;
            }
          }
          &.i-rigth {
            text-align: left;
          }
        }
        .icon-favorite {
          color: $color-sub-theme;
        }
        [class^="icon"] {
          font-size: 30px;
        }
      }
    }
  }
  .mini-player {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    z-index: 150;
    background-color: $color-highlight-background;
    &.mini-enter-active, &.mini-leave-active {
      transition: opacity 0.4s;
    }
    &.mini-enter, &.mini-leave-to {
      opacity: 0;
    }
    .mini-icon {
      flex: 0 0 40px;
      width: 40px;
      height: 40px;
      padding: 0 10px 0 20px;
      .mini-image-box {
        height: 100%;
        .mini-image {
          display: block;
          border-radius: 50%;
        }
      }
    }
    .mini-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 20px;
      overflow: hidden;
      .name {
        margin-bottom: 2px;
        font-size: 14px;
        color: $color-text;
        @include ellipsis();
      }
      .singer {
        font-size: 12px;
        color: $color-text-l;
        @include ellipsis();
      }
    }
    .mini-control {
      flex: 0 0 30px;
      width: 30px;
      padding: 0 10px;
      .icon-playlist, .icon-play-mini, .icon-pause-mini {
        font-size: 30px;
        color: $color-theme-d;
      }
      .icon-mini {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 32px;
      }
    }
  }
  @keyframes myrotate {
    from {
      transform: rotate(0deg);
    } to {
      transform: rotate(1turn);
    }
  }
</style>
