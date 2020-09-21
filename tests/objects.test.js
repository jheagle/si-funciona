import * as helpers from '../dist/helpers/objects'
import { deepReferenceObject, domItem, jsonDom, linkedList, multiReferenceObject, nodeTree } from './testHelpers'

test('setValue will update an item and return the item', () => {
  const someObject = {
    firstProp: null,
    secondProp: 'something here'
  }
  const updateObject1 = helpers.setValue('firstProp', { newValue: 'some value' }, someObject)
  const updateObject2 = helpers.setValue('secondProp', 'a new thing here', updateObject1)
  expect(updateObject2).toEqual({ firstProp: { newValue: 'some value' }, secondProp: 'a new thing here' })
})

test('setAndReturnValue will update an item and return the value', () => {
  const someObject = {
    firstProp: null,
    secondProp: 'something here'
  }
  const firstValue = helpers.setAndReturnValue(someObject, 'firstProp', { newValue: 'some value' })
  expect(firstValue).toEqual({ newValue: 'some value' })
  const secondValue = helpers.setAndReturnValue(someObject, 'secondProp', 'a new thing here')
  expect(secondValue).toEqual('a new thing here')
})

describe('objectKeys', () => {
  test('can get all keys from an object', () => {
    const someObject = { one: 'first', two: 'second' }
    expect(helpers.objectKeys(someObject)).toEqual(['one', 'two'])
  })

  test('can will skip inherited keys when flag not set', () => {
    const someObject = { one: 'first', two: 'second' }
    const newObject = Object.create(someObject)
    expect(helpers.objectKeys(newObject).length).toBe(0)
  })

  test('can will include inherited keys when flag is set', () => {
    const someObject = { one: 'first', two: 'second' }
    const newObject = Object.create(someObject)
    expect(helpers.objectKeys(newObject, true)).toEqual(['one', 'two'])
  })

  test('will get numeric string keys from array', () => {
    const someArray = ['first', 'second']
    expect(helpers.objectKeys(someArray)).toEqual(['0', '1'])
  })

  test('will also get length property when inherited flag is set', () => {
    const someArray = ['first', 'second']
    expect(helpers.objectKeys(someArray, true)).toEqual(['0', '1', 'length'])
  })
})

describe('objectValues', () => {
  test('can get all values from an object', () => {
    const someObject = { one: 'first', two: 'second' }
    expect(helpers.objectValues(someObject)).toEqual(['first', 'second'])
  })

  test('can will skip inherited values when flag not set', () => {
    const someObject = { one: 'first', two: 'second' }
    const newObject = Object.create(someObject)
    expect(helpers.objectValues(newObject).length).toBe(0)
  })

  test('can will include inherited values when flag is set', () => {
    const someObject = { one: 'first', two: 'second' }
    const newObject = Object.create(someObject)
    expect(helpers.objectValues(newObject, true)).toEqual(['first', 'second'])
  })

  test('will get values from array', () => {
    const someArray = ['first', 'second']
    expect(helpers.objectValues(someArray)).toEqual(['first', 'second'])
  })

  test('will also retrieve the length value from the array when inherited flag is set', () => {
    const someArray = ['first', 'second']
    expect(helpers.objectValues(someArray, true)).toEqual(['first', 'second', 2])
  })
})

describe('isInstanceObject', () => {
  test('standard object has no inherited properties', () => {
    const someObject = { one: 'first', two: 'second' }
    expect(helpers.isInstanceObject(someObject)).toBe(false)
  })

  test('created object from another object will have inherited properties', () => {
    const someObject = { one: 'first', two: 'second' }
    const newObject = Object.create(someObject)
    expect(helpers.isInstanceObject(newObject)).toBe(true)
  })

  test('declared class is an instance object', () => {
    class SampleClass {
      construct () {
        this.one = 'first'
        this.two = 'second'
      }
    }
    expect(helpers.isInstanceObject(SampleClass)).toBe(true)
  })

  test('instatiated object is an instance object', () => {
    class SampleClass {
      construct () {
        this.one = 'first'
        this.two = 'second'
      }
    }
    const newObject = new SampleClass()
    expect(helpers.isInstanceObject(newObject)).toBe(true)
  })

  test('arrays are not instance objects', () => {
    const someArray = ['first', 'second']
    expect(helpers.isInstanceObject(someArray)).toBe(false)
  })
})

