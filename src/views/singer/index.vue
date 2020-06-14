<template>
  <transition name="slide">
    <div class="m-singer">
      singer
    </div>
  </transition>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getSingerList } from '@/api/singer'
import { ERR_OK } from '@/api/config'
@Component
export default class Singer extends Vue {
  // methods方法
  getSingerListData (): void {
    getSingerList().then(res => {
      const { code, data } = res
      if (code === ERR_OK) {
        console.log(data)
      }
    })
  }
  // 生命周期
  private mounted (): void {
    this.getSingerListData()
  }
}
</script>
<style lang="scss" scoped>
  .m-singer {
    position: fixed;
    top: 88px;
    left: 0;
    bottom: 0;
    width: 100%;
  }
</style>
