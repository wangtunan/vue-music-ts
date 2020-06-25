import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
@Component
export default class Search extends Vue {
  protected keyword = ''
  // vuex
  @Getter('searchHistory') searchHistory!: string[]
  @Action('history/saveSearchHistory') saveSearchHistory!: (keyword: string) => void
  @Action('history/deleteSearchHistory') deleteSearchHistory!: (keyword: string) => void
  @Action('history/clearSearchHistory') clearSearchHistory!: () => void

  // methods方法
  public handleSearch (keyword: string) {
    this.keyword = keyword.trim()
  }
  public handleAddHistory (keyword: string) {
    this.keyword = keyword.trim()
    this.saveSearchHistory(this.keyword)
  }
  public handledeleteSearchHistory (keyword: string) {
    this.deleteSearchHistory(keyword.trim())
  }
  public handleclearSearchHistory () {
    this.clearSearchHistory()
  }
}
