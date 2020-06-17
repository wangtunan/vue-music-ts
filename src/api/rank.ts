import jsonp from '@/utils/jsonp'
import { commonParams, jsonpOptions } from './config'
import { MusicResponse } from '@/types/index'

export function getRankList (): Promise<MusicResponse> {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const params = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })
  return jsonp(url, params, jsonpOptions)
}
