<template>
  <div class="m-search">
    <!-- 搜索 -->
    <div class="search-box">
      <search-box ref="SearchBox" @search="handleSearch"/>
    </div>

    <!-- 热搜&搜索历史 -->
    <scroll v-show="!keyword" :data="combineData" class="scroll-box">
      <div>
        <div v-if="hotKeyList.length" class="hot-box">
          <h3 class="hot-title">热门搜索</h3>
          <ul>
            <li
              v-for="(item, index) in hotKeyList"
              :key="index"
              class="hot-item"
              @click="handleAddClick(item)">
              {{item}}
            </li>
          </ul>
        </div>
        <div v-show="searchHistory.length" class="history-box">
          <h3 class="history-title">
            <span class="text">搜索历史</span>
            <i class="icon-clear" @click="handleShowConfirm"></i>
          </h3>
          <transition-group name="slide-up" tag="ul">
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
      </div>
    </scroll>

    <!-- 搜索结果 -->
    <div v-show="keyword" class="suggestion-box">
      <suggestion :keyword="keyword" @select="handleSuggestionSelect" />
    </div>

    <!-- confirm -->
    <confirm :visible.sync="showConfirm" message="是否确定清空全部搜索历史？" @confirm="handleclearSearchHistory" />
  </div>
</template>
<script lang="ts">
import SearchBox from '@/components/search-box/index.vue'
import Scroll from '@/components/scroll/index.vue'
import Suggestion from '@/components/suggestion/index.vue'
import Confirm from '@/components/confirm/index.vue'
import Search from '@/assets/js/search'
import Player from '@/assets/js/player'
import { Component, Mixins } from 'vue-property-decorator'
import { HotKey } from '@/types/search'
import { getHotKeys } from '@/api/search'
import { ERR_OK } from '@/api/config'
const MAX_HOT = 10
@Component({
  components: {
    SearchBox,
    Scroll,
    Suggestion,
    Confirm
  }
})
export default class MSearch extends Mixins(Search, Player) {
  private showConfirm = false
  private hotKeyList: string[] = []
  // methods方法
  public handleAddClick (keyword: string): void {
    const searchBox = this.$refs.SearchBox as SearchBox
    searchBox.setKeyword(keyword)
    this.handleAddHistory(keyword)
  }
  public handleSuggestionSelect (): void {
    this.handleAddHistory(this.keyword)
  }
  public handleShowConfirm (): void {
    this.showConfirm = true
  }
  private getHotKeysData (): void {
    getHotKeys().then(res => {
      const { code, data } = res
      if (code === ERR_OK) {
        this.hotKeyList = data.hotkey.slice(0, MAX_HOT).map((item: HotKey) => item.k)
      }
    })
  }

  // 计算书型
  private get combineData () {
    return this.hotKeyList.concat(this.searchHistory)
  }

  // 生命周期
  private mounted (): void {
    this.getHotKeysData()
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/mixin.scss';
  @import '~@/assets/styles/variables.scss';
  .m-search {
    position: fixed;
    top: 88px;
    left: 0;
    bottom: 0;
    width: 100%;
    .search-box {
      margin: 20px;
    }
    .scroll-box {
      position: absolute;
      left: 0;
      top: 80px;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      overflow: hidden;
    }
    .hot-box {
      margin-bottom: 20px;
      .hot-title {
        margin-bottom: 20px;
        font-size: 14px;
        color: $color-text-l;
        font-weight: normal;
      }
      .hot-item {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 15px 10px 0;
        border-radius: 6px;
        font-size: 13px;
        color: $color-text-d;
        background-color: $color-highlight-background;
      }
    }
    .history-box {
      .history-title, .history-item {
        display: flex;
        align-items: center;
        height: 40px;
        overflow: hidden;
        color: $color-text-l;
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
      .history-title {
        [class^="icon"] {
          font-size: 14px;
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
    .suggestion-box {
      position: fixed;
      left: 0;
      top: 178px;
      bottom: 0;
      width: 100%;
    }
  }
</style>
