import { hasClass, addClass } from '@/utils/dom'

describe('dom.js', () => {
  let dom
  beforeEach(() => {
    dom = document.createElement('div')
    dom.classList.add('test-class')
  })
  it('test hasClass', () => {
    expect(hasClass(dom, 'test-class')).toBe(true)
    expect(hasClass(dom, 'test-no-class')).toBe(false)
  })
  it('test addClass', () => {
    const className = 'add-class'
    addClass(dom, className)
    expect(hasClass(dom, className)).toBe(true)
  })
})
