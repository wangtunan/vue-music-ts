import { shallowMount, Wrapper } from '@vue/test-utils'
import Switches from '@/base/switches/index.vue'

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
  it('no pass props.switches', () => {
    wrapper = shallowMount(Switches)
    expect(wrapper.props('switches').length).toBe(0)
  })
  it('change active after item click', async () => {
    wrapper = shallowMount(Switches, {
      propsData: {
        switches: ['我喜欢的', '最近听的']
      }
    })
    const switchItems = wrapper.findAll('.switch-item')
    switchItems.at(1).trigger('click')
    wrapper.setProps({
      active: 1
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.props('active')).toBe(1)
  })
})