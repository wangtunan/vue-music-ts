<template>
  <div class="m-song-lsit">
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
        class="song-item"
        @click="handleItemClick(item, index)"
      >
        <div v-if="rank" class="song-rank">
          <span :class="getRankClass(index)" v-text="getRankText(index)"></span>
        </div>
        <div class="song-content">
          <p class="name">{{item.name}}</p>
          <p class="desc">{{item.singer}}-{{item.album}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Song from '@/assets/js/song'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class SongList extends Vue {
  @Prop({ type: Boolean, default: false }) rank!: boolean
  @Prop({ type: Array, default () { return [] } }) list!: Song[]

  // methods方法
  public handleItemClick (item: Song, index: number) {
    this.$emit('select', item, index)
  }
  private getRankClass (index: number): string {
    if (index < 3) {
      return `icon icon${index}`
    } else {
      return 'text'
    }
  }
  private getRankText (index: number): number | undefined {
    if (index > 2) {
      return index + 1
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/mixin.scss';
  @import '~@/assets/styles/variables.scss';
  .m-song-lsit {
    padding: 20px 30px;
    .song-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 64px;
      .song-rank {
        flex: 0 0 25px;
        width: 25px;
        margin-right: 30px;
        text-align: center;
        .icon {
          display: inline-block;
          width: 25px;
          height: 25px;
          background-size: 25px 24px;
          &.icon0 {
            background-image: url('~@/assets/images/first.png');
          }
          &.icon1 {
            background-image: url('~@/assets/images/second.png');
          }
          &.icon2 {
            background-image: url('~@/assets/images/three.png');
          }
        }
        .text {
          color: $color-theme;
          font-size: 18px;
        }
      }
      .song-content {
        flex: 1;
        line-height: 22px;
        overflow: hidden;
        font-size: 14px;
      }
      .name {
        color: $color-text;
        @include ellipsis();
      }
      .desc {
        margin-top: 4px;
        color: $color-text-d;
        @include ellipsis();
      }
    }
  }
</style>
