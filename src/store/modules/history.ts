import * as types from '../mutation-type'
import { Commit } from 'vuex'
import { historyState } from '../types'
import { getSearchHistory, saveSearchHistory, deleteSearchHistory, clearSearchHistory } from '@/utils/cache'
const state = {
  searchHistory: getSearchHistory(),
  playHistory: {}
}

const mutations = {
  [types.SET_SEARCH_HISTORY] (state: historyState, searchHistory: string[]) {
    state.searchHistory = searchHistory
  }
}

const actions = {
  saveSearchHistory (context: { commit: Commit }, keyword: string) {
    context.commit(types.SET_SEARCH_HISTORY, saveSearchHistory(keyword))
  },
  deleteSearchHistory (context: { commit: Commit }, keyword: string) {
    context.commit(types.SET_SEARCH_HISTORY, deleteSearchHistory(keyword))
  },
  clearSearchHistory (context: { commit: Commit }) {
    context.commit(types.SET_SEARCH_HISTORY, clearSearchHistory())
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
