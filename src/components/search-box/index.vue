<template>
  <div class="m-searchbox">
    <i class="icon-search"></i>
    <input v-model="keyword" type="text" class="search-input" :placeholder="placeholder"/>
    <i v-show="keyword" class="icon-dismiss" @click="handleClearClick"></i>
  </div>
</template>
<script lang="ts">
import { debounce } from '@/utils/utils'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class SearchBox extends Vue {
  private keyword = ''
  @Prop({ type: String, default: '搜索歌曲、歌手' }) placeholder!: string

  // methods方法
  public handleClearClick () {
    this.keyword = ''
  }
  public setKeyword (keyword: string) {
    this.keyword = keyword.trim()
  }

  // 生命周期
  private created () {
    this.$watch('keyword', debounce(() => {
      this.$emit('search', this.keyword)
    }, 300))
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/mixin.scss';
  @import '~@/assets/styles/variables.scss';
  .m-searchbox {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 6px;
    height: 40px;
    border-radius: 6px;
    background-color:$color-highlight-background;
    .icon-search {
      font-size: 24px;
      color: $color-text-d;
    }
    .icon-dismiss {
      font-size: 16px;
      color: $color-text-d;
      @include extend-click();
    }
    .search-input {
      flex: 1;
      margin: 0 5px;
      height: 22px;
      line-height: 22px;
      outline: 0;
      border: 0;
      color: $color-text;
      background-color: $color-highlight-background;
      font-size: 14px;
      &::placeholder {
        color: $color-text-d;
      }
    }
  }
</style>
