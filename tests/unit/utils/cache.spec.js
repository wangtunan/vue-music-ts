import {
  insertArray,
  deleteArray,
  getSearchHistory,
  saveSearchHistory,
  clearSearchHistory,
  deleteSearchHistory,
  saveFavoriteList,
  getFavoriteList,
  deleteFavoriteList,
  clearFavoriteList,
  getPlayHistory,
  savePlayHistory,
  clearPlayHistoy
} from '@/utils/cache'

describe('cache.ts', () => {
  const max = 5
  beforeEach(() => {
    clearSearchHistory()
    clearFavoriteList()
    clearPlayHistoy()
  })
  it('test insertArray function', () => {
    const array = []
    insertArray(array, 'AAA', (item) => item === 'AAA', max)
    insertArray(array, 'AAA', (item) => item === 'AAA', max)
    expect(array).toEqual(['AAA'])
    insertArray(array, 'BBB', (item) => item === 'BBB', max)
    expect(array).toEqual(['BBB', 'AAA'])
    insertArray(array, 'AAA', (item) => item === 'AAA', max)
    expect(array).toEqual(['AAA', 'BBB'])
    insertArray(array, 'CCC', (item) => item === 'CCC', max)
    insertArray(array, 'DDD', (item) => item === 'DDD', max)
    insertArray(array, 'EEE', (item) => item === 'EEE', max)
    insertArray(array, 'FFF', (item) => item === 'FFF', max)
    expect(array).toEqual(['FFF', 'EEE', 'DDD', 'CCC', 'AAA'])
  })
  it('test deleteArray function', () => {
    const array = ['AAA']
    deleteArray(array, (item) => item === 'BBB')
    expect(array).toEqual(['AAA'])
    deleteArray(array, (item) => item === 'AAA')
    expect(array.length).toBe(0)
  })
  it('test getSearchHistory function', () => {
    expect(getSearchHistory()).toEqual([])
  })
  it('test saveSearchHistory function', () => {
    expect(saveSearchHistory('AAA')).toEqual(['AAA'])
    expect(saveSearchHistory('BBB')).toEqual(['BBB', 'AAA'])
    expect(getSearchHistory()).toEqual(['BBB', 'AAA'])
  })
  it('test deleteSearchHistory function', () => {
    saveSearchHistory('AAA')
    saveSearchHistory('BBB')
    saveSearchHistory('CCC')
    expect(getSearchHistory()).toEqual(['CCC', 'BBB', 'AAA'])
    expect(deleteSearchHistory('AAA')).toEqual(['CCC', 'BBB'])
  })
  it('test saveFavoriteList function', () => {
    const songA = { id: 'AAA', name: 'songA' }
    const songB = { id: 'BBB', name: 'songB' }
    expect(getFavoriteList()).toEqual([])
    expect(saveFavoriteList(songA)).toEqual([songA])
    expect(saveFavoriteList(songB)).toEqual([songB, songA])
  })
  it('test deleteFavoriteList function', () => {
    const songA = { id: 'AAA', name: 'songA' }
    const songB = { id: 'BBB', name: 'songB' }
    expect(getFavoriteList()).toEqual([])
    expect(saveFavoriteList(songA)).toEqual([songA])
    expect(saveFavoriteList(songB)).toEqual([songB, songA])
    expect(deleteFavoriteList(songA)).toEqual([songB])
  })
  it('test savePlayHistory function', () => {
    const songA = { id: 'AAA', name: 'songA' }
    const songB = { id: 'BBB', name: 'songB' }
    expect(getPlayHistory()).toEqual([])
    expect(savePlayHistory(songB)).toEqual([songB])
    expect(savePlayHistory(songA)).toEqual([songA, songB])
  })
})
