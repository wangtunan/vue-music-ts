import { shallowMount, Wrapper } from '@vue/test-utils'
import Switches from '@/components/switches/index.vue'

describe('switches.vue', () => {
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    wrapper = shallowMount(Switches, {
      propsData: {
        active: 1,
        switches: ['我喜欢的', '最近听的']
      }
    })
  })
  it('match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('render switches array success', () => {
    const switchItems = wrapper.findAll('.switch-item')
    expect(switchItems.length).toBe(2)
    expect(switchItems.at(1).text()).toBe('最近听的')
  })
  it('bind active class', () => {
    const switchItems = wrapper.findAll('.switch-item')
    expect(switchItems.at(1).classes('active')).toBe(true)
  })
})