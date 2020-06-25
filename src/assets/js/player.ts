import Song from '@/assets/js/song'
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Mutation, Action } from 'vuex-class'
import { PlayMode } from '@/types/player'
@Component
export default class Player extends Vue {
  @Getter('mode') mode!: number
  @Getter('currentSong') currentSong!: Song
  @Getter('favoriteList') favoriteList!: Song[]
  @Mutation('player/SET_PLAY_MODE') setPlayMode!: (mode: number) => void
  @Action('player/saveFavoriteList') saveFavoriteList!: (song: Song) => void
  @Action('player/deleteFavoriteList') deleteFavoriteList!: (song: Song) => void

  // methods方法
  public handleModeChange () {
    const mode = (this.mode + 1) % 3
    this.setPlayMode(mode)
  }
  public handleToggleFavorite () {
    if (this.isFavorite(this.currentSong)) {
      this.deleteFavoriteList(this.currentSong)
    } else {
      this.saveFavoriteList(this.currentSong)
    }
  }
  private isFavorite (song: Song): boolean {
    return this.favoriteList.findIndex(item => {
      return item.id === song.id
    }) > -1
  }
  private getFavoriteIcon (song: Song): string {
    return this.isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
  }

  // 计算属性
  private get modeIcon () {
    return this.mode === PlayMode.sequence ? 'icon-sequence' : this.mode === PlayMode.loop ? 'icon-loop' : 'icon-random'
  }
  private get faviroteIcon () {
    return this.getFavoriteIcon(this.currentSong)
  }
}
