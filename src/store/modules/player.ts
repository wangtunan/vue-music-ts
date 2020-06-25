import * as types from '../mutation-type'
import Song from '@/assets/js/song'
import { Commit } from 'vuex'
import { PlayerState } from '../types'
import { SelectPlay } from '@/types/player'
const state = {
  playList: [],
  currentIndex: -1,
  fullScreen: false
}

const mutations = {
  [types.SET_PLAY_LIST] (state: PlayerState, list: Song[]) {
    state.playList = list
  },
  [types.SET_CURRENT_INDEX] (state: PlayerState, index: number | number) {
    state.currentIndex = index
  },
  [types.SET_FULL_SCREEN] (state: PlayerState, fullScreen: boolean) {
    state.fullScreen = fullScreen
  }
}

const actions = {
  selectPlay (context: { commit: Commit }, { list, index }: SelectPlay) {
    context.commit(types.SET_PLAY_LIST, list)
    context.commit(types.SET_CURRENT_INDEX, index)
    context.commit(types.SET_FULL_SCREEN, true)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
