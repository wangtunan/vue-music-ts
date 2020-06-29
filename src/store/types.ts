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
  playHistory: Song[];
}

export interface PlayerState {
  currentIndex: number;
  fullScreen: boolean;
  mode: number;
  playing: boolean;
  playList: Song[];
  sequenceList: Song[];
  favoriteList: Song[];
}
