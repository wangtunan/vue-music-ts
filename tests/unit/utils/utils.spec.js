import {
  getUid,
  pxToVw,
  getRandomNumber,
  fillString,
  formatSecond,
  combineParams,
  shuffle
} from '@/utils/utils.ts'

describe('utils.ts', () => {
  it('test getUid function', () => {
    expect(getUid(0)).toBe('')
    expect(getUid().length).toBe(10)
    expect(getUid(5).length).toBe(5)
  })
  it('test pxToVw function', () => {
    expect(pxToVw(0)).toBe(0)
    expect(pxToVw(375)).toBe(100)
    expect(pxToVw(10)).toBeCloseTo(2.667)
    expect(pxToVw(100, 414, 0)).toBe(24)
    expect(pxToVw(50, 414, 3)).toBeCloseTo(12.077)
  })
  it('test getRandomNumber function', () => {
    let random = getRandomNumber(1, 3)
    expect(random).toBeGreaterThanOrEqual(1)
    expect(random).toBeLessThanOrEqual(3)
    random = getRandomNumber(5, 2)
    expect(random).toBeGreaterThanOrEqual(2)
    expect(random).toBeLessThanOrEqual(5)
  })
  it('test fillString function', () => {
    expect(fillString(0)).toBe('00')
    expect(fillString(0, '*')).toBe('*0')
    expect(fillString('12', 0, 5)).toBe('00012')
  })
  it('test formatSecond function', () => {
    expect(formatSecond(0)).toBe('00:00')
    expect(formatSecond(23)).toBe('00:23')
    expect(formatSecond(61)).toBe('01:01')
    expect(formatSecond(3700)).toBe('61:40')
  })
  it('test combineParams function', () => {
    const params = { a: 1, b: true, c: '2', d: undefined }
    expect(combineParams({})).toBe('')
    expect(combineParams(params)).toBe(`a=${params.a}&b=${params.b}&c=${params.c}`)
  })
  it('test shuffle function', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(shuffle([])).toEqual([])
    expect(shuffle([1])).toEqual([1])
    expect(shuffle(arr)).not.toEqual(arr)
  })
})
