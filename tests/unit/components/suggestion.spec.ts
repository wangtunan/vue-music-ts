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
    // expect(wrapper.find('.suggestion-empty').exists()).toBe(false)
    expect(wrapper.find('ul').isVisible()).toBe(true)
    wrapper.setData({
      resultList: []
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.suggestion-empty').exists()).toBe(true)
    expect(wrapper.find('ul').isVisible()).toBe(false)
  })
  it('change keyword and emit onKeywordChange function', async () => {
    const methods = {
      getSuggestionList: jest.fn()
    }
    wrapper = mount(Suggestion, {
      methods: methods
    })
    // 搜索不为空时，触发事件
    wrapper.setProps({
      keyword: '张宇'
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.props('keyword')).toBe('张宇')
    expect(methods.getSuggestionList).toBeCalledTimes(1)
    // 搜索为空时，不触发事件
    wrapper.setProps({
      keyword: ''
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.props('keyword')).toBe('')
    expect(methods.getSuggestionList).toBeCalledTimes(1)
  })
  it('render resultList success', () => {
    const resultList = [1, 2, 3]
    wrapper = mount(Suggestion, {
      data () {
        return {
          resultList: resultList
        }
      }
    })
    expect(wrapper.findAll('.suggestion-item').length).toBe(resultList.length)
  })
})