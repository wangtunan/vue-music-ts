<template>
  <div id="app" @touchmove.prevent>
    <m-header />
    <m-tab :list="tabArr"/>
    <transition :name="transitionName">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
    <player />
  </div>
</template>

<script lang="ts">
import MHeader from '@/components/header/index.vue'
import MTab from '@/components/tab/index.vue'
import Player from '@/components/player/index.vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { tabList } from '@/assets/js/data'
import { TabConfig } from '@/types/index'
import { RouteConfig } from 'vue-router'
@Component({
  components: {
    MHeader,
    MTab,
    Player
  }
})
export default class App extends Vue {
  private tabArr: TabConfig[] = tabList
  private transitionName = ''
  @Watch('$route')
  onRouteChange (to: RouteConfig, from: RouteConfig) {
    if (from.path !== '/') {
      const toIndex = this.tabArr.findIndex(item => item.path === to.path)
      const fromIndex = this.tabArr.findIndex(item => item.path === from.path)
      if (toIndex === -1 || fromIndex === -1) {
        this.transitionName = ''
      } else {
        this.transitionName = toIndex > fromIndex ? 'slide-left' : 'slide-right'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .slide-left-enter-active, .slide-left-leave-active .slide-right-leave-active, .slide-right-enter-active {
    transition: transform 0.3s;
  }
  .slide-left-enter, .slide-left-leave-to {
    transform: translate3d(100%, 0, 0)
  }
  .slide-right-enter, .slide-right-leave-to {
    transform: translate3d(-100%, 0, 0)
  }
</style>
