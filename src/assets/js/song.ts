import { SongData } from '@/types/search'
import { getSongUrl, getLyric } from '@/api/song'
import { SongUrlMap } from '@/types/song'
import { ERR_OK } from '@/api/config'
import { Base64 } from 'js-base64'
function filterSinger (singer: [] | any): string {
  const result: string[] = []
  if (!singer) {
    return ''
  }
  if (Array.isArray(singer)) {
    singer.forEach(item => {
      result.push(item.name)
    })
  }
  return result.join('/')
}

interface ISong {
  id: string;
  mid: string;
  singer: string;
  name: string;
  album: string;
  duration: number;
  image: string;
  filename: string;
  url: string;
  type: string;
  lyric: string;
}
export default class Song implements ISong {
  public id: string;
  public mid: string;
  public singer: string;
  public name: string;
  public album: string;
  public duration: number;
  public image: string;
  public filename: string;
  public url: string;
  public type: string;
  public lyric: string;
  constructor ({ id, mid, singer, name, album, duration, image, filename, url, type, lyric }: ISong) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.filename = filename
    this.url = url
    this.type = type
    this.lyric = lyric
  }

  public getLyric (): Promise<string> {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then(res => {
        const { code, data } = res
        if (code === ERR_OK) {
          this.lyric = Base64.decode(data)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}

export function createSong (songData: SongData): Song {
  return new Song({
    id: songData.songid,
    mid: songData.songmid,
    singer: filterSinger(songData.singer),
    name: songData.songname,
    album: songData.albumname,
    duration: songData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${songData.albummid}.jpg?max_age=2592000`,
    filename: `C400${songData.songmid}.m4a`,
    url: songData.url,
    type: 'song',
    lyric: ''
  })
}

export function isValid (songData: SongData): boolean {
  return !!(songData.songid && songData.albummid && (!songData.pay || songData.pay.payalbumprice === 0))
}

export function processSongUrl (songs: Song[]): Promise<Song[]> {
  return getSongUrl(songs).then((res: SongUrlMap) => {
    songs = songs.filter(song => {
      const songUrl = res[song.mid]
      if (songUrl) {
        song.url = songUrl.indexOf('http') === -1 ? `http://dl.stream.qqmusic.qq.com/${songUrl}` : songUrl
        return true
      }
      return false
    })
    return songs
  })
}
