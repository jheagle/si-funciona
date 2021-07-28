import objectKeys from '../../src/helpers/objects/objectKeys'

describe('objectKeys', () => {
  test('can get all keys from an object', () => {
    const someObject = { one: 'first', two: 'second' }
    expect(objectKeys(someObject)).toEqual(['one', 'two'])
  })

  test('can will skip inherited keys when flag not set', () => {
    const someObject = { one: 'first', two: 'second' }
    const newObject = Object.create(someObject)
    expect(objectKeys(newObject).length).toBe(0)
  })

  test('can will include inherited keys when flag is set', () => {
    const someObject = { one: 'first', two: 'second' }
    const newObject = Object.create(someObject)
    expect(objectKeys(newObject, true)).toEqual(['one', 'two'])
  })

  test('will get numeric keys from array', () => {
    const someArray = ['first', 'second']
    expect(objectKeys(someArray)).toEqual([0, 1])
  })

  test('will also get length property when inherited flag is set', () => {
    const someArray = ['first', 'second']
    expect(objectKeys(someArray, true)).toEqual(['0', '1', 'length'])
  })
})
