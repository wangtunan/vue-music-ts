import jsonp from '@/utils/jsonp'
import { commonParams, jsonpOptions } from './config'
import { MusicResponse } from '@/types/index'

export function getHotKeys (): Promise<MusicResponse> {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const params = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })
  return jsonp(url, params, jsonpOptions)
}
