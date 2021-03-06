import Vue from 'vue'
import Vuex from 'vuex'
import disc from './modules/disc'
import singer from './modules/singer'
import top from './modules/top'
import history from './modules/history'
import player from './modules/player'
import * as getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    disc,
    singer,
    top,
    history,
    player
  }
})
