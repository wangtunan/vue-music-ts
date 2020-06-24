import { combineParams } from '@/utils/jsonp.ts'

describe('jsonp.ts', () => {
  const params = {
    a: 1,
    b: true,
    c: '2',
    d: undefined
  }
  it('test combineParams function', () => {
    expect(combineParams({})).toBe('')
    expect(typeof combineParams(params)).toBe('string')
    expect(combineParams(params)).toBe(`a=${params.a}&b=${params.b}&c=${params.c}`)
  })
})
