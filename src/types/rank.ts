export interface SongConfig {
  singername: string;
  songname: string;
  [propName: string]: any;
}
export interface RankListConfig {
  id: number;
  picUrl: string;
  topTitle: string;
  songList: SongConfig[];
  [propName: string]: any;
}
