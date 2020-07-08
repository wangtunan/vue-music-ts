export interface SongConfig {
  singername: string;
  songname: string;
}
export interface RankList {
  id: number;
  picUrl: string;
  topTitle: string;
  songList: SongConfig[];
}
