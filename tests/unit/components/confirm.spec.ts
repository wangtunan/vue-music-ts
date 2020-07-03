import { shallowMount, Wrapper } from '@vue/test-utils'
import Confirm from '@/base/confirm/index.vue'

describe('confirm.vue', () => {
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    wrapper = shallowMount(Confirm)
  })

  it('match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('default props', () => {
    expect(wrapper.props('visible')).toBe(false)
    expect(wrapper.props('message')).toBe('')
    expect(wrapper.props('cancelButtonText')).toBe('取消')
    expect(wrapper.props('confirmButtonText')).toBe('确定')
    expect(wrapper.props('showCancelButton')).toBe(true)
    expect(wrapper.props('showConfirmButton')).toBe(true)
  })
  it('customer props', () => {
    const message = '是否清空播放列表？'
    wrapper = shallowMount(Confirm, {
      propsData: {
        message: message,
        confirmButtonText: '清空',
        showCancelButton: false
      }
    })
    expect(wrapper.find('.text').text()).toBe(message)
    expect(wrapper.find('.confirm').text()).toBe('清空')
    expect(wrapper.find('.cancel').exists()).toBe(false)
  })
  it('cancel click', async () => {
    const cancelBtn = wrapper.find('.cancel')
    cancelBtn.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.props('visible')).toBe(false)
  })
  it('confirm click', async () => {
    const confirmButton = wrapper.find('.confirm')
    confirmButton.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.props('visible')).toBe(false)
    wrapper.vm.$emit('confirm')
    expect(wrapper.emitted().confirm).toBeTruthy()
  })
})