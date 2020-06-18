import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Search extends Vue {
  protected keyword = ''
  protected searchHistory: string[] = ['曹操', '林俊杰', '周杰伦', '王菲', '潘玮柏', 'S.H.E', '张宇', '马天宇', '陈坤', '五月天', '伍佰']

  // methods方法
  public handleSearch (keyword: string): void {
    this.keyword = keyword.trim()
  }
  public handleClearClick (): void {
    // TDD
  }
  public handleDeleteClick (): void {
    // TDD
  }
}
