import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Player extends Vue {
  protected mode = 'play'
  // methods方法
  public handleChangeModel (): void {
    // TDD
  }
}
