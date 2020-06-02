import helpers from '../dist/helpers/objects'

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

// cloneObject
// mergeObjects
// mergeObjectsMutable
