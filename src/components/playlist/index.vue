<template>
  <transition name="slide-up">
    <div v-show="show" class="m-playlist" @click="show = false">
      <div class="playlist-box" @click.stop>
        <div class="playlist-header">
          <div class="title-box">
            <i class="title-icon" :class="modeIcon" @click="handleModeChange"></i>
            <span class="icon-text">{{modeText}}</span>
            <div class="title-right">
              <div class="add-box">
                <i class="icon-add"></i>
                <span class="add-text">添加歌曲到列表</span>
              </div>
              <i class="icon-clear" @click="showConfirm=true"></i>
            </div>
          </div>
        </div>
        <scroll class="playlist-list" :data="sequenceList">
          <transition-group name="slide-up" tag="ul">
            <li
              v-for="(item, index) in sequenceList"
              :key="item.id"
              class="play-item"
              @click="handlePlayItemClick(item, index)">
              <i class="current" :class="getCurrentIcon(item)"></i>
              <span class="text">{{item.name}}</span>
              <i class="like" :class="getFavoriteIcon(item)" @click="handleToggleFavorite(item)"></i>
              <i class="delete icon-delete" @click="handleDeleteSong(item)"></i>
            </li>
          </transition-group>
        </scroll>
      </div>
      <confirm :visible.sync="showConfirm" message="是否清空播放列表？" @confirm="handleDeleteSongList"/>
    </div>
  </transition>
</template>
<script lang="ts">
import Scroll from '@/base/scroll/index.vue'
import Confirm from '@/base/confirm/index.vue'
import Player from '@/assets/js/player'
import Song from '@/assets/js/song'
import { PlayMode } from '@/types/player'
import { Component, PropSync, Mixins } from 'vue-property-decorator'
import { Action } from 'vuex-class'
@Component({
  components: {
    Scroll,
    Confirm
  }
})
export default class PlayList extends Mixins(Player) {
  private showConfirm = false
  @PropSync('visible', { type: Boolean, default: false }) show!: boolean
  @Action('player/deleteSong') deleteSong!: (song: Song) => void
  @Action('player/deleteSongList') deleteSongList!: () => void
  public handleDeleteSong (song: Song) {
    this.deleteSong(song)
    if (!this.playList.length) {
      this.show = false
    }
  }
  public handleDeleteSongList () {
    this.deleteSongList()
    this.show = false
  }
  public handlePlayItemClick (song: Song, index: number) {
    if (this.mode === PlayMode.random) {
      index = this.playList.findIndex(item => item.id === song.id)
    }
    this.setCurrentIndex(index)
    this.setPlayState(true)
  }

  private getCurrentIcon (song: Song): string {
    return song.id === this.currentSong.id ? 'icon-play' : ''
  }
  private get modeText () {
    return this.mode === PlayMode.sequence ? '顺序播放' : this.mode === PlayMode.random ? '随机播放' : '单曲循环'
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/mixin.scss';
  @import '~@/assets/styles/variables.scss';
  .m-playlist {
    z-index: 200;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: $color-background-d;
    &.slide-up-enter-active, &.slide-up-leave-active {
      transition: opacity 0.3s;
      .playlist-box {
        transition: transform 0.3s;
      }
    }
    &.slide-up-enter, &.slide-up-leave-to {
      opacity: 0;
      .playlist-box {
        transform: translate3d(0, 100%, 0);
      }
    }
    .playlist-box {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: $color-highlight-background;
    }
    .playlist-header {
      position: relative;
      padding: 20px 30px 10px 20px;
      font-size: 14px;
        color: $color-text-l;
      .title-icon, .icon-text  {
        display: inline-block;
        vertical-align: middle;
      }
      .title-icon {
        margin-right: 10px;
        font-size: 30px;
        color: $color-theme-d;
      }
      .title-right {
        float: right;
        height: 30px;
        line-height: 30px;
        .add-box, .icon-clear {
          display: inline-block;
          vertical-align: middle;
        }
        .add-box {
          margin-right: 10px;
          font-size: 12px;
        }
        .icon-clear {
          @include extend-click();
        }
        .add-text {
          margin-left: 5px;
          padding-right: 10px;
          border-right: 1px solid $color-text-l;
        }
      }
    }
    .playlist-list {
      height: 370px;
      overflow: hidden;
      .play-item {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 30px 0 20px;
        height: 40px;
        overflow: hidden;
        &.slide-up-enter-active, &.slide-up-leave-active {
          transition: height 0.1s;
        }
        &.slide-up-enter, &.slide-up-leave-to {
          height: 0;
        }
        &:last-child {
          padding-bottom: 10px;
        }
        .current {
          flex: 0 0 20px;
          width: 20px;
          font-size: 12px;
          color: $color-theme-d;
        }
        .text {
          flex: 1;
          @include ellipsis();
          font-size: 14px;
          color: $color-text-l;
        }
        .like, .delete {
          font-size: 12px;
          color: $color-theme;
          @include extend-click();
        }
        .like {
          margin-right: 15px;
        }
      }
    }
  }
</style>
