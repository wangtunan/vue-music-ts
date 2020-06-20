<template>
  <transition appear name="slide">
    <music-list :title="disc.dissname" :img="disc.imgurl" />
  </transition>
</template>
<script lang="ts">
import MusicList from '@/components/music-list/index.vue'
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { DiscConfig } from '@/types/recommend'
@Component({
  components: {
    MusicList
  }
})
export default class RecommendDetail extends Vue {
  @Getter('disc') disc!: DiscConfig

  // 生命周期
  private created (): void {
    if (!this.disc.dissid) {
      this.$router.replace('/recommend')
    }
  }
}
</script>
