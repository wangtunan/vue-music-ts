import * as types from '../mutation-type'
import Singer from '@/assets/js/singer'
import { SingerState } from '../types'

const state = {
  singer: {}
}

const mutations = {
  [types.SET_SINGER] (state: SingerState, singer: Singer) {
    state.singer = singer
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
