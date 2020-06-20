export interface HotKey  {
  k: string;
  n: number;
}

export interface SongPay {
  payalbumprice: number;
  [propName: string]: any;
}

export interface Album {
  albumid: number;
  albummid: string;
  albumname: string;
  singername: string;
  type: string | number;
  singerid?: number;
  [propName: string]: any;
}

export interface SongData {
  songid: string;
  songmid: string;
  singer: string;
  songname: string;
  albummid: string;
  albumname: string;
  interval: number;
  pay: SongPay | any;
  url: string;
  [propName: string]: any;
}

export interface SongPage {
  curnum: number;
  curpage: number;
  totalnum: number;
  list: SongData[];
  [propName: string]: any;
}


export interface SearchResult {
  song: SongPage;
  zhida: Album;
  [propName: string]: any;
}