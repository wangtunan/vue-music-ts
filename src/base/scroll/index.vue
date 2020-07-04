<template>
  <div ref="scroll">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Ref } from 'vue-property-decorator'
import { Direction, DirectionEnum } from '@/types/index'
import BScroll from 'better-scroll'
@Component
export default class Scroll extends Vue {
  public scroll!: BScroll
  @Ref('scroll') readonly scrollRef!: HTMLElement
  @Prop({ type: Number, default: 1 }) probeType!: number
  @Prop({ type: Boolean, default: false }) click!: boolean
  @Prop({ type: Boolean, default: false }) listenScroll!: boolean
  @Prop({ type: String, default: DirectionEnum.vertical }) direction!: Direction
  @Prop({ type: Array, default () { return [] } }) data!: any
  @Watch('data')
  onDataChange () {
    this.$nextTick(() => {
      this.refresh()
    })
  }

  public enable () {
    this.scroll && this.scroll.enable()
  }
  public disable () {
    this.scroll && this.scroll.disable()
  }
  public refresh () {
    this.scroll && this.scroll.refresh()
  }
  public scrollTo (...args: any) {
    this.scroll && this.scroll.scrollTo.apply(this.scroll, args)
  }
  public scrollToElement (...args: any) {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, args)
  }
  private initScroll () {
    if (!this.scrollRef) {
      return
    }
    this.scroll = new BScroll(this.scrollRef, {
      click: this.click,
      probeType: this.probeType,
      eventPassthrough: this.direction === DirectionEnum.horizontal ? DirectionEnum.vertical : DirectionEnum.horizontal
    })
    this.listenEvent()
  }
  private listenEvent () {
    if (this.listenScroll) {
      this.scroll.on('scroll', (pos) => {
        this.$emit('scroll', pos)
      })
    }
  }

  private mounted () {
    this.$nextTick(() => {
      this.initScroll()
    })
  }
}
</script>
