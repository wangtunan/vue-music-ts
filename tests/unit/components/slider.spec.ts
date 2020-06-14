import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils'
import Slider from '@/components/slider/index.vue'

describe('slider.vue', () => {
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    wrapper = shallowMount(Slider)
  })
  afterAll(() => {
    wrapper.destroy()
  })
  it('match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('default props', () => {
    expect(wrapper.props('loop')).toBe(true)
    expect(wrapper.props('autoPlay')).toBe(true)
    expect(wrapper.props('interval')).toBe(4000)
    expect(wrapper.props('showDots')).toBe(true)
  })
  it('show dots', () => {
    expect(wrapper.find('.slider-dots').exists()).toBe(true)
    wrapper = shallowMount(Slider, {
      propsData: {
        showDots: false
      }
    })
    expect(wrapper.find('.slider-dots').exists()).toBe(false)
  })
  it('render slots', async () => {
    wrapper = shallowMount(Slider, {
      propsData: {
        loop: false
      },
      slots: {
        default: `
          <div>1</div>
          <div>2</div>
          <div>3</div>
        `
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.slider-group > div').length).toBe(3)
    wrapper.setProps({
      loop: true
    })
  })
})
