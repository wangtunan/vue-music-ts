<template>
  <transition name="fade">
    <div v-show="visible" class="m-confirm">
      <div class="confirm-box">
        <h2 class="text">{{message}}</h2>
        <div class="btn-box">
          <div v-if="showCancelButton" class="btn cancel" @click="handleCancelClick">{{cancelButtonText}}</div>
          <div v-if="showConfirmButton" class="btn confirm" @click="handleConfirmClick">{{confirmButtonText}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class Comfirm extends Vue {
  @Prop({ type: Boolean, default: false }) visible!: boolean
  @Prop({ type: String, default: '' }) message!: string
  public cancelButtonText = '取消'
  public confirmButtonText = '确定'
  public showCancelButton = true
  public showConfirmButton = true

  // methods方法
  handleCancelClick (): void {
    this.show = false
  }
  handleConfirmClick (): void {
    this.show = false
    this.$emit('confirm')
  }

  // 计算属性
  private get show () {
    return this.visible
  }
  private set show (val) {
    this.$emit('update:visible', val)
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/variables.scss';
  .m-confirm {
    z-index: 998;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: $color-background-d;
    &.fade-enter-active {
      animation: confirm-fadein 0.3s;
      .confirm-box {
        animation: confirm-zoom 0.3s;
      }
    }
    .confirm-box {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 270px;
      transform: translate(-50%, -50%);
      border-radius: 13px;
      background-color: $color-highlight-background;
    }
    .text {
      padding: 20px 15px;
      line-height: 22px;
      text-align: center;
      font-size: 14px;
      color: $color-text-l;
      font-weight: normal;
    }
    .btn-box {
      display: flex;
      align-items: center;
      justify-content: center;
      .btn {
        flex: 1;
        padding: 10px 0;
        text-align: center;
        line-height: 22px;
        border-top: 1px solid $color-background-d;
        font-size: 14px;
        color: $color-text-l;
        & + .btn {
          border-left: 1px solid $color-background-d;
        }
      }
    }
  }
  @keyframes confirm-fadein {
    0% {
      opacity: 0;
    } 100% {
      opacity: 1;
    }
  }
  @keyframes confirm-zoom {
    0% {
      transform: translate(-50%, -50%) scale(0);
    } 50% {
      transform: translate(-50%, -50%) scale(1.1);
    } 100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }
</style>
