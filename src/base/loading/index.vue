<template>
  <div class="m-loading">
    <div class="loading-content">
      <img src="@/assets/images/loading.gif" alt="">
      <p class="title">{{title}}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class Loading extends Vue {
  @Prop({ type: String, default: '加载中...' }) title!: string
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/variables.scss';
  .m-loading {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
    .loading-content {
      text-align: center;
      img {
        display: inline-block;
        width: 24px;
        height: 24px;
      }
      .title {
        line-height: 20px;
        font-size: 12px;
        color: $color-text-l;
      }
    }
  }
</style>
