<template>
  <transition name="slide">
    <div class="m-search">
      search
    </div>
  </transition>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Search extends Vue {
}
</script>
<style lang="scss" scoped>
  .m-search {
    position: fixed;
    top: 88px;
    left: 0;
    bottom: 0;
    width: 100%;
  }
</style>
