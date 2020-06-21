<template>
  <div class="m-song-lsit">
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
        class="song-item"
        @click="handleItemClick(item)"
      >
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
  @Prop({ type: Array, default () { return [] } }) list!: Song[]

  // methods方法
  public handleItemClick (item: Song): void {
    this.$emit('select', item)
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
