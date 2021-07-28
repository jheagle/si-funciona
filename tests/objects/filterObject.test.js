import filterObject from '../../src/helpers/objects/filterObject'

describe('filterObject', () => {
  const testFunction = value => (value % 2) === 0
  test('will use Array.filter when input is array', () => {
    const testArray = [1, 2, 3, 4, 5]
    expect(filterObject(testArray, testFunction))
      .toEqual(testArray.filter(testFunction))
  })

  test('applies function to exclude some values', () => {
    const testObject = { first: 1, second: 2, third: 3, fourth: 4, fifth: 5 }
    expect(filterObject(testObject, testFunction))
      .toEqual({ second: 2, fourth: 4 })
  })
})
