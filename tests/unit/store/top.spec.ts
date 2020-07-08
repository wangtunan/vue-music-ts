import store from '@/store/index'
import * as types from '@/store/mutation-type'

describe('vuex module top', () => {
  it('SET_TOP_LIST mutation', () => {
    const songList = [
      { songname: '夜曲', singername: '周杰伦'  }
    ]
    const topList = [
      { id: '001', picUrl: '1.jpg', topTitle: '标题一', songList: songList }
    ]
    store.commit(`top/${types.SET_TOP_LIST}`, topList)
    expect(store.state.top.topList).toEqual(topList)
  })
})