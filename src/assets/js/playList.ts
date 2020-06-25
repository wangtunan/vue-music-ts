import Song from './song'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
@Component
export default class PlayList extends Vue {
  @Getter('playList') playList!: Song[]
  @Watch('playList')
  onPlayListChange () {
    this.handlePlayList()
  }
  public handlePlayList () {
    throw new Error('component must implement handlePlayList method')
  }
}
