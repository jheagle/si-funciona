import * as helpers from '../dist/helpers/objects'

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

test('notEmptyObjectOrArray returns correct boolean for object and array check', () => {
  const testObjectEmpty = {}
  expect(helpers.notEmptyObjectOrArray(testObjectEmpty)).toBe(false)
  const testObjectFull = { first: 1, second: 2, third: 3, fourth: 4, fifth: 5 }
  expect(helpers.notEmptyObjectOrArray(testObjectFull)).toBe(true)
  const testArrayEmpty = []
  expect(helpers.notEmptyObjectOrArray(testArrayEmpty)).toBe(false)
  const testArrayFull = ['first', 'second', 'third', 'fourth', 'fifth']
  expect(helpers.notEmptyObjectOrArray(testArrayFull)).toBe(true)
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
