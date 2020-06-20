import Vue from 'vue'
import Vuex from 'vuex'
import disc from './modules/disc'
import * as getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    disc
  }
})
