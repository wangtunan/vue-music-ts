import * as types from '../mutation-type'
import Song from '@/assets/js/song'
import { Commit } from 'vuex'
import { HistoryState } from '../types'
import { getSearchHistory, saveSearchHistory, deleteSearchHistory, clearSearchHistory, savePlayHistory, getPlayHistory } from '@/utils/cache'
const state = {
  searchHistory: getSearchHistory(),
  playHistory: getPlayHistory()
}

const mutations = {
  [types.SET_SEARCH_HISTORY] (state: HistoryState, searchHistory: string[]) {
    state.searchHistory = searchHistory
  },
  [types.SET_PLAY_HISTORY] (state: HistoryState, history: Song[]) {
    state.playHistory = history
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
  },
  savePlayHistory (context: { commit: Commit }, song: Song) {
    context.commit(types.SET_PLAY_HISTORY, savePlayHistory(song))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
