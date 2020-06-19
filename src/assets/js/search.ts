import { Component, Vue } from 'vue-property-decorator'
import { getHistoryList, saveHistory, deleteHistory, clearHistory } from '@/utils/cache'
@Component
export default class Search extends Vue {
  protected keyword = ''
  protected searchHistory: string[] = []

  // methods方法
  public handleSearch (keyword: string): void {
    this.keyword = keyword.trim()
  }
  public handleClearHistory (): void {
    clearHistory()
    this.getHistoryList()
  }
  public handleDeleteHistory (keyword: string): void {
    deleteHistory(keyword.trim())
    this.getHistoryList()
  }
  public handleAddHistory (keyword: string): void {
    this.keyword = keyword.trim()
    saveHistory(this.keyword)
    this.getHistoryList()
  }
  private getHistoryList (): void {
    this.searchHistory = getHistoryList()
  }

  // 生命周期
  private created (): void {
    this.getHistoryList()
  }
}
