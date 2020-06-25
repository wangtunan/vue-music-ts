<template>
  <div class="m-progress-bar">
    <div class="progress-bar-inner">
      <div class="progress-line"></div>
      <div class="progress-btn-box">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class ProgressBar extends Vue {
  @Prop({ type: Number, default: 0 }) percent!: number
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/variables.scss';
  .m-progress-bar {
    height: 30px;
    .progress-bar-inner {
      position: relative;
      top: 13px;
      height: 4px;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 5px;
      .progress-line {
        width: 0;
        height: 100%;
        background-color: $color-theme;
        border-radius: 5px;
      }
      .progress-btn-box {
        position: absolute;
        left: -7px;
        top: -13px;
        width: 30px;
        height: 30px;
        .progress-btn {
          position: relative;
          left: 7px;
          top: 7px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          box-sizing: border-box;
          border: 3px solid $color-text;
          background-color: $color-theme;
        }
      }
    }
  }
</style>
