import { shallowMount, Wrapper, config } from '@vue/test-utils'
import Scroll from '@/base/scroll/index.vue'
config.showDeprecationWarnings = false

describe('scroll.vue', () => {
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    wrapper = shallowMount(Scroll,{
      propsData: {
        beforeScroll: true,
        listenScroll: true,
        pullUp: true,
        data: [1, 2, 3]
      },
      slots: {
        default: `<div class="scroll-slot"></div>`
      }
    })
  })
  it('match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('render slot', () => {
    expect(wrapper.find('.scroll-slot').exists()).toBe(true)
  })
  it('no pass props.data', () => {
    wrapper = shallowMount(Scroll, {
      slots: {
        default: `<div></div>`
      }
    })
    expect(wrapper.props('data')).toEqual([])
  })
  it('change data and emit onDataChange function', async () => {
    const methods = {
      refresh: jest.fn()
    }
    wrapper = shallowMount(Scroll,{
      propsData: {
        data: [1, 2, 3]
      },
      slots: {
        default: `<div class="scroll-slot"></div>`
      },
      methods: methods
    })
    wrapper.setProps({
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    })
    await wrapper.vm.$nextTick()
    expect(methods.refresh).toHaveBeenCalled()
  })
})