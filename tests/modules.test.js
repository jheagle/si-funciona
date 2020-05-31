import functionalHelpers from '../modules/main'
import arrayHelpers from '../modules/helpers/arrays'
import functionHelpers from '../modules/helpers/functions'
import numberHelpers from '../modules/helpers/numbers'
import objectHelpers from '../modules/helpers/objects'

test('Generated main browser file exports intended functions', () => {
  expect(Object.keys(functionalHelpers).length).toEqual(27)
  expect(typeof functionalHelpers.noConflict).toBe('function')
  expect(typeof functionalHelpers.buildArray).toBe('function')
  expect(typeof functionalHelpers.buildArrayOfReferences).toBe('function')
  expect(typeof functionalHelpers.uniqueArray).toBe('function')
  expect(typeof functionalHelpers.mergeArrays).toBe('function')
  expect(typeof functionalHelpers.compareArrays).toBe('function')
  expect(typeof functionalHelpers.curry).toBe('function')
  expect(typeof functionalHelpers.pipe).toBe('function')
  expect(typeof functionalHelpers.callWithParams).toBe('function')
  expect(typeof functionalHelpers.queueTimeout).toBe('function')
  expect(typeof functionalHelpers.getAbsoluteMax).toBe('function')
  expect(typeof functionalHelpers.getAbsoluteMin).toBe('function')
  expect(typeof functionalHelpers.randomNumber).toBe('function')
  expect(typeof functionalHelpers.randomInteger).toBe('function')
  expect(typeof functionalHelpers.compare).toBe('function')
  expect(typeof functionalHelpers.setValue).toBe('function')
  expect(typeof functionalHelpers.setAndReturnValue).toBe('function')
  expect(typeof functionalHelpers.mapObject).toBe('function')
  expect(typeof functionalHelpers.mapProperty).toBe('function')
  expect(typeof functionalHelpers.filterObject).toBe('function')
  expect(typeof functionalHelpers.reduceObject).toBe('function')
  expect(typeof functionalHelpers.notEmptyObjectOrArray).toBe('function')
  expect(typeof functionalHelpers.cloneObject).toBe('function')
  expect(typeof functionalHelpers.mergeObjects).toBe('function')
  expect(typeof functionalHelpers.mergeObjectsMutable).toBe('function')
})

test('Generated arrays browser file exports intended functions', () => {
  expect(Object.keys(arrayHelpers).length).toEqual(5)
  expect(typeof arrayHelpers.buildArray).toBe('function')
  expect(typeof arrayHelpers.buildArrayOfReferences).toBe('function')
  expect(typeof arrayHelpers.uniqueArray).toBe('function')
  expect(typeof arrayHelpers.mergeArrays).toBe('function')
  expect(typeof arrayHelpers.compareArrays).toBe('function')
})

test('Generated functions browser file exports intended functions', () => {
  expect(Object.keys(functionHelpers).length).toEqual(6)
  expect(typeof functionHelpers.curry).toBe('function')
  expect(typeof functionHelpers.pipe).toBe('function')
  expect(typeof functionHelpers.callWithParams).toBe('function')
  expect(typeof functionHelpers.delay).toBe('function')
  expect(typeof functionHelpers.queueManager).toBe('function')
  expect(typeof functionHelpers.queueTimeout).toBe('function')
})

test('Generated numbers browser file exports intended functions', () => {
  expect(Object.keys(numberHelpers).length).toEqual(5)
  expect(typeof numberHelpers.getAbsoluteMax).toBe('function')
  expect(typeof numberHelpers.getAbsoluteMin).toBe('function')
  expect(typeof numberHelpers.randomNumber).toBe('function')
  expect(typeof numberHelpers.randomInteger).toBe('function')
  expect(typeof numberHelpers.compare).toBe('function')
})

test('Generated objects browser file exports intended functions', () => {
  expect(Object.keys(objectHelpers).length).toEqual(10)
  expect(typeof objectHelpers.setValue).toBe('function')
  expect(typeof objectHelpers.setAndReturnValue).toBe('function')
  expect(typeof objectHelpers.mapObject).toBe('function')
  expect(typeof objectHelpers.mapProperty).toBe('function')
  expect(typeof objectHelpers.filterObject).toBe('function')
  expect(typeof objectHelpers.reduceObject).toBe('function')
  expect(typeof objectHelpers.notEmptyObjectOrArray).toBe('function')
  expect(typeof objectHelpers.cloneObject).toBe('function')
  expect(typeof objectHelpers.mergeObjects).toBe('function')
  expect(typeof objectHelpers.mergeObjectsMutable).toBe('function')
})
