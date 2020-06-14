<template>
  <transition name="slide">
    <div class="m-rank">
      rank
    </div>
  </transition>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Rank extends Vue {
}
</script>
<style lang="scss" scoped>
  .m-rank {
    position: fixed;
    top: 88px;
    left: 0;
    bottom: 0;
    width: 100%;
  }
</style>
