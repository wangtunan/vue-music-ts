<template>
  <scroll
    ref="suggestionScroll"
    :data="resultList"
    class="suggestion-list">
    <ul v-show="resultList.length">
      <li
        v-for="(item, index) in resultList"
        :key="index"
        class="suggestion-item"
        @click="handleSongClick(item)">
        <div class="icon">
          <i :class="getIconClass(item)"></i>
        </div>
        <p class="name">{{getDisplayName(item)}}</p>
      </li>
    </ul>
    <empty v-if="!resultList.length" class="suggestion-empty" />
  </scroll>
</template>
<script lang="ts">
import Scroll from '@/base/scroll/index.vue'
import Empty from '@/base/empty/index.vue'
import Singer from '@/assets/js/singer'
import { Component, Vue, Watch, Prop, Ref } from 'vue-property-decorator'
import { search } from '@/api/search'
import { ERR_OK } from '@/api/config'
import { SearchResult, Album } from '@/types/search'
import Song, { isValid, createSong, processSongUrl } from '@/assets/js/song'
import { Mutation, Action } from 'vuex-class'
const pageSize = 20
const singerType = 'singer'
@Component({
  components: {
    Scroll,
    Empty
  }
})
export default class SearchSuggestion extends Vue {
  private page = 1
  private resultList: (Album | Song)[] = []
  @Ref('suggestionScroll') readonly suggestionScrollRef!: Scroll
  @Prop({ type: String, default: '' }) keyword!: string
  @Prop({ type: Boolean, default: true }) showSinger!: boolean
  @Mutation('singer/SET_SINGER') setSinger!: (singer: Singer) => void
  @Action('player/insertSong') insertSong!: (song: Song) => void
  @Watch('keyword')
  onKeywordChange (newVal: string) {
    if (!newVal) {
      return
    }
    this.getSuggestionList()
  }

  public handleSongClick (item: Song | Album) {
    if (item.type === singerType) {
      const album = item as Album
      const singer = new Singer(album.singermid, album.singername)
      this.setSinger(singer)
      this.$router.push(`/search/${singer.id}`)
    } else {
      this.insertSong(item as Song)
    }
    this.$emit('select', item)
  }
  public refresh () {
    this.suggestionScrollRef.refresh()
  }
  private getSuggestionList () {
    search(this.keyword, this.page, this.showSinger, pageSize).then(res => {
      const { code, data } = res
      if (code === ERR_OK) {
        this.normalizeSongData(data).then(res => {
          this.resultList = res
        })
      }
    })
  }
  private normalizeSongData (searchResult: SearchResult): Promise<(Album | Song)[]> {
    let result: (Album | Song)[] = []
    // 如果有歌手，拼接歌手数据
    if (searchResult.zhida && searchResult.zhida.singerid && this.page === 1) {
      result.push({ ...searchResult.zhida, ...{ type: singerType } })
    }
    const songResult: Song[] = []
    searchResult.song.list.forEach(song => {
      if (isValid(song)) {
        songResult.push(createSong(song))
      }
    })
    return processSongUrl(songResult).then(res => {
      result = result.concat(res)
      return result
    })
  }
  private getIconClass (item: Song | Album): string {
    if (item.type === singerType) {
      return 'icon-mine'
    } else {
      return 'icon-music'
    }
  }
  private getDisplayName (item: Song | Album): string {
    if (item.type === singerType) {
      return (item as Album).singername
    } else {
      return `${item.name}-${item.singer}`
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/mixin.scss';
  @import '~@/assets/styles/variables.scss';
  .suggestion-list {
    padding: 0 30px;
    height: 100%;
    overflow: hidden;
    .suggestion-item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 20px;
      .icon {
        flex: 0 0 30px;
        width: 30px;
        font-size: 14px;
        color: $color-text-d;
      }
      .name {
        flex: 1;
        font-size: 14px;
        color: $color-text-d;
        @include ellipsis();
      }
    }
  }
  .suggestion-empty {
    top: 40%;
  }
</style>
