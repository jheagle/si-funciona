import * as helpers from '../dist/helpers/objects'
import { circularObject, deepReferenceObject, domItem, jsonDom, linkedList, multiReferenceObject, nodeTree } from './testHelpers'

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

  test('will get numeric keys from array', () => {
    const someArray = ['first', 'second']
    expect(helpers.objectKeys(someArray)).toEqual([0, 1])
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
      construct() {
        this.one = 'first'
        this.two = 'second'
      }
    }
    expect(helpers.isInstanceObject(SampleClass)).toBe(true)
  })

  test('instatiated object is an instance object', () => {
    class SampleClass {
      construct() {
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

describe('mapOriginalObject', () => {
  test('builds simple array of reference identifiers', () => {
    const someItem = { name: 'something', nested: { value: 'aValue' }, nested2: { nestedDeep: { nestedValue: 'bValue' } } }
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(newReferenceMap)(someItem)
    expect(newReferenceMap[0].object).toEqual({ name: 'something', nested: 1, nested2: 2 })
    expect(newReferenceMap[1].object).toEqual({ value: 'aValue' })
    expect(newReferenceMap[2].object).toEqual({ nestedDeep: 3 })
    expect(newReferenceMap[3].object).toEqual({ nestedValue: 'bValue' })
  })

  test('builds circular reference array of identifiers for linked list', () => {
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(newReferenceMap)(linkedList)
    expect(newReferenceMap[0].object).toEqual({ name: 'one', prev: null, next: 1 })
    expect(newReferenceMap[1].object).toEqual({ name: 'two', prev: 0, next: 2 })
    expect(newReferenceMap[2].object).toEqual({ name: 'three', prev: 1, next: null })
  })

  test('builds circular reference array of identifiers for node tree', () => {
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(newReferenceMap)(nodeTree)
    expect(newReferenceMap[0].object).toEqual({ name: 'one', parent: null, children: 1 })
    expect(newReferenceMap[1].object).toEqual([2, 5])
    expect(newReferenceMap[2].object).toEqual({ name: 'child one', parent: 0, children: 3 })
    expect(newReferenceMap[3].object).toEqual([4])
    expect(newReferenceMap[4].object).toEqual({ name: 'grandchild one', parent: 2, children: [] })
    expect(newReferenceMap[5].object).toEqual({ name: 'child two', parent: 0, children: [] })
  })

  test('array of domItems with child domItmes can be mapped', () => {
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(newReferenceMap)(domItem)
    expect(newReferenceMap[0].object).toEqual([1])
    expect(newReferenceMap[1].object).toEqual({ attributes: 2, axis: 'y', children: 3, element: {}, eventListeners: {}, parentItem: {}, tagName: 'div' })
    expect(newReferenceMap[2].object).toEqual({ className: 'row', style: {} })
    expect(newReferenceMap[3].object).toEqual([4])
    expect(newReferenceMap[4].object).toEqual({ attributes: 5, axis: 'x', children: [], element: {}, eventListeners: {}, parentItem: {}, tagName: 'div', hasShip: false, isHit: false, point: {} })
    expect(newReferenceMap[5].object).toEqual({ style: {} })
  })

  test('object with nested instance object will just use instance', () => {
    const instanceObject = { one: 'first', instance: Object.create({ two: 'second' }) }
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(newReferenceMap)(instanceObject)
    expect(newReferenceMap[0].object).toEqual(instanceObject)
  })

  test('multiple circular reference will be able to create reference map', () => {
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(newReferenceMap)(circularObject)
    expect(newReferenceMap[0].object).toEqual({ name: 'root', parent: {}, body: 1, head: 5, children: 9 })
    expect(newReferenceMap[1].object).toEqual({ name: 'body', parent: 0, children: 2 })
    expect(newReferenceMap[2].object).toEqual([3, 4])
    expect(newReferenceMap[3].object).toEqual({ name: 'body child one', parent: 1, children: [] })
    expect(newReferenceMap[4].object).toEqual({ name: 'body child two', parent: 1, children: [] })
    expect(newReferenceMap[5].object).toEqual({ name: 'head', parent: 0, children: 6 })
    expect(newReferenceMap[6].object).toEqual([7, 8])
    expect(newReferenceMap[7].object).toEqual({ name: 'head child one', parent: 5, children: [] })
    expect(newReferenceMap[8].object).toEqual({ name: 'head child two', parent: 5, children: [] })
    expect(newReferenceMap[9].object).toEqual([1, 5])
  })

  test('multiple circuar reference with optional will skip when not found', () => {
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(newReferenceMap)(circularObject.body)
    expect(newReferenceMap[0].object).toEqual({ name: 'body', parent: 1, children: 7 })
    expect(newReferenceMap[1].object).toEqual({ name: 'root', parent: {}, body: 0, head: 2, children: 6 })
    expect(newReferenceMap[2].object).toEqual({ name: 'head', parent: 1, children: 3 })
    expect(newReferenceMap[3].object).toEqual([4, 5])
    expect(newReferenceMap[4].object).toEqual({ name: 'head child one', parent: 2, children: [] })
    expect(newReferenceMap[5].object).toEqual({ name: 'head child two', parent: 2, children: [] })
    expect(newReferenceMap[6].object).toEqual([0, 2])
    expect(newReferenceMap[7].object).toEqual([8, 9])
    expect(newReferenceMap[8].object).toEqual({ name: 'body child one', parent: 0, children: [] })
    expect(newReferenceMap[9].object).toEqual({ name: 'body child two', parent: 0, children: [] })
  })
})

describe('mapOriginalObject; with mapLimit', () => {
  test('will limit a map to one', () => {
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(newReferenceMap, { mapLimit: 1 })(multiReferenceObject)
    expect(newReferenceMap.length).toBe(1)
  })

  test('will limit a map to two', () => {
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(newReferenceMap, { mapLimit: 2 })(multiReferenceObject)
    expect(newReferenceMap.length).toBe(2)
  })

  test('will limit a map to four, capturing three of the references', () => {
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(newReferenceMap, { mapLimit: 4 })(multiReferenceObject)
    expect(newReferenceMap.length).toBe(4)
  })

  test('will limit a map by five which is the same as all references', () => {
    const fullReferenceMap = []
    fullReferenceMap[0] = helpers.mapOriginalObject(fullReferenceMap)(multiReferenceObject)
    const limitFiveMap = []
    limitFiveMap[0] = helpers.mapOriginalObject(limitFiveMap, { mapLimit: 5 })(multiReferenceObject)
    expect(fullReferenceMap).toEqual(limitFiveMap)
  })
})

describe('mapOriginalObject; with depthLimit', () => {
  test('with depth limit zero will be the same as single descriptor within an array', () => {
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(newReferenceMap, { depthLimit: 0 })(deepReferenceObject)
    expect(newReferenceMap.length).toBe(1)
  })

  test('with depth limit one will only include main descriptor and one nested object', () => {
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(newReferenceMap, { depthLimit: 1 })(deepReferenceObject)
    expect(newReferenceMap.length).toBe(2)
  })

  test('with depth limit two will not include the array or object on depth of three', () => {
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(newReferenceMap, { depthLimit: 2 })(deepReferenceObject)
    expect(newReferenceMap.length).toBe(3)
  })

  test('with depth limit three is the max depth of this object so it should result in the same as no limit', () => {
    const fullReferenceMap = []
    fullReferenceMap[0] = helpers.mapOriginalObject(fullReferenceMap)(deepReferenceObject)
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(newReferenceMap, { depthLimit: 3 })(deepReferenceObject)
    expect(newReferenceMap.length).toBe(5)
    expect(newReferenceMap).toEqual(fullReferenceMap)
  })
})

describe('assignNewReferences', () => {
  test('creates a new simple reference based on array of reference identifiers', () => {
    const someItem = { name: 'something', nested: { value: 'aValue' }, nested2: { nestedDeep: { nestedValue: 'bValue' } } }
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(newReferenceMap)(someItem)
    const result = helpers.assignNewReferences(newReferenceMap)(newReferenceMap[0])
    expect(result).not.toBe(someItem)
    expect(result).toEqual(someItem)
  })

  test('takes circular reference linked list identifiers and creates new reference', () => {
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(newReferenceMap)(linkedList)
    const result = helpers.assignNewReferences(newReferenceMap)(newReferenceMap[0])
    expect(result).not.toBe(linkedList)
    expect(result).toEqual(linkedList)
  })

  test('takes circular reference node tree identifiers and creates new reference', () => {
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(newReferenceMap)(nodeTree)
    const result = helpers.assignNewReferences(newReferenceMap)(newReferenceMap[0])
    expect(result).not.toBe(nodeTree)
    expect(result).toEqual(nodeTree)
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
      construct() {
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
