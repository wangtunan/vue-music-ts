<template>
  <div class="m-music-list">
    <!-- 头部 -->
    <div ref="MusicHeader" class="music-list-header">
      <span class="icon-back" @click="handleBackClick"></span>
      <h1 class="title">{{title}}</h1>
    </div>

    <!-- 图片&按钮 -->
    <div ref="MusicImage" class="music-list-image" :style="bgStyle">
      <div class="image-cover"></div>
      <div v-show="songs.length" class="play-box">
        <div ref="PlayBtn" class="play-btn" @click="handleRandomClick">
          <i class="icon-play"></i>
          <span class="btn-text">随机播放全部</span>
        </div>
      </div>
    </div>

    <!-- layer -->
    <div ref="MusicLayer" class="music-list-layer"></div>

    <!-- 列表 -->
    <scroll
      ref="MusicScroll"
      class="music-list-scroll"
      :data="songs"
      :probe-type="3"
      :listen-scroll="true"
      :style="scrollStyle"
      @scroll="handleScroll">
      <song-list :list="songs" :rank="rank" @select="handleSelectSong" />
      <loading v-show="!songs.length" />
    </scroll>
  </div>
</template>
<script lang="ts">
import Scroll from '@/components/scroll/index.vue'
import Loading from '@/components/loading/index.vue'
import SongList from '@/components/song-list/index.vue'
import Song from '@/assets/js/song'
import PlayList from '@/assets/js/playList'
import { Component, Prop, Watch, Mixins } from 'vue-property-decorator'
import { Position } from '@/types/index'
import { SelectPlay } from '@/types/player'
import { getVendorsPrefix } from '@/utils/dom'
import { Action } from 'vuex-class'
import { pxToVw } from '@/utils/utils'
const transform = getVendorsPrefix('transform')
@Component({
  components: {
    Scroll,
    Loading,
    SongList
  }
})
export default class MusicList extends Mixins(PlayList) {
  private headerHeigth!: number
  private minTranslateY!: number
  private playBtn!: HTMLElement
  private musicImage!: HTMLElement
  private musicLayer!: HTMLElement
  private scrollY = 0
  private top = 0
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: String, default: '' }) img!: string
  @Prop({ type: Boolean, default: false }) rank!: boolean
  @Prop({ type: Array, default () { return [] } }) songs!: Song[]
  @Action('player/selectPlay') selectPlay!: (params: SelectPlay) => void
  @Action('player/randomPlay') randomPlay!: (list: Song[]) => void
  @Watch('scrollY')
  onScrollYChange (newY: number) {
    const translateY = Math.max(this.minTranslateY, newY)
    const percent = Math.abs(newY / this.musicImage.clientHeight)
    let zIndex = 0
    let scale = 1
    if (newY > 0) {
      zIndex = 10
      scale = 1 + percent
    }
    // @ts-ignore
    this.musicLayer.style[transform] = `translate3d(0,${translateY}px,0)`
    if (newY < this.minTranslateY) {
      zIndex = 10
      this.musicImage.style.paddingTop = '0'
      this.musicImage.style.height = `${this.headerHeigth}px`
      this.playBtn.style.display = 'none'
    } else {
      this.musicImage.style.paddingTop = '70%'
      this.musicImage.style.height = '0'
      this.playBtn.style.display = ''
    }
    this.musicImage.style.zIndex = `${zIndex}`
    // @ts-ignore
    this.musicImage.style[transform] = `scale(${scale})`
  }

  // methods方法
  public handlePlayList () {
    const bottom = this.playList.length > 0 ? `${pxToVw(60)}vw` : '0'
    const musicScroll = this.$refs.MusicScroll as Scroll
    ;(musicScroll.$el as HTMLElement).style.bottom = bottom
    musicScroll.refresh()
  }
  public handleBackClick () {
    this.$router.back()
  }
  public handleRandomClick () {
    this.randomPlay(this.songs)
  }
  public handleScroll (pos: Position) {
    this.scrollY = pos.y
  }
  public handleSelectSong (song: Song, index: number) {
    this.selectPlay({
      list: this.songs,
      index: index
    })
  }
  private cacheDoms () {
    this.musicImage = this.$refs.MusicImage as HTMLElement
    this.musicLayer = this.$refs.MusicLayer as HTMLElement
    this.playBtn = this.$refs.PlayBtn as HTMLElement
  }
  private computedHeight () {
    const musicHeader = this.$refs.MusicHeader as HTMLElement
    this.top = this.musicImage.clientHeight
    this.headerHeigth = musicHeader.clientHeight
    this.minTranslateY = -this.musicImage.clientHeight + this.headerHeigth
  }

  // 计算属性
  private get bgStyle (): object {
    return {
      'background-image': `url(${this.img})`
    }
  }
  private get scrollStyle (): object {
    return {
      top: `${this.top}px`
    }
  }

  // 生命周期
  private mounted () {
    this.cacheDoms()
    this.computedHeight()
    this.handlePlayList()
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/mixin.scss';
  @import '~@/assets/styles/variables.scss';
  .m-music-list {
    z-index: 100;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: $color-background;
    .music-list-header {
      z-index: 110;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      line-height: 40px;
      [class^="icon"] {
        position: absolute;
        left: 0;
        top: 0;
        padding: 0 10px;
        margin-left: 6px;
        font-size: 20px;
        line-height: 40px;
        font-weight: bold;
        color: $color-theme;
        box-sizing: border-box;
      }
      .title {
        max-width: 75%;
        margin: 0 auto;
        font-size: 16px;
        text-align: center;
        font-weight: normal;
        color: $color-text;
        @include ellipsis();
      }
    }
    .music-list-image {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 70%;
      background-size: cover;
      transform-origin: top;
      .image-cover {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(7, 17, 27, 0.4);
      }
      .play-box {
        z-index: 110;
        position: absolute;
        left: 0;
        bottom: 20px;
        width: 100%;
      }
      .play-btn {
        margin: 0 auto;
        width: 135px;
        padding: 7px 0;
        border-radius: 100px;
        box-sizing: border-box;
        border: 1px solid $color-theme;
        text-align: center;
        color: $color-theme;
      }
      .icon-play, .btn-text {
        display: inline-block;
        vertical-align: middle;
      }
      .btn-text {
        margin-left: 5px;
        font-size: 12px;
      }
    }
    .music-list-layer {
      height: 100%;
      overflow: hidden;
      background-color: $color-background;
    }
    .music-list-scroll {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: $color-background;
    }
  }
</style>
