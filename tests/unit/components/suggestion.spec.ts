import { mount, Wrapper, config } from '@vue/test-utils'
config.showDeprecationWarnings = false
import Suggestion from '@/components/suggestion/index.vue'

describe('suggestion.vue', () => {
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    wrapper = mount(Suggestion)
  })
  it('match snaphots', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('render empty when resultList is empty', async () => {
    expect(wrapper.find('.suggestion-empty').exists()).toBe(true)
    wrapper.setData({
      resultList: [1, 2, 3]
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.suggestion-empty').exists()).toBe(false)
  })
  it('change keyword and emit onKeywordChange function', async () => {
    const methods = {
      getSuggestionList: jest.fn()
    }
    wrapper = mount(Suggestion, {
      methods: methods
    })
    expect(wrapper.props('keyword')).toBe('')
    wrapper.setProps({
      keyword: '张宇'
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.props('keyword')).toBe('张宇')
    expect(methods.getSuggestionList).toHaveBeenCalled()
  })
})