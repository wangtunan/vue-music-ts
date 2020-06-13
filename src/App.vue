<template>
  <div id="app" @touchmove.prevent>
    <m-header />
    <m-tab :list="tabArr"/>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import MHeader from '@/components/header/index.vue'
import MTab from '@/components/tab/index.vue'
import { Component, Vue } from 'vue-property-decorator'
import { tabList } from '@/assets/js/data'
import { TabConfig } from '@/types/index'
@Component({
  components: {
    MHeader,
    MTab
  }
})
export default class App extends Vue {
  private tabArr: TabConfig[] = tabList
}
</script>
