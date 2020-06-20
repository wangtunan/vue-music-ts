import * as types from '../mutation-type'
import { DiscConfig } from '@/types/recommend'
import { DiscState } from '../types'
const state = {
  disc: {}
}

const mutations = {
  [types.SET_DISC] (state: DiscState, disc: DiscConfig) {
    state.disc = disc
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
