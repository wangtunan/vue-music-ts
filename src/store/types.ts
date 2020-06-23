import Singer from '@/assets/js/singer'
import { DiscConfig } from '@/types/recommend'
import { RankListConfig } from '@/types/rank'

export interface DiscState {
  disc: DiscConfig
}

export interface SingerState {
  singer: Singer
}

export interface TopState {
  topList: RankListConfig
}

export interface historyState {
  searchHistory: string[];
  playHistory: any[]
}
