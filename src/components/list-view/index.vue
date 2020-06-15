<template>
  <scroll class="m-listview" :data="list">
    <!-- 歌手列表 -->
    <ul>
      <li
        v-for="(group, index) in list"
        :key="index"
        class="listview-item"
      >
        <p class="listview-title">{{group.title}}</p>
        <ul>
          <li
            v-for="(singer, index) in group.items"
            :key="index"
            class="listview-singer"
          >
            <img class="avatar" v-lazy="singer.avatar" alt="">
            <p class="name">{{singer.name}}</p>
          </li>
        </ul>
      </li>
    </ul>

    <!-- 快速入口 -->
    <ul class="listview-shortcut">
      <li
        v-for="(item, index) in shortcutList"
        :key="index"
        class="shortcut-item"
        :class="{active: shortcutIndex == index}"
      >
        {{item}}
      </li>
    </ul>
  </scroll>
</template>
<script lang="ts">
import Scroll from '@/components/scroll/index.vue'
import { ListViewConfig } from '@/types/singer'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {
    Scroll
  }
})
export default class ListView extends Vue {
  private shortcutIndex = 0
  @Prop({ type: Array, default () { return [] } }) list!: ListViewConfig[]

  // 计算属性
  private get shortcutList () {
    return this.list.map(item => item.title.substring(0, 1))
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
      background-color: #333;
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
  }
</style>
