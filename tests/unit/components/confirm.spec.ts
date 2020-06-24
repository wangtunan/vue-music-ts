import { shallowMount, Wrapper } from '@vue/test-utils'
import Confirm from '@/components/confirm/index.vue'

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
})