test('mapObject applies function to update each value of the object', () => {
  const testObject = { first: 1, second: 2, third: 3, fourth: 4, fifth: 5 }
  const testFunction = value => value + 3
  expect(helpers.mapObject(testObject, testFunction))
    .toEqual({ first: 4, second: 5, third: 6, fourth: 7, fifth: 8 })
})

test('mapProperty returns the original object with mapped property', () => {
  const testObject = { nestedObject: { first: 1, second: 2, third: 3, fourth: 4, fifth: 5 } }
  const testFunction = value => value + 3
  expect(helpers.mapProperty('nestedObject', testFunction, testObject))
    .toEqual({ nestedObject: { first: 4, second: 5, third: 6, fourth: 7, fifth: 8 } })
})

test('filterObject applies function to exclude some values', () => {
  const testObject = { first: 1, second: 2, third: 3, fourth: 4, fifth: 5 }
  const testFunction = value => (value % 2) === 0
  expect(helpers.filterObject(testObject, testFunction))
    .toEqual({ second: 2, fourth: 4 })
})

test('reduceObject applies function to create something new from the object', () => {
  const testObject = { first: 1, second: 2, third: 3, fourth: 4, fifth: 5 }
  const testFunction = (summation, value) => summation + value
  expect(helpers.reduceObject(testObject, testFunction, 0)).toEqual(15)
})

describe('emptyObject', () => {
  test('returns correct boolean for object and array check', () => {
    const testObjectEmpty = {}
    expect(helpers.emptyObject(testObjectEmpty)).toBe(true)
    const testObjectFull = { first: 1, second: 2, third: 3, fourth: 4, fifth: 5 }
    expect(helpers.emptyObject(testObjectFull)).toBe(false)
    const testArrayEmpty = []
    expect(helpers.emptyObject(testArrayEmpty)).toBe(true)
    const testArrayFull = ['first', 'second', 'third', 'fourth', 'fifth']
    expect(helpers.emptyObject(testArrayFull)).toBe(false)
  })

  test('returns true for null', () => {
    const testNull = null
    expect(helpers.emptyObject(testNull)).toBe(true)
  })
})

describe('cloneObject', () => {
  test('produces a new copy of an object, changes to one object will not affect the original', () => {
    const someItem = { name: 'something' }
    const referenceItem = someItem
    expect(referenceItem).toBe(someItem)
    const result = helpers.cloneObject(someItem)
    expect(result).not.toBe(someItem)
    someItem.name = 'different'
    expect(referenceItem.name).toEqual('different')
    expect(result.name).toEqual('something')
  })

  test('can create new object from existing object with nested object', () => {
    const someItem = { name: 'something', nested: { value: 'aValue' }, nested2: { nestedDeep: { nestedValue: 'bValue' } } }
    const result = helpers.cloneObject(someItem)
    expect(result).not.toBe(someItem)
    someItem.name = 'different'
    someItem.nested.value = 'cValue'
    someItem.nested2.nestedDeep.nestedValue = 'dValue'
    expect(result.name).toEqual('something')
    expect(result.nested.value).toEqual('aValue')
    expect(result.nested2.nestedDeep.nestedValue).toEqual('bValue')
  })

  test('will clone object with empty nested objects', () => {
    const result = helpers.cloneObject(jsonDom)
    expect(result).not.toBe(jsonDom)
    expect(result).toEqual(jsonDom)
  })

  test('will clone DOM Item', () => {
    const result = helpers.cloneObject(domItem)
    expect(result).not.toBe(domItem)
    expect(result).toEqual(domItem)
  })

  test('will successfully clone linked list', () => {
    const result = helpers.cloneObject(linkedList)
    expect(result).not.toBe(linkedList)
    expect(result).toEqual(linkedList)
  })

  test('will successfully clone circular references', () => {
    const result = helpers.cloneObject(nodeTree)
    expect(result).not.toBe(nodeTree)
    expect(result).toEqual(nodeTree)
  })

  test('can remove deep references with 0 depth option', () => {
    const result = helpers.cloneObject(deepReferenceObject, { depthLimit: 0 })
    expect(result).toEqual({ object1: {}, title: 'Some Title', item: 45 })
  })

  test('can limit the number of references created to one with map of 1', () => {
    const result = helpers.cloneObject(multiReferenceObject, { mapLimit: 1 })
    expect(result).toEqual({ object1: {}, object2: {}, array1: [], array2: [], title: 'Some Title', item: 45 })
  })

  test('will be able to clone created object instance', () => {
    const instanceObject = { one: 'first', instance: Object.create({ two: 'second' }) }
    const result = helpers.cloneObject(instanceObject)
    expect(result).not.toBe(instanceObject)
    expect(result).toStrictEqual(instanceObject)
    expect(result.instance).toBe(instanceObject.instance)
  })

  test('will use original nested instance in new clone', () => {
    class SomeObject {
      construct () {
        this.one = 'first'
        this.two = 'second'
      }
    }
    const instanceObject = { string: 'aString', instance: new SomeObject() }
    const result = helpers.cloneObject(instanceObject)
    expect(result).not.toBe(instanceObject)
    expect(result).toStrictEqual(instanceObject)
    expect(result.instance).toBe(instanceObject.instance)
  })
})

