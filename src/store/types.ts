import Singer from '@/assets/js/singer'
import Song from '@/assets/js/song'
import { DiscConfig } from '@/types/recommend'
import { RankListConfig } from '@/types/rank'

export interface DiscState {
  disc: DiscConfig;
}

export interface SingerState {
  singer: Singer;
}

export interface TopState {
  topList: RankListConfig;
}

export interface HistoryState {
  searchHistory: string[];
  playHistory: any[];
}

export interface PlayerState {
  playList: Song[];
  currentIndex: number;
  fullScreen: boolean;
}
