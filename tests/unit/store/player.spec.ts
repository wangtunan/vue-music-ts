import store from '@/store/index'
import * as types from '@/store/mutation-type'
import { PlayMode } from '@/types/player'
describe('vuex module player', () => {
  const songs = [
    { id: '001', min: '001', singer: '周杰伦', name: '夜曲' },
    { id: '002', min: '002', singer: '周杰伦', name: '稻香' },
    { id: '003', min: '003', singer: '周杰伦', name: '菊花台' },
  ]
  const playerState = store.state.player
  beforeEach(() => {
    playerState.currentIndex = -1
    playerState.fullScreen = false
    playerState.mode = PlayMode.sequence
    playerState.playing = false
    playerState.playList = []
    playerState.sequenceList = []
    playerState.favoriteList = []
  })

  it('SET_CURRENT_INDEX mutation', () => {
    store.commit(`player/${types.SET_CURRENT_INDEX}`, 100)
    expect(playerState.currentIndex).toBe(100)
    store.commit(`player/${types.SET_CURRENT_INDEX}`, 0)
    expect(playerState.currentIndex).toBe(0)
  })
  it('SET_FULL_SCREEN mutation', () => {
    store.commit(`player/${types.SET_FULL_SCREEN}`, false)
    expect(playerState.fullScreen).toBe(false)
    store.commit(`player/${types.SET_FULL_SCREEN}`, true)
    expect(playerState.fullScreen).toBe(true)
  })
  it('SET_PLAY_MODE mutation', () => {
    store.commit(`player/${types.SET_PLAY_MODE}`, PlayMode.loop)
    expect(playerState.mode).toBe(PlayMode.loop)
    store.commit(`player/${types.SET_PLAY_MODE}`, PlayMode.random)
    expect(playerState.mode).toBe(PlayMode.random)
  })
  it('SET_PLAY_STATE mutation', () => {
    store.commit(`player/${types.SET_PLAY_STATE}`, true)
    expect(playerState.playing).toBe(true)
    store.commit(`player/${types.SET_PLAY_STATE}`, false)
    expect(playerState.playing).toBe(false)
  })
  it('selectPlay action', () => {
    store.dispatch(`player/selectPlay`, { list: songs, index: 2 })
    expect(playerState.playList).toEqual(songs)
    expect(playerState.sequenceList).toEqual(songs)
    expect(playerState.currentIndex).toBe(2)
    expect(playerState.fullScreen).toBe(true)
    expect(playerState.playing).toBe(true)
  })
  it('randomPlay action', () => {
    store.dispatch('player/randomPlay', songs)
    expect(playerState.mode).toBe(PlayMode.random)
    expect(playerState.playList.length).toBe(songs.length)
    expect(playerState.sequenceList).toEqual(songs)
    expect(playerState.fullScreen).toBe(true)
    expect(playerState.playing).toBe(true)
  })
  it('saveFavoriteList action', () => {
    store.dispatch('player/saveFavoriteList', songs[2])
    store.dispatch('player/saveFavoriteList', songs[0])
    store.dispatch('player/saveFavoriteList', songs[1])
    expect(playerState.favoriteList).toEqual([songs[1], songs[0], songs[2]])
  })
  it('deleteFavoriteList action', () => {
    store.dispatch('player/saveFavoriteList', songs[2])
    store.dispatch('player/saveFavoriteList', songs[0])
    store.dispatch('player/saveFavoriteList', songs[1])
    expect(playerState.favoriteList).toEqual([songs[1], songs[0], songs[2]])

    store.dispatch('player/deleteFavoriteList', songs[0])
    expect(playerState.favoriteList).toEqual([songs[1], songs[2]])
    store.dispatch('player/deleteFavoriteList', songs[2])
    expect(playerState.favoriteList).toEqual([songs[1]])
  })
  it('insertSong action', () => {
    store.dispatch('player/insertSong', songs[2])
    store.dispatch('player/insertSong', songs[1])
    store.dispatch('player/insertSong', songs[2])
    expect(playerState.playList).toEqual([songs[2], songs[1]])
    expect(playerState.sequenceList).toEqual([songs[2], songs[1]])
    expect(playerState.currentIndex).toBe(0)
    expect(playerState.playing).toBe(true)
    expect(playerState.fullScreen).toBe(true)
  })
  it('deleteSong action', () => {
    store.dispatch('player/insertSong', songs[2])
    store.dispatch('player/insertSong', songs[1])
    store.dispatch('player/insertSong', songs[0])
    store.commit(`player/${types.SET_CURRENT_INDEX}`, 2)
    expect(playerState.playList).toEqual(songs)
    expect(playerState.sequenceList).toEqual(songs)
    expect(playerState.currentIndex).toBe(2)
    expect(playerState.playing).toBe(true)
    expect(playerState.fullScreen).toBe(true)

    store.dispatch('player/deleteSong', songs[1])
    expect(playerState.playList).toEqual([songs[0], songs[2]])
    expect(playerState.sequenceList).toEqual([songs[0], songs[2]])
    expect(playerState.currentIndex).toBe(1)
    expect(playerState.playing).toBe(true)

    store.dispatch('player/deleteSong', songs[2])
    store.dispatch('player/deleteSong', songs[0])
    expect(playerState.playList.length).toBe(0)
    expect(playerState.sequenceList.length).toBe(0)
    expect(playerState.currentIndex).toBe(-1)
    expect(playerState.playing).toBe(false)
  })
  it('deleteSongList action', () => {
    store.dispatch('player/insertSong', songs[2])
    store.dispatch('player/insertSong', songs[1])
    store.dispatch('player/insertSong', songs[0])
    store.commit(`player/${types.SET_CURRENT_INDEX}`, 2)
    expect(playerState.playList).toEqual(songs)
    expect(playerState.sequenceList).toEqual(songs)
    expect(playerState.currentIndex).toBe(2)
    expect(playerState.playing).toBe(true)
    expect(playerState.fullScreen).toBe(true)

    store.dispatch('player/deleteSongList')
    expect(playerState.playList).toEqual([])
    expect(playerState.sequenceList).toEqual([])
    expect(playerState.currentIndex).toBe(-1)
    expect(playerState.playing).toBe(false)
    expect(playerState.fullScreen).toBe(false)
  })
})