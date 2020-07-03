import { shallowMount, Wrapper } from '@vue/test-utils'
import Loading from '@/base/loading/index.vue'

describe('loading.vue', () => {
  let wrapper: Wrapper<Vue>
  const title = '正在加载中...'
  beforeEach(() => {
    wrapper = shallowMount(Loading, {
      propsData: {
        title: title
      }
    })
  })

  it('test snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('test props.title', () => {
    expect(wrapper.text()).toContain(title)
  })
})