<template>
  <transition appear name="slide">
    <music-list :title="disc.dissname" :img="disc.imgurl" :songs="songList" />
  </transition>
</template>
<script lang="ts">
import MusicList from '@/components/music-list/index.vue'
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { getSongList } from '@/api/recommend'
import { ERR_OK } from '@/api/config'
import { DiscConfig } from '@/types/recommend'
import { SongData } from '@/types/search'
import Song, { createSong, isValid } from '@/assets/js/song'
@Component({
  components: {
    MusicList
  }
})
export default class RecommendDetail extends Vue {
  private songList: Song[] = []
  @Getter('disc') disc!: DiscConfig

  // methods方法
  public getSongListData (): void {
    if (!this.disc.dissid) {
      this.$router.replace('/recommend')
      return
    }
    getSongList(this.disc.dissid).then(res => {
      const { code, data } = res
      if (code === ERR_OK) {
        this.songList = this.normalizeSongList(data)
      }
    })
  }
  normalizeSongList (list: SongData[]): Song[] {
    const result: Song[] = []
    list.forEach(song => {
      if (isValid(song)) {
        result.push(createSong(song))
      }
    })
    return result
  }

  // 生命周期
  private created (): void {
    this.getSongListData()
  }
}
</script>
