export interface BannerConfig {
  id: string
  linkUrl: string
  picUrl: string
}

export interface DiscCreator {
  name: string,
  avatarUrl?: string
}

export interface DiscConfig {
  dissid: string | number
  dissname: string
  imgurl: string
  creator: DiscCreator
}