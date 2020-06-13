import { shallowMount, Wrapper } from '@vue/test-utils'
import Slider from '@/components/slider/index.vue'

describe('slider.vue', () => {
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    wrapper = shallowMount(Slider)
  })
  it('test snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('default props', () => {
    expect(wrapper.props('loop')).toBe(true)
    expect(wrapper.props('autoPlay')).toBe(true)
    expect(wrapper.props('interval')).toBe(4000)
    expect(wrapper.props('showDots')).toBe(true)
  })
  it('pass props', () => {
    wrapper = shallowMount(Slider, {
      propsData: {
        loop: false,
        autoPlay: false,
        interval: 3000,
        showDots: false
      }
    })
    expect(wrapper.props('loop')).toBe(false)
    expect(wrapper.props('autoPlay')).toBe(false)
    expect(wrapper.props('interval')).toBe(3000)
    expect(wrapper.props('showDots')).toBe(false)
  })
  it('show dots', () => {
    expect(wrapper.find('.slider-dots').exists()).toBe(true)
  })
  it('not show dots', () => {
    wrapper = shallowMount(Slider, {
      propsData: {
        showDots: false
      }
    })
    expect(wrapper.find('.slider-dots').exists()).toBe(false)
  })
})