import mapObject from './mapObject'

describe('mapObject', () => {
  const mapNameToNumber = name => ({ zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5 })[name]
  test('Behaves exactly as Array.map when the input is an array', () => {
    const testArray = ['zero', 'one', 'two', 'three', 'four', 'five']
    expect(mapObject(testArray, mapNameToNumber)).toEqual(testArray.map(mapNameToNumber))
  })

  test('Will apply the callback to each of the object values', () => {
    const testObject = { zeroth: 'zero', first: 'one', second: 'two', third: 'three', fourth: 'four', fifth: 'five' }
    expect(mapObject(testObject, mapNameToNumber)).toEqual({
      zeroth: 0,
      first: 1,
      second: 2,
      third: 3,
      fourth: 4,
      fifth: 5
    })
  })

  test('Will use this argument for callback', () => {
    class NumberClass {
      constructor (add, subtract) {
        this.add = add
        this.subtract = subtract
      }

      applyToNumber (number) {
        return number + this.add - this.subtract
      }
    }

    const numberInstance = new NumberClass(5, 2)
    expect(mapObject(
      { first: 1, second: 2, third: 3, fourth: 4, fifth: 5 },
      numberInstance.applyToNumber,
      numberInstance
    )).toEqual({ first: 4, second: 5, third: 6, fourth: 7, fifth: 8 })
  })
})
