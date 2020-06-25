import Song from '@/assets/js/song'

export interface SelectPlay {
  list: Song[];
  index: number | string;
}

export enum PlayMode {
  sequence = 0,
  loop = 1,
  random = 2
}
