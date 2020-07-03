<template>
  <div class="m-singer" ref="singer">
    <list-view :list="singerList" @select="handleSelectSinger" ref="singerScroll" />
    <loading v-show="!singerList.length"/>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import ListView from '@/components/list-view/index.vue'
import Loading from '@/base/loading/index.vue'
import Singer from '@/assets/js/singer'
import PlayList from '@/assets/js/playList'
import { Component, Mixins, Ref } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import { ListViewConfig, MusicSingerConfig, MapListConfig } from '@/types/singer'
import { getSingerList } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import { pxToVw } from '@/utils/utils'
const HOT_MAX = 10
const HOT_NAME = '热门'
@Component({
  components: {
    ListView,
    Loading
  }
})
export default class MSinger extends Mixins(PlayList) {
  private singerList: ListViewConfig[] = []
  @Ref('singer') readonly singerRef!: HTMLElement
  @Ref('singerScroll') readonly singerScrollRef!: ListView
  @Mutation('singer/SET_SINGER') setSinger!: (singer: Singer) => void

  public handlePlayList () {
    const bottom = this.playList.length > 0 ? `${pxToVw(60)}vw` : '0'
    this.singerRef.style.bottom = bottom
    this.singerScrollRef.handleRefresh()
  }
  public handleSelectSinger (singer: Singer) {
    this.$router.push(`/singer/${singer.id}`)
    this.setSinger(singer)
  }
  private getSingerListData () {
    getSingerList().then(res => {
      const { code, data } = res
      if (code === ERR_OK) {
        this.singerList = this.normalizeSingerData(data.list)
      }
    })
  }
  private normalizeSingerData (data: MusicSingerConfig[]): ListViewConfig[] {
    const hot: ListViewConfig = {
      title: HOT_NAME,
      items: []
    }
    const map: MapListConfig = {
      hot: hot
    }
    data.forEach((item, index) => {
      if (index < HOT_MAX) {
        map.hot.items.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
      }
      const key = item.Findex
      if (!map[key]) {
        map[key] = {
          title: key,
          items: []
        }
      }
      map[key].items.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
    })
    const letterList = []
    const hotList = []
    for (const key in map) {
      const item = map[key]
      if (item.title.match(/[a-zA-Z]/)) {
        letterList.push(item)
      } else if (item.title === HOT_NAME) {
        hotList.push(item)
      }
    }
    letterList.sort((a: ListViewConfig, b: ListViewConfig) => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0)
    })
    return hotList.concat(letterList)
  }

  // 生命周期
  private mounted () {
    this.getSingerListData()
    this.handlePlayList()
  }
  private activated () {
    this.handlePlayList()
  }
}
</script>
<style lang="scss" scoped>
  .m-singer {
    position: fixed;
    top: 88px;
    left: 0;
    bottom: 0;
    width: 100%;
  }
</style>
