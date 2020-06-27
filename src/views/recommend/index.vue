<template>
  <div ref="Recommend" class="m-recommend">
    <scroll ref="RecommendScroll" class="recommend-box" :data="discList">
      <div>
        <!-- 轮播 -->
        <div class="slider-box">
          <div v-if="recommendList.length" class="slider-content">
            <slider>
              <div v-for="(item, index) in recommendList" :key="index">
                <a :href="item.linkUrl">
                  <img :src="item.picUrl" alt="">
                </a>
              </div>
            </slider>
          </div>
        </div>

        <!-- 列表 -->
        <div class="recommend-list">
          <h1 class="recommend-title">热门歌单推荐</h1>
          <ul>
            <li
              v-for="(item, index) in discList"
              :key="index"
              class="recommend-item"
              @click="handleItemClick(item)"
            >
              <div class="img-box">
                <img v-lazy="item.imgurl" alt="">
              </div>
              <div class="content-box">
                <p class="author">{{item.creator.name}}</p>
                <p class="desc">{{item.dissname}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <loading v-show="!discList.length" />
    </scroll>
    <router-view />
  </div>
</template>
<script lang="ts">
import Slider from '@/components/slider/index.vue'
import Scroll from '@/components/scroll/index.vue'
import Loading from '@/components/loading/index.vue'
import PlayList from '@/assets/js/playList'
import { Component, Mixins } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import { getRecommendList, getDiscList } from '@/api/recommend'
import { MusicResponse } from '@/types/index'
import { BannerConfig, DiscConfig } from '@/types/recommend'
import { ERR_OK } from '@/api/config'
import { pxToVw } from '@/utils/utils'
@Component({
  components: {
    Slider,
    Scroll,
    Loading
  }
})
export default class Recommend extends Mixins(PlayList) {
  private recommendList: BannerConfig[] = []
  private discList: DiscConfig[] = []
  @Mutation('disc/SET_DISC') setDisc!: (disc: DiscConfig) => void

  // methods方法
  public handlePlayList () {
    const bottom = this.playList.length > 0 ? `${pxToVw(60)}vw` : '0'
    const recommend = this.$refs.Recommend as HTMLElement
    const recommendScroll = this.$refs.RecommendScroll as Scroll
    recommend.style.bottom = bottom
    recommendScroll.refresh()
  }
  public handleItemClick (item: DiscConfig) {
    this.$router.push(`/recommend/${item.dissid}`)
    this.setDisc(item)
  }
  public getRecommendListData () {
    getRecommendList().then((res: MusicResponse) => {
      const { code, data } = res
      if (code === ERR_OK) {
        this.recommendList = data.slider
      }
    })
  }
  public getDiscListData () {
    getDiscList().then((res: MusicResponse) => {
      const { code, data } = res
      if (code === ERR_OK) {
        this.discList = data
      }
    })
  }

  // 生命周期
  private mounted () {
    this.getRecommendListData()
    this.getDiscListData()
    this.handlePlayList()
  }
  private activated () {
    this.handlePlayList()
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/mixin.scss';
  @import '~@/assets/styles/variables.scss';
  .m-recommend {
    position: fixed;
    left: 0;
    top: 88px;
    width: 100%;
    bottom: 0;
    .recommend-box {
      height: 100%;
      overflow: hidden;
    }
    .slider-box {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 40%;
      overflow: hidden;
      .slider-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .recommend-list {
      .recommend-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: 14px;
        font-weight: normal;
        color: $color-theme;
      }
      .recommend-item {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px 20px 20px;
        box-sizing: border-box;
      }
      .img-box {
        margin-right: 20px;
        flex: 0 0 60px;
        width: 60px;
        height: 60px;
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
        overflow: hidden;
        font-size: 14px;
        .author {
          margin-bottom: 10px;
          line-height: 20px;
          color: $color-text;
          @include ellipsis();
        }
        .desc {
          line-height: 20px;
          color: $color-text-d;
        }
      }
    }
  }
</style>
