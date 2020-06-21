import { DiscState, SingerState } from './types'
export const disc = (state: any) => (state.disc as DiscState).disc
export const singer = (state: any) => (state.singer as SingerState).singer
