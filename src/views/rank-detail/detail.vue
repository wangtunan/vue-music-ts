<template>
  <transition appear name="slide">
    <music-list :title="topList.topTitle" :img="bgImage" :songs="songs" :rank="true"></music-list>
  </transition>
</template>
<script lang="ts">
import MusicList from '@/components/music-list/index.vue'
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { RankListConfig } from '@/types/rank'
import { getTopList } from '@/api/rank'
import { ERR_OK } from '@/api/config'
import Song, { isValid, createSong } from '@/assets/js/song'
import { SongData } from '@/types/search'
@Component({
  components: {
    MusicList
  }
})
export default class RankDetail extends Vue {
  private songs: Song[] = []
  // vuex
  @Getter('topList') topList!: RankListConfig

  // methods方法
  private getTopListData () {
    if (!this.topList.id) {
      this.$router.replace('/rank')
      return
    }
    getTopList(this.topList.id).then(res => {
      const { code, data } = res
      if (code === ERR_OK) {
        this.songs = this.normalizeTopList(data)
      }
    })
  }
  private normalizeTopList (list: any[]): Song[] {
    const result: Song[] = []
    list.forEach(item => {
      const musicData = item.data as SongData
      if (isValid(musicData)) {
        result.push(createSong(musicData))
      }
    })
    return result
  }

  // 计算属性
  private get bgImage () {
    if (this.songs.length === 0) {
      return ''
    }
    return this.songs[0].image
  }

  // 生命周期
  private mounted () {
    this.getTopListData()
  }
}
</script>
