export interface Banner {
  id: string
  linkUrl: string
  picUrl: string
}

export interface DiscCreator {
  name: string,
  avatarUrl?: string
}

export interface Disc {
  dissid: string | number
  dissname: string
  imgurl: string
  creator: DiscCreator
}