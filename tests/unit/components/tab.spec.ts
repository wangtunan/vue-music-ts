import { shallowMount, Wrapper } from '@vue/test-utils'
import { tabList } from '@/assets/js/data'
import Tab from '@/components/tab/index.vue'

describe('tab.vue', () => {
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    wrapper = shallowMount(Tab, {
      propsData: {
        list: tabList
      },
      stubs: ['router-link']
    })
  })
  it('match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('props.list must passed', () => {
    expect(wrapper.props('list').length).toBe(tabList.length)
  })
  it('render success tabList data', () => {
    const tabItems = wrapper.findAll('.tab-item')
    expect(tabItems.length).toBe(tabList.length)
  })
  it('change index after click', () => {
    wrapper.findAll('.tab-item').at(1).trigger('click')
    expect(wrapper.vm.$data.activeIndex).toBe(1)
  })
})
