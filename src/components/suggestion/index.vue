<template>
  <scroll
    :data="resultList"
    class="suggestion-list"
  >
    <ul>
      <li
        v-for="(item, index) in resultList"
        :key="index"
        class="suggestion-item"
      >
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <p class="name">{{item}}</p>
      </li>
    </ul>
  </scroll>
</template>
<script lang="ts">
import Scroll from '@/components/scroll/index.vue'
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { search } from '@/api/search'
import { ERR_OK } from '@/api/config'
const pageSize = 20
@Component({
  components: {
    Scroll
  }
})
export default class SearchSuggestion extends Vue {
  private page = 1
  private resultList = ['张宇', '刘德华']
  @Prop({ type: String, default: '' }) keyword!: string

  // methods方法
  getSuggestionList (): void {
    search(this.keyword, this.page, true, pageSize).then(res => {
      const { code, data } = res
      if (code === ERR_OK) {
        console.log(data)
      }
    })
  }

  // watch监听器
  @Watch('keyword')
  onKeywordChange (newVal: string) {
    if (!newVal) {
      return
    }
    this.getSuggestionList()
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/mixin.scss';
  @import '~@/assets/styles/variables.scss';
  .suggestion-list {
    padding: 0 30px;
    height: 100%;
    overflow: hidden;
    .suggestion-item {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      .icon {
        flex: 0 0 30px;
        width: 30px;
        font-size: 14px;
        color: $color-text-d;
      }
      .name {
        flex: 1;
        font-size: 14px;
        color: $color-text-d;
        @include ellipsis();
      }
    }
  }
</style>
