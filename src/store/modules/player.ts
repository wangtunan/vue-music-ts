import * as types from '../mutation-type'
import Song from '@/assets/js/song'
import { Commit } from 'vuex'
import { PlayerState } from '../types'
import { SelectPlay, PlayMode } from '@/types/player'
import { getFavoriteList, saveFavoriteList, deleteFavoriteList } from '@/utils/cache'
import { shuffle } from '@/utils/utils'
const state = {
  currentIndex: -1,
  fullScreen: false,
  mode: PlayMode.sequence,
  playing: false,
  playList: [],
  favoriteList: getFavoriteList()
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
  },
  [types.SET_PLAY_STATE] (state: PlayerState, playing: boolean) {
    state.playing = playing
  }
}

const actions = {
  selectPlay (context: { commit: Commit }, { list, index }: SelectPlay) {
    context.commit(types.SET_PLAY_LIST, list)
    context.commit(types.SET_CURRENT_INDEX, index)
    context.commit(types.SET_FULL_SCREEN, true)
    context.commit(types.SET_PLAY_STATE, true)
  },
  randomPlay (context: { commit: Commit }, list: Song[]) {
    const randomPlayList = shuffle(list)
    context.commit(types.SET_PLAY_MODE, PlayMode.random)
    context.commit(types.SET_PLAY_LIST, randomPlayList)
    context.commit(types.SET_CURRENT_INDEX, 0)
    context.commit(types.SET_FULL_SCREEN, true)
    context.commit(types.SET_PLAY_STATE, true)
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
