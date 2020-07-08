import store from '@/store/index'
describe('vuex modules history', () => {
  beforeEach(() => {
    store.dispatch(`history/clearSearchHistory`)
  })
  it('saveSearchHistory action', () => {
    store.dispatch(`history/saveSearchHistory`, '周杰伦')
    store.dispatch(`history/saveSearchHistory`, '林俊杰')
    expect(store.state.history.searchHistory).toEqual(['林俊杰', '周杰伦'])
  })
  it('deleteSearchHistory action', () => {
    store.dispatch(`history/saveSearchHistory`, '周杰伦')
    store.dispatch(`history/saveSearchHistory`, '林俊杰')
    store.dispatch(`history/saveSearchHistory`, '张宇')
    expect(store.state.history.searchHistory).toEqual(['张宇', '林俊杰', '周杰伦'])

    store.dispatch(`history/deleteSearchHistory`, '林俊杰')
    expect(store.state.history.searchHistory).toEqual(['张宇', '周杰伦'])

    store.dispatch(`history/deleteSearchHistory`, '周杰伦')
    expect(store.state.history.searchHistory).toEqual(['张宇'])

    store.dispatch(`history/deleteSearchHistory`, '张宇')
    expect(store.state.history.searchHistory.length).toBe(0)
  })

  it('savePlayHistory action', () => {
    const songs = [
      { id: '001', mid: '001', singer: '周杰伦' },
      { id: '002', mid: '002', singer: '林俊杰' }
    ]
    expect(store.state.history.playHistory.length).toBe(0)
    store.dispatch('history/savePlayHistory', songs[0])
    store.dispatch('history/savePlayHistory', songs[1])
    expect(store.state.history.playHistory.length).toBe(2)
    expect(store.state.history.playHistory).toEqual([songs[1], songs[0]])
  })
})