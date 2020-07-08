import Singer from '@/assets/js/singer'
import Song from '@/assets/js/song'
import { Disc } from '@/types/recommend'
import { RankList } from '@/types/rank'

export interface DiscState {
  disc: Disc;
}

export interface SingerState {
  singer: Singer;
}

export interface TopState {
  topList: RankList;
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
