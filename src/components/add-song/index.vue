<template>
  <transition name="slide">
    <div v-show="showAddSong" class="m-addsong" @click.stop>
      <!-- 头部 -->
      <div class="addsong-header">
        <h2 class="addsong-title">添加歌曲到列表</h2>
        <span class="addsong-icon" @click="showAddSong = false">
          <i class="icon-close"></i>
        </span>
      </div>

      <!-- 搜索框 -->
      <div class="addsong-search-box">
        <search-box ref="searchBox" @search="handleSearch" />
      </div>

      <!-- 播放历史&搜索历史列表 -->
      <div v-show="!keyword">
        <switches :switches="switches" :active.sync="currentIndex" />

        <div class="addsong-list">
          <scroll v-show="scrollList" :data="scrollList" class="addsong-scroll">
            <div v-show="currentIndex === 0" key="SongList">
              <song-list :list="playHistory" @select="handleSelectSong" />
            </div>
            <div v-show="currentIndex === 1" key="SearchList">
              <transition-group class="history-box" name="slide-up" tag="ul">
                <li
                  v-for="item in searchHistory"
                  :key="item"
                  class="history-item"
                  @click="handleAddClick(item)">
                  <span class="text">{{item}}</span>
                  <i class="icon-delete" @click.stop="handledeleteSearchHistory(item)"></i>
                </li>
              </transition-group>
            </div>
          </scroll>
          <empty v-if="!scrollList.length" />
        </div>
      </div>

      <!-- 搜索结果 -->
      <div v-show="keyword"  class="addsong-suggestion-box">
        <suggestion
          :keyword="keyword"
          :showSinger="false"
          @select="handleSelectSuggestion"
          @listScroll="handleInputBlur"
        />
      </div>

      <!-- 顶部通知 -->
      <notify :visible.sync="showNotify" message="已经添加到播放列表" />
    </div>
  </transition>
</template>
<script lang="ts">
import SearchBox from '@/components/search-box/index.vue'
import SongList from '@/components/song-list/index.vue'
import Suggestion from '@/components/suggestion/index.vue'
import Switches from '@/base/switches/index.vue'
import Scroll from '@/base/scroll/index.vue'
import Empty from '@/base/empty/index.vue'
import Notify from '@/base/notify/index.vue'
import Song from '@/assets/js/song'
import Search from '@/assets/js/search'
import { Component, Mixins, PropSync, Ref } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
@Component({
  components: {
    SearchBox,
    SongList,
    Suggestion,
    Switches,
    Scroll,
    Empty,
    Notify
  }
})
export default class AddSong extends Mixins(Search) {
  private switches!: string[]
  private currentIndex = 0
  private showNotify = false
  @Ref('searchBox') searchBoxRef!: SearchBox
  @PropSync('visible', { type: Boolean, default: false }) showAddSong!: boolean
  @Getter('playHistory') playHistory!: Song[]
  @Action('player/insertSong') insertSong!: (song: Song) => void

  public handleSelectSuggestion () {
    this.handleAddHistory(this.keyword)
    this.showNotify = true
  }
  public handleSelectSong (item: Song) {
    this.insertSong(new Song(item))
    this.showNotify = true
  }
  public handleAddClick (keyword: string) {
    this.searchBoxRef.setKeyword(keyword)
    this.handleAddHistory(keyword)
  }
  public handleInputBlur () {
    this.searchBoxRef.blur()
  }

  private get scrollList () {
    return this.currentIndex === 0 ? this.playHistory : this.searchHistory
  }

  private created () {
    this.switches = ['最近播放', '搜索历史']
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/mixin.scss';
  @import '~@/assets/styles/variables.scss';
  .m-addsong {
    z-index: 200;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: $color-background;
    .addsong-header {
      position: relative;
      .addsong-title {
        width: 70%;
        margin: 0 auto;
        text-align: center;
        line-height: 44px;
        font-weight: normal;
        font-size: 16px;
        color: #fff;
        @include ellipsis();
      }
      .addsong-icon {
        position: absolute;
        right: 8px;
        top: 0;
        i {
          display: block;
          padding: 12px;
          font-size: 18px;
          color: $color-theme;
        }
      }
    }
    .addsong-search-box {
      margin: 20px;
    }
    .addsong-suggestion-box {
      position: absolute;
      left: 0;
      top: 124px;
      right: 0;
      bottom: 0;
    }
    .addsong-list {
      position: absolute;
      left: 0;
      right: 0;
      top: 165px;
      bottom: 0;
      .addsong-scroll {
        height: 100%;
        overflow: hidden;
      }
    }
    .history-box {
      padding: 20px 30px;
      .history-item {
        display: flex;
        align-items: center;
        height: 40px;
        overflow: hidden;
        color: $color-text;
        font-weight: normal;
        .text {
          font-size: 14px;
          flex: 1;
        }
        [class^="icon"] {
          font-size: 12px;
          color: $color-text-d;
          @include extend-click();
        }
      }
      .history-item {
        &.slide-up-enter-active, &.slide-up-leave-active {
          transition: height 0.1s;
        }
        &.slide-up-enter, &.slide-up-leave-to {
          height: 0;
        }
      }
    }
  }
</style>
