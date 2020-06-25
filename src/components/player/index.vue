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
        <div class="player-middle">
          <div class="middle-left">
            <div class="cd-box">
              <div class="cd-image-box">
                <img :src="currentSong.image" class="cd-image" alt="">
              </div>
            </div>
          </div>
          <div class="middle-right"></div>
        </div>

        <!-- 底部 -->
        <div class="player-bottom">
          <div class="player-dots">
            <span class="dot-item" :class="{ active: currentShow === 'cd' }"></span>
            <span class="dot-item" :class="{ active: currentShow === 'lyric' }"></span>
          </div>
          <div class="player-progress">
            <span class="progress-time">0:01</span>
            <div class="progress-box">
              <progress-bar :percent="30" />
            </div>
            <span class="progress-time">5:00</span>
          </div>
          <div class="player-btns">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left">
              <i class="icon-prev"></i>
            </div>
            <div class="icon i-center">
              <i class="icon-play"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 迷你播放器 -->
    <transition name="mini">
      <div v-show="!fullScreen" class="mini-player" @click="handleOpenClick"></div>
    </transition>
  </div>
</template>
<script lang="ts">
import Song from '@/assets/js/song'
import Player from '@/assets/js/player'
import ProgressBar from '@/components/progress-bar/index.vue'
import { Component, Mixins } from 'vue-property-decorator'
import { Getter, Mutation } from 'vuex-class'
@Component({
  components: {
    ProgressBar
  }
})
export default class MPlayer extends Mixins(Player) {
  private currentShow = 'cd'
  @Getter('fullScreen') fullScreen!: boolean;
  @Getter('playList') playList!: Song[]
  @Mutation('player/SET_FULL_SCREEN') setFullScreen!: (fullscreen: boolean) => void

  public handleCollapseClick () {
    this.setFullScreen(false)
  }
  public handleOpenClick () {
    this.setFullScreen(true)
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
        width: 80%;
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
        }
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
      .middle-right {
        height: 100%;
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
          flex: 0 0 30px;
          width: 30px;
          line-height: 30px;
          color: $color-text;
          font-size: 12px;
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
  }
  @keyframes myrotate {
    from {
      transform: rotate(0deg);
    } to {
      transform: rotate(1turn);
    }
  }
</style>
