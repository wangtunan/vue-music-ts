import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import Song from '@/assets/js/song'
@Component
export default class Player extends Vue {
  @Getter('currentSong') currentSong!: Song
}
