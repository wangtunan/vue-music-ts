<template>
  <transition appear name="slide">
    <div class="m-user" ref="user">
      <!-- 头部 -->
      <div class="user-header">
        <div class="user-back" @click="handleBackClick">
          <i class="icon-back"></i>
        </div>
        <div class="user-switches">
          <switches :switches="switches"  :active.sync="active"/>
        </div>
      </div>

      <!-- 播放按钮 -->
      <div v-show="songs.length" class="play-box">
        <div class="play-btn" @click="handleRandomClick">
          <i class="icon-play"></i>
          <span class="btn-text">随机播放全部</span>
        </div>
      </div>

      <!-- 列表 -->
      <div v-show="songs.length" class="user-list">
        <scroll ref="userScroll" :data="songs" class="user-list-scroll">
          <div class="user-list-inner">
            <song-list :list="songs" />
          </div>
        </scroll>
      </div>

      <!-- empty -->
      <empty v-show="!songs.length" :title="emptyTitle" />
    </div>
  </transition>
</template>
<script lang="ts">
import Scroll from '@/components/scroll/index.vue'
import Switches from '@/components/switches/index.vue'
import SongList from '@/components/song-list/index.vue'
import Empty from '@/components/empty/index.vue'
import Song from '@/assets/js/song'
import PlayList from '@/assets/js/playList'
import { Component, Mixins, Ref } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { pxToVw } from '@/utils/utils'
@Component({
  components: {
    Switches,
    Scroll,
    SongList,
    Empty
  }
})
export default class MUser extends Mixins(PlayList) {
  private switches!: string[]
  private active = 0
  @Ref('user') readonly userRef!: HTMLElement
  @Ref('userScroll') readonly userScrollRef!: Scroll
  @Getter('favoriteList') favoriteList!: Song[]
  @Getter('playHistory') playHistory!: Song[]
  @Action('player/randomPlay') randomPlay!: (list: Song[]) => void

  public handlePlayList () {
    const bottom = this.playList.length > 0 ? `${pxToVw(60)}vw` : '0'
    this.userRef.style.bottom = bottom
    this.userScrollRef.refresh()
  }
  public handleBackClick () {
    this.$router.back()
  }
  public handleRandomClick () {
    this.randomPlay(this.songs)
  }

  private get emptyTitle () {
    return this.active === 0 ? '暂无收藏歌曲' : '你还没有听过歌曲'
  }
  private get songs () {
    return this.active === 0 ? this.favoriteList : this.playHistory
  }

  private created () {
    this.switches = ['我喜欢的', '最近听的']
  }
  private mounted () {
    this.handlePlayList()
  }
  private activated () {
    this.handlePlayList()
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/variables.scss';
  .m-user {
    z-index: 100;
    position: fixed;
    left: 5px;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: $color-background;
    .user-header {
      position: relative;
      margin-bottom: 30px;
    }
    .user-back {
      position: absolute;
      left: 0;
      top: 5px;
      .icon-back {
        display: inline-block;
        padding: 10px;
        font-size: 20px;
        color: $color-theme;
      }
    }
    .user-switches {
      padding-top: 10px;
    }
    .play-btn {
      margin: 0 auto;
      width: 135px;
      padding: 7px 0;
      border-radius: 100px;
      box-sizing: border-box;
      border: 1px solid $color-text-l;
      text-align: center;
      color: $color-text-l;
      .icon-play, .btn-text {
        display: inline-block;
        vertical-align: middle;
      }
      .btn-text {
        margin-left: 5px;
        font-size: 12px;
      }
    }
    .user-list {
      position: absolute;
      left: 0;
      right: 0;
      top: 110px;
      bottom: 0;
      .user-list-scroll {
        height: 100%;
        overflow: hidden;
      }
      .user-list-innerr {
        padding: 20px 30px;
      }
    }
  }
</style>
