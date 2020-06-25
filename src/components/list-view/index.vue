<template>
  <scroll
    ref="ListView"
    class="m-listview"
    :data="list"
    :probe-type="3"
    :listen-scroll="true"
    @scroll="handleScroll">
    <!-- 歌手列表 -->
    <ul>
      <li
        ref="ListGroup"
        v-for="(group, index) in list"
        :key="index"
        class="listview-item">
        <p class="listview-title">{{group.title}}</p>
        <ul>
          <li
            v-for="(singer, index) in group.items"
            :key="index"
            class="listview-singer"
            @click="handleSingerClick(singer)"
          >
            <img class="avatar" v-lazy="singer.avatar" alt="">
            <p class="name">{{singer.name}}</p>
          </li>
        </ul>
      </li>
    </ul>

    <!-- 快速入口 -->
    <ul
      class="listview-shortcut"
      @touchstart.stop.prevent="handleTouchStart"
      @touchmove.stop="handleTouchMove"
      @touchend.stop="showAnchorName = false">
      <li
        ref="Anchor"
        v-for="(item, index) in shortcutList"
        :key="index"
        class="shortcut-item"
        :class="{active: shortcutIndex == index}"
        :data-index="index"
      >
        {{item}}
      </li>
    </ul>

    <!-- 当前锚点项 -->
    <div v-show="showAnchorName" class="anchor-name">{{currentAnchorName}}</div>

    <!-- 锚点固定项 -->
    <div v-if="fixedTitle" ref="FixedTitle" class="anchor-fixed">
      <p>{{fixedTitle}}</p>
    </div>
  </scroll>
</template>
<script lang="ts">
import Scroll from '@/components/scroll/index.vue'
import Singer from '@/assets/js/singer'
import { ListViewConfig, TouchConfig } from '@/types/singer'
import { Position } from '@/types/index'
import { getDomData, getVendorsPrefix } from '@/utils/dom'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
const transform = getVendorsPrefix('transform')
@Component({
  components: {
    Scroll
  }
})
export default class ListView extends Vue {
  private touch!: TouchConfig
  private fixedTop!: number
  private anchorHeight!: number
  private titleHeight!: number
  private listHeight!: number[]
  private shortcutIndex = 0
  private scrollY = -1
  private diffY = 0
  private showAnchorName = false
  @Prop({ type: Array, default () { return [] } }) list!: ListViewConfig[]

  // methods方法
  public handleTouchStart (e: TouchEvent) {
    const anchorIndex = getDomData(e.target as HTMLElement, 'index')
    this.touch.y1 = e.touches[0].pageY
    this.touch.anchorIndex = anchorIndex
    this.showAnchorName = true
    this.scrollTo(anchorIndex as string)
  }
  public handleTouchMove (e: TouchEvent) {
    this.touch.y2 = e.touches[0].pageY
    const diffIndex = (this.touch.y2 - this.touch.y1) / this.anchorHeight | 0
    const anchorIndex = parseInt(this.touch.anchorIndex as string) + diffIndex
    this.scrollTo(anchorIndex)
  }
  public handleScroll (pos: Position) {
    this.scrollY = pos.y
  }
  public handleSingerClick (singer: Singer) {
    this.$emit('select', singer)
  }
  private scrollTo (index: string | number | null) {
    if (!index) {
      return
    }
    const listView = this.$refs.ListView as Scroll
    let newIndex = +index
    if (newIndex < 0) {
      newIndex = 0
    } else if (newIndex > this.listHeight.length - 2) {
      newIndex = this.listHeight.length - 2
    }
    listView.scrollToElement((this.$refs.ListGroup as HTMLElement[])[newIndex], 0)
    this.scrollY = listView.scroll.y
  }
  private computedHeightList () {
    const heightList = [0]
    let height = 0
    const listGroup: HTMLElement[] = this.$refs.ListGroup as HTMLElement[]
    for (let index = 0; index < listGroup.length; index++) {
      const groupItem: HTMLElement = listGroup[index]
      height += groupItem.clientHeight
      heightList.push(height)
    }
    this.listHeight = heightList
  }
  private computedAnchorHeight () {
    const anchorList = this.$refs.Anchor as HTMLElement[]
    this.anchorHeight = anchorList[0].clientHeight
  }
  private computedTitleHeight () {
    const listGroup = this.$refs.ListGroup as HTMLElement[]
    this.titleHeight = (listGroup[0].firstChild as HTMLElement).clientHeight
  }

  // 计算属性
  private get shortcutList () {
    return this.list.map(item => item.title.substring(0, 1))
  }
  private get currentAnchorName () {
    return this.shortcutList[this.shortcutIndex]
  }
  private get fixedTitle () {
    if (this.scrollY > 0) {
      return ''
    }
    const currentItem = this.list[this.shortcutIndex]
    return currentItem ? currentItem.title : ''
  }

  // watch监听
  @Watch('list')
  private onListChange () {
    this.$nextTick(() => {
      this.computedHeightList()
      this.computedAnchorHeight()
      this.computedTitleHeight()
    })
  }
  @Watch('scrollY')
  private onScrollYChange (newY: number) {
    if (newY > 0) {
      this.shortcutIndex = 0
      return
    }
    if (-newY > this.listHeight[this.listHeight.length - 1]) {
      this.shortcutIndex = this.listHeight.length - 2
      return
    }
    for (let index = 0; index < this.listHeight.length - 1; index++) {
      const height1 = this.listHeight[index]
      const height2 = this.listHeight[index + 1]
      if (-newY >= height1 && -newY < height2) {
        this.shortcutIndex = index
        this.diffY = height2 + newY
        break
      }
    }
  }
  @Watch('diffY')
  private onDiffYChange (newY: number) {
    const fixedTop = (newY > 0 && newY < this.titleHeight) ? newY - this.titleHeight : 0
    if (this.fixedTop === fixedTop) {
      return
    }
    const fixedTitle = this.$refs.FixedTitle as HTMLElement
    this.fixedTop = fixedTop
    // @ts-ignore
    fixedTitle.style[transform] = `translate3d(0, ${this.fixedTop}px, 0)`
  }

  // 生命周期
  private created () {
    this.touch = {
      y1: 0,
      y2: 0
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/mixin.scss';
  @import '~@/assets/styles/variables.scss';
  .m-listview {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: $color-background;
    overflow: hidden;
    .listview-item {
      padding-bottom: 30px;
    }
    .listview-title {
      padding-left: 20px;
      height: 30px;
      line-height: 30px;
      background-color: $color-highlight-background;
      font-size: 12px;
      color: $color-text-l;
    }
    .listview-singer {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        display: inline-block;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        margin-right: 30px;
        flex: 1;
        font-size: 14px;
        color: $color-text-l;
        @include ellipsis();
      }
    }
    .listview-shortcut {
      z-index: 30;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      padding: 20px 0;
      background-color: $color-background-d;
      border-radius: 10px;
      text-align: center;
      .shortcut-item {
        padding: 3px;
        color: $color-text-l;
        font-size: 12px;
        &.active {
          color: $color-theme;
        }
      }
    }
    .anchor-name {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 40px;
      height: 40px;
      transform: translate(-50%, -50%);
      line-height: 40px;
      text-align: center;
      background-color: $color-background-d;
      border-radius:5px;
      font-size: 14px;
      color: $color-theme;
      font-weight: bold;
    }
    .anchor-fixed {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      & > p {
        padding-left: 20px;
        height: 30px;
        line-height: 30px;
        background-color: $color-highlight-background;
        font-size: 12px;
        color: $color-text-l;
      }
    }
  }
</style>
