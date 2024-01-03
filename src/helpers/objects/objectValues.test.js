import objectValues from './objectValues'

describe('objectValues', () => {
  test('can get all values from an object', () => {
    const someObject = { one: 'first', two: 'second' }
    expect(objectValues(someObject)).toEqual(['first', 'second'])
  })

  test('can will skip inherited values when flag not set', () => {
    const someObject = { one: 'first', two: 'second' }
    const newObject = Object.create(someObject)
    expect(objectValues(newObject).length).toBe(0)
  })

  test('can will include inherited values when flag is set', () => {
    const someObject = { one: 'first', two: 'second' }
    const newObject = Object.create(someObject)
    expect(objectValues(newObject, true)).toEqual(['first', 'second'])
  })

  test('will get values from array', () => {
    const someArray = ['first', 'second']
    expect(objectValues(someArray)).toEqual(['first', 'second'])
  })

  test('will also retrieve the length value from the array when inherited flag is set', () => {
    const someArray = ['first', 'second']
    expect(objectValues(someArray, true)).toEqual(['first', 'second', 2])
  })
})
