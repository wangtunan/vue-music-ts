import store from '@/store/index'
import * as types from '@/store/mutation-type'

describe('vuex module singer', () => {
  it('SET_SINGER mutations', () => {
    const singer = {
      id: '001',
      name: '陈奕迅',
      avatar: 'https://www.baidu.com/avatar/1.jpg'
    }
    store.commit(`singer/${types.SET_SINGER}`, singer)
    expect(store.state.singer.singer).toEqual(singer)
  })
})
