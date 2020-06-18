<template>
  <transition name="slide">
    <div class="m-search">
      <!-- 搜索 -->
      <div class="search-box">
        <search-box @search="handleSearch"/>
      </div>

      <!-- 热搜&搜索历史 -->
      <scroll :data="combineData" class="scroll-box">
        <div>
          <div class="hot-box">
            <h3 class="hot-title">热门搜索</h3>
            <ul>
              <li
                v-for="(item, index) in hotKeyList"
                :key="index"
                class="hot-item">
                {{item}}
              </li>
            </ul>
          </div>
          <div v-if="searchHistory.length" class="history-box">
            <h3 class="history-title">
              <span class="text">搜索历史</span>
              <i class="icon-clear"></i>
            </h3>
            <ul>
              <li
                v-for="(item, index) in searchHistory"
                :key="index"
                class="history-item">
                <span class="text">{{item}}</span>
                <i class="icon-delete"></i>
              </li>
            </ul>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>
<script lang="ts">
import Search from '@/assets/js/search'
import SearchBox from '@/components/search-box/index.vue'
import Scroll from '@/components/scroll/index.vue'
import Player from '@/assets/js/player'
import { Component, Mixins } from 'vue-property-decorator'
import { HotKey } from '@/types/search'
import { getHotKeys } from '@/api/search'
import { ERR_OK } from '@/api/config'
const MAX_HOT = 10
@Component({
  components: {
    SearchBox,
    Scroll
  }
})
export default class MSearch extends Mixins(Search, Player) {
  private hotKeyList: string[] = []
  // methods方法
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
      position: fixed;
      left: 0;
      top: 178px;
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
          font-size: 14px;
          color: $color-text-d;
          @include extend-click();
        }
      }
    }
  }
</style>
