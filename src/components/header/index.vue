<template>
  <div class="m-header">
    <img class="header-logo" src="@/assets/images/logo.png" alt="">
    <h1 class="header-title">Chicken Music</h1>
    <router-link to="/user" tag="div" class="header-mine" >
      <i class="icon-mine"></i>
    </router-link>
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
    position: relative;
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
    .header-mine {
      position: absolute;
      top: 0;
      right: 0;
      .icon-mine {
        display: block;
        padding: 12px;
        font-size: 20px;
        color: $color-theme;
      }
    }
  }
</style>
