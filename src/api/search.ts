import jsonp from '@/utils/jsonp'
import { commonParams, jsonpOptions } from './config'
import { MusicResponse } from '@/types/index'
import axios from '@/utils/axios'

export function getHotKeys (): Promise<MusicResponse> {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const params = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })
  return jsonp(url, params, jsonpOptions)
}

export function search (keyword: string, page: number, zhida: boolean, perpage: number): Promise<MusicResponse> {
  const url = ''
  const params = {
    w: keyword,
    p: page,
    perpage,
    n: perpage,
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    uin: 0,
    needNewCode: 1,
    platform: 'h5',
    format: 'json'
  }
  return axios.get(url, { params })
}
