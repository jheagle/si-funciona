import emptyObject from '../../src/helpers/objects/emptyObject'

describe('emptyObject', () => {
  test('returns correct boolean for object and array check', () => {
    const testObjectEmpty = {}
    expect(emptyObject(testObjectEmpty)).toBe(true)
    const testObjectFull = { first: 1, second: 2, third: 3, fourth: 4, fifth: 5 }
    expect(emptyObject(testObjectFull)).toBe(false)
    const testArrayEmpty = []
    expect(emptyObject(testArrayEmpty)).toBe(true)
    const testArrayFull = ['first', 'second', 'third', 'fourth', 'fifth']
    expect(emptyObject(testArrayFull)).toBe(false)
  })

  test('returns false for null', () => {
    const testNull = null
    expect(emptyObject(testNull)).toBe(false)
  })
})
