export interface TabConfig {
  name: string;
  path: string;
}

export interface MusicParams {
  g_tk: number;
  inCharset: string;
  outCharset: string;
  notice: number;
  format: 'jsonp';
  [propName: string]: any;
}

export interface MusicResponse {
  code: number;
  data: any;
  message?: string;
}

export type Direction = 'horizontal' | 'vertical'

export enum DirectionEnum {
  horizontal = 'horizontal',
  vertical = 'vertical'
}
