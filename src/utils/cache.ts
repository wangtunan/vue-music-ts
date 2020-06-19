import storage from 'good-storage'

const HISTORY_KEY = 'music_history'
const HISTORY_LEN = 10

export function insertArray (array: any[], value: any, compare: (item: any) => boolean, max: number): void {
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

export function deleteArray (array: any[], compare: (item: any) => boolean): void {
  const findIndex = array.findIndex(compare)
  if (findIndex > -1) {
    array.splice(findIndex, 1)
  }
}

// 搜索历史
export function getHistoryList (): string[] {
  return storage.get(HISTORY_KEY, [])
}
export function saveHistory (val: string): string[] {
  const historyArr: string[] = storage.get(HISTORY_KEY, [])
  insertArray(historyArr, val, (item: any) => {
    return item === val
  }, HISTORY_LEN)
  storage.set(HISTORY_KEY, historyArr)
  return historyArr
}
export function deleteHistory (value: string): string[] {
  const historyArr: string[] = storage.get(HISTORY_KEY, [])
  deleteArray(historyArr, (item: string) => {
    return item === value
  })
  storage.set(HISTORY_KEY, historyArr)
  return historyArr
}
export function clearHistory (): [] {
  storage.remove(HISTORY_KEY)
  return []
}
