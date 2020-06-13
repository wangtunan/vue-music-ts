<template>
  <div ref="Scroll">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Direction, DirectionEnum } from '@/types/index'
import BScroll from 'better-scroll'
@Component
export default class Scroll extends Vue {
  private scroll!: BScroll
  @Prop({ type: Number, default: 1 }) probeType!: number
  @Prop({ type: Boolean, default: false }) click!: boolean
  @Prop({ type: String, default: DirectionEnum.vertical }) direction!: Direction
  @Prop({ type: Array, default () { return [] } }) data!: any

  // methods方法
  public enable (): void {
    this.scroll && this.scroll.enable()
  }
  public disable (): void {
    this.scroll && this.scroll.disable()
  }
  public refresh (): void {
    this.scroll && this.scroll.refresh()
  }
  public scrollTo (...args: any): void {
    this.scroll && this.scroll.scrollTo.apply(this.scroll, args)
  }
  public scrollElement (...args: any): void {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, args)
  }
  private initScroll (): void {
    if (!this.scroll) {
      this.scroll = new BScroll(this.$refs.Scroll as HTMLElement, {
        click: this.click,
        probeType: this.probeType,
        eventPassthrough: this.direction === DirectionEnum.horizontal ? DirectionEnum.vertical : DirectionEnum.horizontal
      })
    } else {
      this.scroll.refresh()
    }
  }

  // watch
  @Watch('data')
  onDataChange (): void {
    this.$nextTick(() => {
      this.scroll.refresh()
    })
  }

  // 生命周期
  private mounted (): void {
    this.$nextTick(() => {
      this.initScroll()
    })
  }
}
</script>