describe('mergeObjects', () => {
  test('combines two objects into one new object', () => {
    const someItem = { name: 'something', number: 5, nested: { value: 'aValue' }, anArray: [1, 2, 3] }
    const secondItem = { name: 'different', key: 'someKey' }
    const newItem = helpers.mergeObjects(someItem, secondItem)
    expect(newItem).not.toBe(someItem)
    expect(newItem).toEqual({ name: 'different', number: 5, nested: { value: 'aValue' }, anArray: [1, 2, 3], key: 'someKey' })
  })

  test('combines multiple objects into one new object', () => {
    const someItem = { name: 'something', anArray: [1, 2, 3] }
    const secondItem = { number: 10, nested: { value: 'aValue' } }
    const thirdItem = { number: 5, anArray: [2, 3, 4, 5, 6, 7] }
    const fourthItem = { name: 'different', key: 'someKey' }
    const newItem = helpers.mergeObjects(someItem, secondItem, thirdItem, fourthItem)
    expect(newItem).not.toBe(someItem)
    expect(newItem.nested).not.toBe(secondItem.nested)
    expect(newItem).toEqual({ name: 'different', number: 5, nested: { value: 'aValue' }, anArray: [2, 3, 4, 5, 6, 7], key: 'someKey' })
  })
})

describe('mergeObjectsMutable', () => {
  test('combines two objects into the first object', () => {
    const someItem = { name: 'something', number: 5, nested: { value: 'aValue' }, anArray: [1, 2, 3] }
    const secondItem = { name: 'different', key: 'someKey' }
    const newItem = helpers.mergeObjectsMutable(someItem, secondItem)
    expect(newItem).toBe(someItem)
    expect(newItem).toEqual({ name: 'different', number: 5, nested: { value: 'aValue' }, anArray: [1, 2, 3], key: 'someKey' })
  })

  test('combines multiple objects into the first object', () => {
    const someItem = { name: 'something', anArray: [1, 2, 3] }
    const secondItem = { number: 10, nested: { value: 'aValue' } }
    const thirdItem = { number: 5, anArray: [2, 3, 4, 5, 6, 7] }
    const fourthItem = { name: 'different', key: 'someKey' }
    const newItem = helpers.mergeObjectsMutable(someItem, secondItem, thirdItem, fourthItem)
    expect(newItem.nested).toBe(secondItem.nested)
    expect(newItem.anArray).toStrictEqual(thirdItem.anArray)
    expect(newItem).toEqual({ name: 'different', number: 5, nested: { value: 'aValue' }, anArray: [2, 3, 4, 5, 6, 7], key: 'someKey' })
  })
})
