<template>
  <div class="m-singer">
    <list-view :list="singerList" @select="handleSelectSinger" />
    <loading v-show="!singerList.length"/>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import ListView from '@/components/list-view/index.vue'
import Loading from '@/components/loading/index.vue'
import Singer from '@/assets/js/singer'
import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import { ListViewConfig, MusicSingerConfig, MapListConfig } from '@/types/singer'
import { getSingerList } from '@/api/singer'
import { ERR_OK } from '@/api/config'
const HOT_MAX = 10
const HOT_NAME = '热门'
@Component({
  components: {
    ListView,
    Loading
  }
})
export default class MSinger extends Vue {
  private singerList: ListViewConfig[] = []
  // vuex
  @Mutation('singer/SET_SINGER') setSinger!: (singer: Singer) => void

  // methods方法
  public handleSelectSinger (singer: Singer): void {
    this.$router.push(`/singer/${singer.id}`)
    this.setSinger(singer)
  }
  getSingerListData (): void {
    getSingerList().then(res => {
      const { code, data } = res
      if (code === ERR_OK) {
        this.singerList = this.normalizeSingerData(data.list)
      }
    })
  }
  normalizeSingerData (data: MusicSingerConfig[]): ListViewConfig[] {
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
  private mounted (): void {
    this.getSingerListData()
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
