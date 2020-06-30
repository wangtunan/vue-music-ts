<template>
  <ul class="m-switches">
    <li
      v-for="(item, index) in switches"
      :key="index"
      class="switch-item"
      :class="{
        active: activeIndex === index
      }"
      @click="handleSwitchItemClick(index)"
    >{{item}}</li>
  </ul>
</template>
<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator'
@Component
export default class Switches extends Vue {
  @Prop({ type: Array, default () { return [] } }) switches!: string[]
  @PropSync('active', { type: Number, default: 0 }) activeIndex!: number

  public handleSwitchItemClick (index: number) {
    this.activeIndex = index
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/variables.scss';
  .m-switches {
    margin: 0 auto;
    width: 70%;
    max-width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $color-highlight-background;
    border-radius: 5px;
    .switch-item {
      flex: 1;
      padding: 8px;
      text-align: center;
      font-size: 14px;
      color: $color-text-d;
      &.active {
        background: $color-highlight-background;
        color: $color-text;
      }
    }
  }
</style>
