<template>
  <div class="m-music-list">
    <!-- 头部 -->
    <div ref="musicHeader" class="music-list-header">
      <span class="icon-back" @click="handleBackClick"></span>
      <h1 class="title">{{title}}</h1>
    </div>

    <!-- 图片&按钮 -->
    <div ref="musicImage" class="music-list-image" :style="bgStyle">
      <div class="image-cover"></div>
      <div v-show="songs.length" class="play-box">
        <div ref="playBtn" class="play-btn" @click="handleRandomClick">
          <i class="icon-play"></i>
          <span class="btn-text">随机播放全部</span>
        </div>
      </div>
    </div>

    <!-- layer -->
    <div ref="musicLayer" class="music-list-layer"></div>

    <!-- 列表 -->
    <scroll
      ref="musicScroll"
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
import Scroll from '@/base/scroll/index.vue'
import Loading from '@/base/loading/index.vue'
import SongList from '@/components/song-list/index.vue'
import Song from '@/assets/js/song'
import PlayList from '@/assets/js/playList'
import { Component, Prop, Watch, Mixins, Ref } from 'vue-property-decorator'
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
  private musicLayer!: HTMLElement
  private scrollY = 0
  private top = 0
  @Ref('musicHeader') readonly musicHeaderRef!: HTMLElement
  @Ref('musicImage') readonly musicImageRef!: HTMLElement
  @Ref('playBtn') readonly playBtnRef!: HTMLElement
  @Ref('musicLayer') readonly musicLayerRef!: HTMLElement
  @Ref('musicScroll') readonly musicScrollRef!: Scroll
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: String, default: '' }) img!: string
  @Prop({ type: Boolean, default: false }) rank!: boolean
  @Prop({ type: Array, default () { return [] } }) songs!: Song[]
  @Action('player/selectPlay') selectPlay!: (params: SelectPlay) => void
  @Action('player/randomPlay') randomPlay!: (list: Song[]) => void
  @Watch('scrollY')
  onScrollYChange (newY: number) {
    const translateY = Math.max(this.minTranslateY, newY)
    const percent = Math.abs(newY / this.musicImageRef.clientHeight)
    let zIndex = 0
    let scale = 1
    if (newY > 0) {
      zIndex = 10
      scale = 1 + percent
    }
    this.musicLayerRef.style[transform as any] = `translate3d(0,${translateY}px,0)`
    if (newY < this.minTranslateY) {
      zIndex = 10
      this.musicImageRef.style.paddingTop = '0'
      this.musicImageRef.style.height = `${this.headerHeigth}px`
      this.playBtnRef.style.display = 'none'
    } else {
      this.musicImageRef.style.paddingTop = '70%'
      this.musicImageRef.style.height = '0'
      this.playBtnRef.style.display = ''
    }
    this.musicImageRef.style.zIndex = `${zIndex}`
    this.musicImageRef.style[transform as any] = `scale(${scale})`
  }

  public handlePlayList () {
    const bottom = this.playList.length > 0 ? `${pxToVw(60)}vw` : '0'
    ;(this.musicScrollRef.$el as HTMLElement).style.bottom = bottom
    this.musicScrollRef.refresh()
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
  private computedHeight () {
    this.top = this.musicImageRef.clientHeight
    this.headerHeigth = this.musicHeaderRef.clientHeight
    this.minTranslateY = -this.musicImageRef.clientHeight + this.headerHeigth
  }

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

  private mounted () {
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
