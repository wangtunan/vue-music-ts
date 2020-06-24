import { shallowMount, Wrapper } from '@vue/test-utils'
import Empty from '@/components/empty/index.vue'

describe('empty.vue', () => {
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    wrapper = shallowMount(Empty)
  })
  it('match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('default props.title', () => {
    expect(wrapper.props('title')).toBe('抱歉，暂无数据')
  })
  it('pass props.title', () => {
    const title = '暂时没有相关数据'
    wrapper = shallowMount(Empty, {
      propsData: {
        title
      }
    })
    expect(wrapper.find('.title').text()).toBe(title)
  })
})