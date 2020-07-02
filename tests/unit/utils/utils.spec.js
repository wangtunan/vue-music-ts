import { getUid, combineParams } from '@/utils/utils.ts'

describe('utils.ts', () => {
  it('test getUid function', () => {
    expect(getUid(0)).toBe('')
    expect(getUid().length).toBe(10)
    expect(getUid(5).length).toBe(5)
  })
  it('test combineParams function', () => {
    const params = { a: 1, b: true, c: '2', d: undefined }
    expect(combineParams({})).toBe('')
    expect(combineParams(params)).toBe(`a=${params.a}&b=${params.b}&c=${params.c}`)
  })
})
