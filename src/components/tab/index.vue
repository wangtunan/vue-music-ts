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
        <span class="tab-name">
          {{tab.name}}
        </span>
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { TabConfig } from '@/types/index'
@Component
export default class MTab extends Vue {
  private activeIndex = 0
  @Prop({ type: Array, default () { return [] } }) list!: TabConfig[]

  // methods方法
  public handleTabClick (index: number) {
    this.activeIndex = index
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
        color: $color-theme;
        .tab-name {
          border-color: $color-theme;
        }
      }
      .tab-name {
        padding-bottom: 5px;
        border-bottom: 2px solid transparent;
      }
    }
  }
</style>
