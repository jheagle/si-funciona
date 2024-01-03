import reduceObject from './reduceObject'

describe('reduceObject', () => {
  const testFunction = (summation, value) => summation + value
  test('will use Array.reduce when input is array', () => {
    const testArray = [1, 2, 3, 4, 5]
    expect(reduceObject(testArray, testFunction, 0)).toEqual(testArray.reduce(testFunction))
  })

  test('applies function to create something new from the object', () => {
    const testObject = { first: 1, second: 2, third: 3, fourth: 4, fifth: 5 }
    expect(reduceObject(testObject, testFunction, 0)).toEqual(15)
  })
})
