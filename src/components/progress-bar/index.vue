<template>
  <div class="m-progress-bar" ref="ProgressBar" @click="handleProgressClick">
    <div class="progress-bar-inner">
      <div class="progress-line" ref="ProgressLine"></div>
      <div
        class="progress-btn-box"
        ref="ProgressBtn"
        @touchstart.prevent="handleTouchStart"
        @touchmove.prevent="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, PropSync, Watch } from 'vue-property-decorator'
import { getVendorsPrefix } from '@/utils/dom'
const transform = getVendorsPrefix('transform')
interface ProgressTouch {
  initial: boolean;
  startX: number;
  left: number;
}
@Component
export default class ProgressBar extends Vue {
  private touch!: ProgressTouch
  private progressBar!: HTMLElement
  private progressLine!: HTMLElement
  private progressBtn!: HTMLElement
  @PropSync('percent', { type: Number }) localPercent!: number
  @Watch('localPercent')
  onPercentChange (newPercent: number) {
    this.computedProgressOffset(newPercent)
  }

  // methods
  public handleProgressClick (e: MouseEvent) {
    const rect = this.progressBar.getBoundingClientRect()
    const offset = e.pageX - rect.left
    this.setProgressOffset(offset)
    this.computedPrcent()
    this.$emit('changed', this.localPercent)
  }
  public handleTouchStart (e: TouchEvent) {
    this.touch.initial = true
    this.touch.startX = e.touches[0].pageX
    this.touch.left = this.progressLine.clientWidth
  }
  public handleTouchMove (e: TouchEvent) {
    if (!this.touch.initial) {
      return
    }
    const diffX = e.touches[0].pageX - this.touch.startX
    const offset = Math.min(this.barWidth, Math.max(0, this.touch.left + diffX))
    this.setProgressOffset(offset)
    this.computedPrcent()
  }
  public handleTouchEnd () {
    this.touch.initial = false
    this.computedPrcent()
    this.$emit('changed', this.localPercent)
  }
  private computedProgressOffset (percent: number) {
    if (percent >= 0 && !this.touch.initial) {
      const offset = percent * this.barWidth
      this.setProgressOffset(offset)
    }
  }
  private setProgressOffset (offset: number) {
    this.progressLine.style.width = `${offset}px`
    this.progressBtn.style[transform as any] = `translate3d(${offset}px, 0, 0)`
  }
  private computedPrcent () {
    const lineWidth = this.progressLine.clientWidth
    this.localPercent = lineWidth / this.barWidth
  }

  // 计算属性
  private get barWidth () {
    return this.progressBar.clientWidth - this.progressBtn.clientWidth / 2
  }

  // 生命周期
  private mounted () {
    this.touch = {
      initial: false,
      startX: 0,
      left: 0
    }
    this.progressBar = this.$refs.ProgressBar as HTMLElement
    this.progressLine = this.$refs.ProgressLine as HTMLElement
    this.progressBtn = this.$refs.ProgressBtn as HTMLElement
  }
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
        left: -8px;
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
