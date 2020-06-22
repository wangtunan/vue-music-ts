import * as types from '../mutation-type'
import { TopState } from '../types'
import { RankListConfig } from '@/types/rank'

const state = {
  topList: {}
}

const mutations = {
  [types.SET_TOP_LIST] (state: TopState, topList: RankListConfig) {
    state.topList = topList
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
