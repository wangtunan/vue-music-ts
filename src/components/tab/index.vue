<template>
  <div class="m-tab">
    <div class="tab-container">
      <router-link
        tag="div"
        class="tab-item"
        v-for="(tab, index) in list"
        :key="index"
        :to="tab.path"
        @click.native="handleTabClick(index)"
      >
        {{tab.name}}
      </router-link>
    </div>
    <span class="tab-bar" :style="barStyle"></span>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { TabConfig } from '@/types/index'
@Component
export default class MTab extends Vue {
  private activeIndex = 0
  @Prop({ type: Array, default () { return [] } }) list!: TabConfig[]

  // 计算属性
  private get barStyle () {
    return {
      left: `${this.activeIndex * 25 + 12.5}%`
    }
  }

  // methods方法
  public handleTabClick (index: number): void {
    this.activeIndex = index
  }

  private parseActiveIndex (): void {
    const findIndex = this.list.findIndex((tab: TabConfig) => tab.path === this.$route.path)
    this.activeIndex = findIndex === -1 ? 0 : findIndex
  }

  // watch
  @Watch('$route')
  onRouteChange (): void {
    this.parseActiveIndex()
  }

  @Watch('list')
  onListChange (): void {
    this.parseActiveIndex()
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/variables.scss';
  .m-tab {
    position: relative;
    .tab-container {
      display: flex;
      align-items: center;
    }
    .tab-item {
      position: relative;
      flex: 1;
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      text-align: center;
      color: $color-text-l;
      &.router-link-active {
        color:$color-theme;
      }
    }
    .tab-bar {
      position: absolute;
      left: 12.5%;
      bottom: 5px;
      width: 28px;
      height: 2px;
      background-color: $color-theme;
      border-radius: 5px;
      transform: translateX(-50%);
      transition: left 0.25s ease-in-out;
    }
  }
</style>
