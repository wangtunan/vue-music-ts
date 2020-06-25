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
import Song, { createSong, isValid, processSongUrl } from '@/assets/js/song'
@Component({
  components: {
    MusicList
  }
})
export default class RecommendDetail extends Vue {
  private songList: Song[] = []
  @Getter('disc') disc!: DiscConfig

  // methods方法
  public getSongListData () {
    if (!this.disc.dissid) {
      this.$router.replace('/recommend')
      return
    }
    getSongList(this.disc.dissid).then(res => {
      const { code, data } = res
      if (code === ERR_OK) {
        this.normalizeSongList(data).then(res => {
          this.songList = res
        })
      }
    })
  }
  private normalizeSongList (list: SongData[]): Promise<Song[]> {
    const result: Song[] = []
    list.forEach(song => {
      if (isValid(song)) {
        result.push(createSong(song))
      }
    })
    return processSongUrl(result)
  }

  // 生命周期
  private created () {
    this.getSongListData()
  }
}
</script>
