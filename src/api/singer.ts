import jsonp from '@/utils/jsonp'
import { commonParams, jsonpOptions } from './config'
import { MusicResponse } from '@/types/index'

export function getSingerList (): Promise<MusicResponse> {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })
  return jsonp(url, data, jsonpOptions)
}
