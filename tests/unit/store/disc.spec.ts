import store from '@/store/index'
import * as types from '@/store/mutation-type'

describe('vuex modules disc', () => {
  it('SET_DISC mutation', () => {
    const disc = {
      dissid: '001',
      dissname: '夜曲',
      imgurl: 'https://www.baidu.com/imgurl/1.jpg',
      creator: {
        name: '周杰伦',
        avatarUrl: 'https://www.baidu.com/avatar/1.jpg'
      }
    }
    store.commit(`disc/${types.SET_DISC}`, disc)
    expect(store.state.disc.disc).toEqual(disc)
  })
})