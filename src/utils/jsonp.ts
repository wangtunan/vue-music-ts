import originJsonp from 'jsonp'
import { Jsonpoptions } from '@/types/index'

export function combineParams (data: any): string {
  let url = ''
  for (const key in data) {
    if (data[key] !== undefined) {
      url += `&${key}=${encodeURIComponent(data[key])}`
    }
  }
  return url ? url.substring(1) : ''
}

export default function jsonp (url: string, data: any, options: Jsonpoptions): Promise<any> {
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
