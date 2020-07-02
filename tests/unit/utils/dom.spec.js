import { hasClass, addClass, getDomData, getVendorsPrefix, vendor } from '@/utils/dom'

describe('dom.ts', () => {
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
  it('test dom data', () => {
    const dom = document.createElement('div')
    const indexVal = '100'
    dom.setAttribute('data-index', indexVal)
    expect(getDomData(dom, 'index')).toBe(indexVal)
    expect(getDomData(dom, 'index123')).toBeNull()
  })
  it('test vendor name', () => {
    const vendors = ['webkit', 'Moz', 'O', 'ms', 'standard']
    expect(vendors.includes(vendor)).toBe(true)
  })
  it('test vender prefix', () => {
    const transform = getVendorsPrefix('transform')
    const transformMap = ['webkitTransform', 'MozTransform', 'OTransform', 'msTransform', 'transform']
    expect(transformMap.includes(transform)).toBe(true)
  })
  it('test standard prefix', () => {
    const transform = getVendorsPrefix('transform', 'standard')
    expect(transform).toBe('transform')
  })
})
