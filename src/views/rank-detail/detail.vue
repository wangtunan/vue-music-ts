<template>
  <transition appear name="slide">
    <music-list :title="topList.topTitle" :img="bgImage" :songs="songs" :rank="true"></music-list>
  </transition>
</template>
<script lang="ts">
import MusicList from '@/components/music-list/index.vue'
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { RankList } from '@/types/rank'
import { getTopList } from '@/api/rank'
import { ERR_OK } from '@/api/config'
import Song, { isValid, createSong, processSongUrl } from '@/assets/js/song'
import { SongData } from '@/types/search'
@Component({
  components: {
    MusicList
  }
})
export default class RankDetail extends Vue {
  private songs: Song[] = []
  @Getter('topList') topList!: RankList

  private getTopListData () {
    if (!this.topList.id) {
      this.$router.replace('/rank')
      return
    }
    getTopList(this.topList.id).then(res => {
      const { code, data } = res
      if (code === ERR_OK) {
        this.normalizeTopList(data).then(res => {
          this.songs = res
        })
      }
    })
  }
  private normalizeTopList (list: SongData[]): Promise<Song[]> {
    const result: Song[] = []
    list.forEach(item => {
      const musicData = item.data as SongData
      if (isValid(musicData)) {
        result.push(createSong(musicData))
      }
    })
    return processSongUrl(result)
  }

  private get bgImage () {
    if (this.songs.length === 0) {
      return ''
    }
    return this.songs[0].image
  }

  private mounted () {
    this.getTopListData()
  }
}
</script>
