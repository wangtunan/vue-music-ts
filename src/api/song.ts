import axios from '@/utils/axios'
import Song from '@/assets/js/song'
import { commonParams, ERR_OK } from './config'
import { SongUrlMap } from '@/types/song'
import { getUid } from '@/utils/utils'
import { MusicResponse } from '@/types'
let tryCount = 3
function createSongMids (songs: Song[]): object {
  const mids = songs.map(song => song.mid)
  const types = new Array(mids.length).fill(0)
  const guid = getUid()
  return {
    module: 'vkey.GetVkeyServer',
    method: 'CgiGetVkey',
    param: {
      guid,
      songmid: mids,
      songtype: types,
      uin: '0',
      loginflag: 0,
      platform: '23'
    }
  }
}

export function getSongUrl (songs: Song[]): Promise<SongUrlMap> {
  const url = '/api/getPurlUrl'
  const midParams = createSongMids(songs)
  const dataParams = Object.assign({}, commonParams, {
    g_tk: 5381,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  })
  return new Promise((resolve, reject) => {
    function reTry () {
      if (--tryCount > 0) {
        requestUrl()
      } else {
        reject(new Error('get song url fail'))
      }
    }

    function requestUrl () {
      return axios.post(url, {
        comm: dataParams,
        req_0: midParams
      }).then(res => {
        const { code, req_0 } = res as any
        if (code !== ERR_OK) {
          reTry()
          return
        }
        if (!req_0 || req_0.code !== ERR_OK) {
          reTry()
          return
        }
        if (code === ERR_OK && req_0 && req_0.code === ERR_OK) {
          const sougUrlMap: SongUrlMap = {}
          req_0.data.midurlinfo.forEach((item: any) => {
            if (item.purl) {
              sougUrlMap[item.songmid] = item.purl
            }
          })
          if (Object.keys(sougUrlMap).length <= 0) {
            reTry()
            return
          }
          resolve(sougUrlMap)
        }
      })
    }

    requestUrl()
  })
}

export function getLyric (mid: string): Promise<MusicResponse> {
  const url = '/api/lyric'
  const params = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })
  return axios.get(url, { params })
}
