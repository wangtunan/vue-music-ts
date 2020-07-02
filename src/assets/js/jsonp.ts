import originJsonp from 'jsonp'
import { Jsonpoptions } from '@/types/index'
import { combineParams } from '@/utils/utils'

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
