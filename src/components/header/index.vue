<template>
  <div class="m-header">
    <img class="header-logo" src="@/assets/images/logo.png" alt="">
    <h1 class="header-title">Chicken Music</h1>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class MHeader extends Vue {
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/variables.scss';
  .m-header {
    height: 44px;
    text-align: center;
    color: $color-theme;
    .header-logo, .header-title {
      display: inline-block;
      vertical-align: middle;
    }
    .header-logo {
      margin-right: 10px;
      width: 30px;
      height: 32px;
    }
    .header-title {
      line-height: 44px;
      font-size: 18px;
      font-weight: normal;
    }
  }
</style>
