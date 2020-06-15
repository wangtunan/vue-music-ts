import Singer from '@/assets/js/singer'

export interface MusicSingerConfig {
  Findex: string;
  Fsinger_id: string;
  Fsinger_mid: string;
  Fsinger_name: string;
}

export interface ListViewConfig {
  title: string;
  items: Singer[];
}

export interface MapListConfig {
  [propName: string]: ListViewConfig
}
