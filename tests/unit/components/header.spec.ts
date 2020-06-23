import { shallowMount, Wrapper } from '@vue/test-utils'
import MHeader from '@/components/header/index.vue'

describe('header.vue', () => {
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    wrapper = shallowMount(MHeader, {
      stubs: ['router-link']
    })
  })
  it('match shapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('mounted success', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
