<template>
  <div class="m-slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot />
    </div>
    <div v-if="showDots" class="slider-dots">
      <span
        v-for="(dot, index) in dots"
        :key="index"
        class="dot-item"
        :class="{active: index == activeIndex}"
      ></span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Ref } from 'vue-property-decorator'
import { addClass } from '@/utils/dom'
import BScroll from 'better-scroll'
@Component
export default class Slider extends Vue {
  private dots: undefined[] = []
  private activeIndex = 0
  private scroll!: BScroll
  private timer!: number | undefined
  @Ref('slider') readonly sliderRef!: HTMLElement
  @Ref('sliderGroup') readonly sliderGroupRef!: HTMLElement
  @Prop({ type: Boolean, default: true }) loop!: boolean
  @Prop({ type: Boolean, default: true }) autoPlay!: boolean
  @Prop({ type: Number, default: 4000 }) interval!: number
  @Prop({ type: Boolean, default: true }) showDots!: boolean

  private computedSliderWidth () {
    const sliderChildren = this.sliderGroupRef.children
    const bodyWidth = document.body.clientWidth
    let width = 0
    for (let index = 0; index < sliderChildren.length; index++) {
      const child = sliderChildren[index] as HTMLElement
      addClass(child, 'slider-item')
      child.style.width = `${bodyWidth}px`
      width += bodyWidth
    }
    if (this.loop) {
      width += bodyWidth * 2
    }
    this.sliderGroupRef.style.width = `${width}px`
  }
  private initDots () {
    if (!this.showDots) {
      return
    }
    this.dots = new Array(this.sliderGroupRef.children.length)
  }
  private initSlider () {
    this.scroll = new BScroll(this.sliderRef as HTMLElement, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: {
        loop: this.loop,
        threshold: 0.3,
        speed: 400
      }
    })
    this.listenScrollEvents()
  }
  private listenScrollEvents () {
    this.scroll.on('scrollEnd', this.scrollEnd)
    this.scroll.on('beforeScrollStart', () => {
      this.autoPlay && clearTimeout(this.timer)
    })
  }
  private scrollEnd () {
    this.activeIndex = this.scroll!.getCurrentPage().pageX
    this.autoPlay && this.play()
  }
  private play () {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.scroll.next()
    }, this.interval)
  }
  private clear () {
    this.scroll.disable()
    clearTimeout(this.timer)
    this.timer = undefined
  }

  private mounted () {
    this.$nextTick(() => {
      this.computedSliderWidth()
      this.initDots()
      this.initSlider()
      this.autoPlay && this.play()
    })
  }
  private beforeDestroy () {
    this.clear()
  }
  private activated () {
    this.scroll.enable()
    this.scrollEnd()
    this.scroll.goToPage(this.activeIndex, 0, 0)
  }
  private deactivated () {
    this.clear()
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/variables.scss';
  .m-slider {
    position: relative;
    height: 100%;
    .slider-group {
      position: relative;
      height: 100%;
      overflow: hidden;
    }
    .slider-item {
      float: left;
      overflow: hidden;
      a, img {
        display: block;
        width: 100%;
      }
    }
    .slider-dots {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 12px;
      text-align: center;
      .dot-item {
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: $color-text-l;
        &.active {
          width: 20px;
          border-radius: 5px;
          background-color: $color-text-l;
        }
      }
    }
  }
</style>
