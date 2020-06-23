import { DiscState, SingerState, TopState, historyState } from './types'
export const disc = (state: any) => (state.disc as DiscState).disc
export const singer = (state: any) => (state.singer as SingerState).singer
export const topList = (state: any) => (state.top as TopState).topList
export const searchHistory = (state: any) => (state.history as historyState).searchHistory
export const playHistory = (state: any) => (state.history as historyState).playHistory
