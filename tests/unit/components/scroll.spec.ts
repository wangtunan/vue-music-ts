import { shallowMount, Wrapper } from '@vue/test-utils'
import Scroll from '@/components/scroll/index.vue'

describe('scroll.vue', () => {
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    wrapper = shallowMount(Scroll,{
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
})