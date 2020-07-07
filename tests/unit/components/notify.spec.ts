import { shallowMount, Wrapper} from '@vue/test-utils'
import Notify from '@/base/notify/index.vue'

describe('notify.vue', () => {
  let wrapper: Wrapper<Vue>
  const message = '已添加到播放列表'
  beforeEach(() => {
    wrapper = shallowMount(Notify, {
      propsData: {
        visible: true,
        message: message
      }
    })
  })

  it('match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('render when visible is true', async () => {
    expect(wrapper.find('.m-notify').exists()).toBe(true)
    wrapper.setProps({
      visible: false
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('m-notify').exists()).toBe(false)
  })
  it('render message when pass message', async () => {
    expect(wrapper.find('.notify-message').text()).toContain(message)
    wrapper.setProps({
      message: ''
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.notify-message').findAll('span').length).toBe(1)
  })
  it('emit visible change', async () => {
    jest.useFakeTimers()
    wrapper = shallowMount(Notify, {
      propsData: {
        visible: false
      }
    })
    expect(wrapper.props('visible')).toBe(false)
    wrapper.setProps({
      visible: true
    })
    await wrapper.vm.$nextTick()
    jest.advanceTimersByTime(3100)
    expect(wrapper.props('visible')).toBe(true)
  })
  it('render icon success', async() => {
    const icon = 'icon-warning'
    wrapper.setProps({
      icon: icon
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.notify-icon').classes().includes(icon)).toBe(true)
  })
  it('destory component and clearTimeout', () => {
    wrapper.vm.$destroy()
    expect(wrapper.exists()).toBe(false)
  })
})