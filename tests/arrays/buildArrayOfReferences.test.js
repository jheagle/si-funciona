import buildArrayOfReferences from '../../src/helpers/arrays/buildArrayOfReferences'

describe('buildArrayOfReferences', () => {
  test('generates an array filled with reference to items of the specified length', () => {
    const someItem = { name: 'something' }
    const result = buildArrayOfReferences(someItem, 4)
    expect(result[0]).toBe(someItem)
    expect(result[1]).toBe(someItem)
    expect(result[2]).toBe(someItem)
    expect(result[3]).toBe(someItem)
    someItem.name = 'different'
    expect(result[0]).toEqual({ name: 'different' })
    expect(result[1]).toEqual({ name: 'different' })
    expect(result[2]).toEqual({ name: 'different' })
    expect(result[3]).toEqual({ name: 'different' })
  })
})
