<template>
  <transition name="slide-down">
    <div v-if="showNotify" class="m-notify">
      <p class="notify-message">
        <span class="notify-icon" :class="icon"></span>
        <span v-if="message">{{message}}</span>
      </p>
    </div>
  </transition>
</template>
<script lang="ts">
import { Component, Vue, Prop, PropSync, Watch } from 'vue-property-decorator'
@Component
export default class Notify extends Vue {
  private timer!: number | undefined
  @Prop({ type: Number, default: 3000 }) duration!: number
  @Prop({ type: String, default: '' }) message!: string
  @Prop({ type: String, default: 'icon-ok' }) icon!: string
  @PropSync('visible', { type: Boolean, default: false }) showNotify!: boolean
  @Watch('visible')
  onVisibleChange (newVal: boolean) {
    if (newVal) {
      this.timer = setTimeout(() => {
        this.showNotify = false
      }, this.duration)
    }
  }

  private beforeDestroy () {
    clearTimeout(this.timer)
    this.timer = undefined
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/variables.scss';
  .m-notify {
    z-index: 500;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    background: #666;
    &.slide-down-enter-active, &.slide-down-leave-active {
      transition: all 0.3s ease;
    }
    &.slide-down-enter, &.slide-down-leave-to {
      transform: translate3d(0, -100%, 0);
    }
    .notify-message {
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: $color-text;
      font-size: 14px;
      .notify-icon {
        margin-right: 5px;
        color: $color-theme;
      }
    }
  }
</style>
