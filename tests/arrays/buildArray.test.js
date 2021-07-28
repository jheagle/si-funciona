import buildArray from '../../src/helpers/arrays/buildArray'

describe('buildArray', () => {
  test('generates an array filled with given item clones of the specified length', () => {
    const someItem = { name: 'something' }
    const result = buildArray(someItem, 4)
    expect(result[0]).not.toBe(someItem)
    someItem.name = 'different'
    result[1] = someItem
    expect(result[0]).toEqual({ name: 'something' })
    expect(result[1]).toEqual({ name: 'different' })
    expect(result[2]).toEqual({ name: 'something' })
    expect(result[3]).toEqual({ name: 'something' })
  })
})
