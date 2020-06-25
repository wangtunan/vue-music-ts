<template>
  <scroll
    :data="resultList"
    class="suggestion-list"
  >
    <ul v-show="resultList.length">
      <li
        v-for="(item, index) in resultList"
        :key="index"
        class="suggestion-item"
        @click="handleSongClick(item)"
      >
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
import Scroll from '@/components/scroll/index.vue'
import Empty from '@/components/empty/index.vue'
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { search } from '@/api/search'
import { ERR_OK } from '@/api/config'
import { SearchResult, Album } from '@/types/search'
import Song, { isValid, createSong } from '@/assets/js/song'
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
  @Prop({ type: String, default: '' }) keyword!: string

  // methods方法
  handleSongClick (item: Song | Album) {
    console.log(item)
    this.$emit('select')
  }
  getSuggestionList () {
    search(this.keyword, this.page, true, pageSize).then(res => {
      const { code, data } = res
      if (code === ERR_OK) {
        this.resultList = this.normalizeSongData(data)
        console.log(this.normalizeSongData(data))
      }
    })
  }
  normalizeSongData (searchResult: SearchResult): (Album | Song)[] {
    const result = []
    // 如果有歌手，拼接歌手数据
    if (searchResult.zhida && searchResult.zhida.singerid && this.page === 1) {
      result.push({ ...searchResult.zhida, ...{ type: singerType } })
    }
    searchResult.song.list.forEach(song => {
      if (isValid(song)) {
        result.push(createSong(song))
      }
    })
    return result
  }
  getIconClass (item: Song | Album): string {
    if (item.type === singerType) {
      return 'icon-mine'
    } else {
      return 'icon-music'
    }
  }
  getDisplayName (item: Song | Album): string {
    if (item.type === singerType) {
      return (item as Album).singername
    } else {
      return `${item.name}-${item.singer}`
    }
  }

  // watch监听器
  @Watch('keyword')
  onKeywordChange (newVal: string) {
    if (!newVal) {
      return
    }
    this.getSuggestionList()
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
      margin-bottom: 20px;
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
