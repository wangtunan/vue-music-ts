<template>
  <transition name="slide">
    <div class="m-music-list">
      <div class="music-list-header">
        <span class="icon-back" @click="handleBackClick"></span>
        <h1 class="title">{{title}}</h1>
      </div>
      <div class="music-list-image" :style="bgStyle">
        <div class="image-cover"></div>
        <div class="play-box">
          <div class="play-btn">
            <i class="icon-play"></i>
            <span class="btn-text">随机播放全部</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class MusicList extends Vue {
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: String, default: '' }) img!: string
  // methods方法
  public handleBackClick (): void {
    this.$router.back()
  }

  // 计算属性
  public get bgStyle (): object {
    return {
      'background-image': `url(${this.img})`
    }
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
  }
</style>
