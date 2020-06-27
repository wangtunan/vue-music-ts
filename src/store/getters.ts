import { DiscState, SingerState, TopState, HistoryState, PlayerState } from './types'

export const disc = (state: any) => (state.disc as DiscState).disc

export const singer = (state: any) => (state.singer as SingerState).singer

export const topList = (state: any) => (state.top as TopState).topList

export const searchHistory = (state: any) => (state.history as HistoryState).searchHistory

export const playHistory = (state: any) => (state.history as HistoryState).playHistory

export const playList = (state: any) => (state.player as PlayerState).playList

export const favoriteList = (state: any) => (state.player as PlayerState).favoriteList

export const currentIndex = (state: any) => (state.player as PlayerState).currentIndex

export const currentSong = (state: any) => {
  const player = state.player as PlayerState
  return player.playList[player.currentIndex] || {}
}

export const fullScreen = (state: any) => (state.player as PlayerState).fullScreen

export const mode = (state: any) => (state.player as PlayerState).mode

export const playing = (state: any) => (state.player as PlayerState).playing
