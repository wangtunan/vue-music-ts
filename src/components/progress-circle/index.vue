<template>
  <div class="m-progress-circle">
    <svg :style="svgStyle" viewBox="0 0 100 100" version="1.1">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent" stroke-linecap="round" />
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset" stroke-linecap="round" />
    </svg>
    <slot />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { pxToVw } from '@/utils/utils'
@Component
export default class ProgressCircle extends Vue {
  private dashArray = Math.PI * 100
  @Prop({ type: Number, default: 32 }) radius!: number
  @Prop({ type: Number, default: 0 }) percent!: number
  private get dashOffset () {
    return (1 - this.percent) * this.dashArray
  }
  private get svgStyle () {
    const radius = pxToVw(this.radius)
    return {
      width: `${radius}vw`,
      height: `${radius}vw`
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/variables.scss';
  .m-progress-circle {
    position: relative;
    circle {
      stroke-width: 8px;
      transform-origin: center;
    }
    .progress-background {
      transform: scale(0.9);
      stroke: $color-theme-d;
    }
    .progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: $color-theme;
    }
  }
</style>
