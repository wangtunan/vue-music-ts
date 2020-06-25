import * as types from '../mutation-type'
import Song from '@/assets/js/song'
import { Commit } from 'vuex'
import { PlayerState } from '../types'
import { SelectPlay, PlayMode } from '@/types/player'
import { saveFavoriteList, deleteFavoriteList } from '@/utils/cache'
const state = {
  currentIndex: -1,
  fullScreen: false,
  mode: PlayMode.sequence,
  playList: [],
  favoriteList: []
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
  },
  [types.SET_PLAY_MODE] (state: PlayerState, mode: number) {
    state.mode = mode
  },
  [types.SET_FAVORITE_LIST] (state: PlayerState, favoriteList: Song[]) {
    state.favoriteList = favoriteList
  }
}

const actions = {
  selectPlay (context: { commit: Commit }, { list, index }: SelectPlay) {
    context.commit(types.SET_PLAY_LIST, list)
    context.commit(types.SET_CURRENT_INDEX, index)
    context.commit(types.SET_FULL_SCREEN, true)
  },
  saveFavoriteList (context: { commit: Commit }, song: Song) {
    context.commit(types.SET_FAVORITE_LIST, saveFavoriteList(song))
  },
  deleteFavoriteList (context: { commit: Commit }, song: Song) {
    context.commit(types.SET_FAVORITE_LIST, deleteFavoriteList(song))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
