import storage from 'good-storage'
import Song from '@/assets/js/song'
const SEARCH_KEY = 'music_search'
const SEARCH_LEN = 10
const FAVORITE_KEY = 'music_favorite'
const FAVORIYE_LEN = 200
const PLAY_KEY = 'music_play'
const PLAY_LEN = 500

export function insertArray (array: any[], value: any, compare: (item: any) => boolean, max: number) {
  const findIndex = array.findIndex(compare)
  if (findIndex === 0) {
    return
  }
  if (findIndex > 0) {
    array.splice(findIndex, 1)
  }
  array.unshift(value)
  if (max && array.length > max) {
    array.pop()
  }
}

export function deleteArray (array: any[], compare: (item: any) => boolean) {
  const findIndex = array.findIndex(compare)
  if (findIndex > -1) {
    array.splice(findIndex, 1)
  }
}

// 搜索历史
export function getSearchHistory (): string[] {
  return storage.get(SEARCH_KEY, [])
}
export function saveSearchHistory (val: string): string[] {
  const historyArr: string[] = storage.get(SEARCH_KEY, [])
  insertArray(historyArr, val, (item: string) => {
    return item === val
  }, SEARCH_LEN)
  storage.set(SEARCH_KEY, historyArr)
  return historyArr
}
export function deleteSearchHistory (val: string): string[] {
  const historyArr: string[] = storage.get(SEARCH_KEY, [])
  deleteArray(historyArr, (item: string) => {
    return item === val
  })
  storage.set(SEARCH_KEY, historyArr)
  return historyArr
}
export function clearSearchHistory (): [] {
  storage.remove(SEARCH_KEY)
  return []
}

// 收藏歌曲
export function getFavoriteList (): Song[] {
  const favoriteList: Song[] = storage.get(FAVORITE_KEY, [])
  return favoriteList
}
export function saveFavoriteList (song: Song): Song[] {
  const favoriteList: Song[] = storage.get(FAVORITE_KEY, [])
  insertArray(favoriteList, song, (item: Song) => {
    return item.id === song.id
  }, FAVORIYE_LEN)
  storage.set(FAVORITE_KEY, favoriteList)
  return favoriteList
}
export function deleteFavoriteList (song: Song): Song[] {
  const favoriteList: Song[] = storage.get(FAVORITE_KEY, [])
  deleteArray(favoriteList, (item: Song) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, favoriteList)
  return favoriteList
}

// 播放历史
export function getPlayHistory (): Song[] {
  return storage.get(PLAY_KEY, [])
}
export function savePlayHistory (song: Song): Song[] {
  const playHistoryList = storage.get(PLAY_KEY, [])
  insertArray(playHistoryList, song, (item: Song) => {
    return item.id === song.id
  }, PLAY_LEN)
  storage.set(PLAY_KEY, playHistoryList)
  return playHistoryList
}
