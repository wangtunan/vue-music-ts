<template>
  <div class="m-empty">
    <img class="image" :src="img" alt="">
    <p class="title">{{title}}</p>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class Empty extends Vue {
  @Prop({ type: String, default: require('@/assets/images/empty.png') }) img!: string
  @Prop({ type: String, default: '抱歉，暂无数据' }) title!: string
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/variables.scss';
  .m-empty {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
    text-align: center;
    .image {
      width: 86px;
      height: 90px;
    }
    .title {
      margin-top: 30px;
      font-size: 14px;
      color: $color-text-d;
    }
  }
</style>
