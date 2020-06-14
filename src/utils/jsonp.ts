import originJsonp from 'jsonp'
import { MusicParams, Jsonpoptions } from '@/types/index'

export function combineParams (data: MusicParams): string {
  let url = ''
  for (const key in data) {
    const value = data[key] !== undefined ? data[key] : ''
    url += `&${key}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}

export default function jsonp (url: string, data: MusicParams, options: Jsonpoptions): Promise<any> {
  url += (url.indexOf('?') < 0 ? '?' : '&') + combineParams(data)
  return new Promise((resolve, reject) => {
    originJsonp(url, options, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
