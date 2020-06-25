<template>
  <div class="m-rank">
    <!-- 列表 -->
    <scroll
      :data="rankList"
      class="rank-list">
      <ul>
        <li
          v-for="(item, index) in rankList"
          :key="index"
          class="rank-item"
          @click="handleRankClick(item)">
          <div class="img-box">
            <img v-lazy="item.picUrl" alt="">
          </div>
          <ul class="content-box">
            <li
              v-for="(song, index) in item.songList"
              :key="index"
              class="song-item">
              <span>{{index + 1}}. </span>
              <span class="name">{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>

    <!-- loading -->
    <loading v-show="!rankList.length" />

    <!-- router-view -->
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import Scroll from '@/components/scroll/index.vue'
import Loading from '@/components/loading/index.vue'
import { Component, Vue } from 'vue-property-decorator'
import { RankListConfig } from '@/types/rank'
import { getRankList } from '@/api/rank'
import { ERR_OK } from '@/api/config'
import { Mutation } from 'vuex-class'
@Component({
  components: {
    Scroll,
    Loading
  }
})
export default class Rank extends Vue {
  private rankList: RankListConfig[] = []
  // methods方法
  public handleRankClick (topList: RankListConfig) {
    this.$router.push(`/rank/${topList.id}`)
    this.setTopList(topList)
  }
  private getRankListData () {
    getRankList().then(res => {
      const { code, data } = res
      if (code === ERR_OK) {
        this.rankList = data.topList
      }
    })
  }

  // vuex
  @Mutation('top/SET_TOP_LIST') setTopList!: (topList: RankListConfig) => void

  // 生命周期
  private mounted () {
    this.getRankListData()
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/mixin.scss';
  @import '~@/assets/styles/variables.scss';
  .m-rank {
    position: fixed;
    top: 88px;
    left: 0;
    bottom: 0;
    width: 100%;
    .rank-list {
      height: 100%;
      overflow: hidden;
    }
    .rank-item {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 20px;
      padding-top: 20px;
      height: 100%;
      box-sizing: border-box;
      .img-box {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .content-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        background-color: $color-highlight-background;
        color: $color-text-d;
        .song-item {
          height: 26px;
          line-height: 26px;
          font-size: 12px;
          @include ellipsis();
        }
      }
    }
  }
</style>
