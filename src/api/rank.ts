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

export function getTopList (topId: string | number): Promise<MusicResponse> {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const params = Object.assign({}, commonParams, {
    topid: topId,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5'
  })

  return jsonp(url, params, jsonpOptions).then(res => {
    return {
      code: 0,
      data: res.songlist
    }
  })
}
