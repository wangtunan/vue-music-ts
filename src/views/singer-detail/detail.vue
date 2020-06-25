<template>
  <transition appear name="slide">
    <music-list :title="singer.name" :img="singer.avatar" :songs="songs" />
  </transition>
</template>
<script lang="ts">
import MusicList from '@/components/music-list/index.vue'
import Singer from '@/assets/js/singer'
import Song, { createSong, isValid } from '@/assets/js/song'
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { getSingerDetail } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import { SongData } from '@/types/search'
@Component({
  components: {
    MusicList
  }
})
export default class SingerDetail extends Vue {
  private songs: Song[] = []
  @Getter('singer') singer!: Singer

  // methods方法
  private getSingerDetail () {
    if (!this.singer.id) {
      this.$router.replace('/singer')
      return
    }
    getSingerDetail(this.singer.id).then(res => {
      const { code, data } = res
      if (code === ERR_OK) {
        this.songs = this.normalizeSingerData(data.list)
      }
    })
  }
  private normalizeSingerData (list: any[]): Song[] {
    const result: Song[] = []
    list.forEach(item => {
      const musicData = item.musicData as SongData
      if (isValid(musicData)) {
        result.push(createSong(musicData))
      }
    })
    return result
  }

  // 生命周期
  private mounted () {
    this.getSingerDetail()
  }
}
</script>
