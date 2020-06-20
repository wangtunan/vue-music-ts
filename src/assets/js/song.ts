import { SongData } from '@/types/search'
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

export default class Song {
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
  constructor ({ id, mid, singer, name, album, duration, image, filename, url, type }: Song) {
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
    type: 'song'
  })
}

export function isValid (songData: SongData): boolean {
  return !!(songData.songid && songData.albummid && (!songData.pay || songData.pay.payalbumprice === 0))
}
