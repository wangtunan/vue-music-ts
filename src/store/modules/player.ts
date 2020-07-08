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
  sequenceList: [],
  favoriteList: getFavoriteList()
}

const mutations = {
  [types.SET_PLAY_LIST] (state: PlayerState, list: Song[]) {
    state.playList = list
  },
  [types.SET_CURRENT_INDEX] (state: PlayerState, index: number) {
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
  },
  [types.SET_SEQUENCE_LIST] (state: PlayerState, list: Song[]) {
    state.sequenceList = list
  }
}

const actions = {
  selectPlay (context: { commit: Commit }, { list, index }: SelectPlay) {
    context.commit(types.SET_PLAY_LIST, list)
    context.commit(types.SET_SEQUENCE_LIST, list)
    context.commit(types.SET_CURRENT_INDEX, index)
    context.commit(types.SET_FULL_SCREEN, true)
    context.commit(types.SET_PLAY_STATE, true)
  },
  randomPlay (context: { commit: Commit }, list: Song[]) {
    const randomPlayList = shuffle(list)
    context.commit(types.SET_PLAY_MODE, PlayMode.random)
    context.commit(types.SET_PLAY_LIST, randomPlayList)
    context.commit(types.SET_SEQUENCE_LIST, list)
    context.commit(types.SET_CURRENT_INDEX, 0)
    context.commit(types.SET_FULL_SCREEN, true)
    context.commit(types.SET_PLAY_STATE, true)
  },
  saveFavoriteList (context: { commit: Commit }, song: Song) {
    context.commit(types.SET_FAVORITE_LIST, saveFavoriteList(song))
  },
  deleteFavoriteList (context: { commit: Commit }, song: Song) {
    context.commit(types.SET_FAVORITE_LIST, deleteFavoriteList(song))
  },
  insertSong (context: { commit: Commit, state: PlayerState }, song: Song) {
    const playList: Song[] = state.playList.slice()
    const sequenceList: Song[] = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    const pIndex = playList.findIndex(item => item.id === song.id)
    const sIndex = sequenceList.findIndex(item => item.id === song.id)
    if (pIndex === -1) {
      playList.unshift(song)
    } else {
      playList.splice(pIndex, 1)
      playList.unshift(song)
    }
    currentIndex = 0

    if (sIndex === -1) {
      sequenceList.unshift(song)
    } else {
      sequenceList.splice(sIndex, 1)
      sequenceList.unshift(song)
    }

    context.commit(types.SET_PLAY_LIST, playList)
    context.commit(types.SET_SEQUENCE_LIST, sequenceList)
    context.commit(types.SET_CURRENT_INDEX, currentIndex)
    context.commit(types.SET_PLAY_STATE, true)
    context.commit(types.SET_FULL_SCREEN, true)
  },
  deleteSong (context: { commit: Commit, state: PlayerState }, song: Song) {
    const playList: Song[] = state.playList.slice()
    const sequenceList: Song[] = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    const pIndex = playList.findIndex(item => item.id === song.id)
    const sIndex = sequenceList.findIndex(item => item.id === song.id)
    playList.splice(pIndex, 1)
    sequenceList.splice(sIndex, 1)
    if (currentIndex > pIndex || currentIndex === playList.length) {
      currentIndex--
    }
    context.commit(types.SET_PLAY_LIST, playList)
    context.commit(types.SET_SEQUENCE_LIST, sequenceList)
    context.commit(types.SET_CURRENT_INDEX, currentIndex)
    if (!playList.length) {
      context.commit(types.SET_PLAY_STATE, false)
    } else {
      context.commit(types.SET_PLAY_STATE, true)
    }
  },
  deleteSongList (context: { commit: Commit }) {
    context.commit(types.SET_CURRENT_INDEX, -1)
    context.commit(types.SET_PLAY_LIST, [])
    context.commit(types.SET_SEQUENCE_LIST, [])
    context.commit(types.SET_PLAY_STATE, false)
    context.commit(types.SET_FULL_SCREEN, false)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
