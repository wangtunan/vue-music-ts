import storage from 'good-storage'

const HISTORY_KEY = 'music_history'
const HISTORY_LEN = 10

// 搜索历史
export function getHistoryList (): string[] {
  return storage.get(HISTORY_KEY, [])
}
export function saveHistory (): string[] {
  return []
}
export function deleteHistory (): string[] {
  return []
}
export function clearHistory (): [] {
  return []
}
