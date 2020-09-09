// import * as helpers from '../dist/helpers/objects'
// import * as samples from '../dist/helpers/objects/descriptorSamples'
import * as helpers from '../src/helpers/objects'
import * as samples from '../src/helpers/objects/descriptorSamples'
import { logObject, deepReferenceObject, linkedList, multiReferenceObject, nodeTree } from './testHelpers'

test('setValue will update an item and return the item', () => {
  const someObject = {
    firstProp: null,
    secondProp: 'something here'
  }
  const updateObject1 = helpers.setValue(someObject, 'firstProp', { newValue: 'some value' })
  const updateObject2 = helpers.setValue(updateObject1, 'secondProp', 'a new thing here')
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

describe('describeObjectDetail generates detail for', () => {
  test('undefined type', () => {
    expect(helpers.describeObjectDetail(undefined, 'anUndefined'))
      .toEqual({
        index: 0,
        key: 'anUndefined',
        type: ['undefined'],
        value: [undefined],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        arrayReference: null,
        objectReference: null
      })
  })

  test('boolean type', () => {
    expect(helpers.describeObjectDetail(true, 'aBoolean'))
      .toEqual({
        index: 0,
        key: 'aBoolean',
        type: ['boolean'],
        value: [true],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        arrayReference: null,
        objectReference: null
      })
  })

  test('number type', () => {
    expect(helpers.describeObjectDetail(34, 'aNumber'))
      .toEqual({
        index: 0,
        key: 'aNumber',
        type: ['number'],
        value: [34],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        arrayReference: null,
        objectReference: null
      })
  })

  test('string type', () => {
    expect(helpers.describeObjectDetail('someString', 'aString'))
      .toEqual({
        index: 0,
        key: 'aString',
        type: ['string'],
        value: ['someString'],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        arrayReference: null,
        objectReference: null
      })
  })

  test('bigint type', () => {
    expect(helpers.describeObjectDetail(9007199254740992n, 'aBigInt'))
      .toEqual({
        index: 0,
        key: 'aBigInt',
        type: ['bigint'],
        value: [9007199254740992n],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        arrayReference: null,
        objectReference: null
      })
  })

  test('symbol type', () => {
    const sym1 = Symbol('sym')
    expect(helpers.describeObjectDetail(sym1, 'aSymbol'))
      .toEqual({
        index: 0,
        key: 'aSymbol',
        type: ['symbol'],
        value: [sym1],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        arrayReference: null,
        objectReference: null
      })
  })

  test('null type', () => {
    expect(helpers.describeObjectDetail(null, 'aNull'))
      .toEqual({
        index: 0,
        key: 'aNull',
        type: ['object'],
        value: [null],
        nullable: true,
        optional: false,
        circular: false,
        isReference: false,
        arrayReference: null,
        objectReference: null
      })
  })

  test('object type', () => {
    const someObject = { item: 'something' }
    expect(helpers.describeObjectDetail(someObject, 'anObject'))
      .toEqual({
        index: 0,
        key: 'anObject',
        type: ['object'],
        value: [someObject],
        nullable: false,
        optional: false,
        circular: false,
        isReference: true,
        arrayReference: null,
        objectReference: null
      })

    const dateObject = new Date()
    expect(helpers.describeObjectDetail(dateObject, 'aDate'))
      .toEqual({
        index: 0,
        key: 'aDate',
        type: ['object'],
        value: [dateObject],
        nullable: false,
        optional: false,
        circular: false,
        isReference: true,
        arrayReference: null,
        objectReference: null
      })

    const someArray = ['a', 'b', 'c']
    expect(helpers.describeObjectDetail(someArray, 'anArray'))
      .toEqual({
        index: 0,
        key: 'anArray',
        type: ['object'],
        value: [someArray],
        nullable: false,
        optional: false,
        circular: false,
        isReference: true,
        arrayReference: null,
        objectReference: null
      })
  })

  test('function type', () => {
    const someFunction = () => true
    expect(helpers.describeObjectDetail(someFunction, 'aFunction'))
      .toEqual({
        index: 0,
        key: 'aFunction',
        type: ['function'],
        value: [someFunction],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        arrayReference: null,
        objectReference: null
      })
  })

  test('sample object detail with string', () => {
    expect(helpers.describeObjectDetail('', 'keyName'))
      .toEqual(samples.descriptorDetailSample)
  })
})

describe('assignDescriptor', () => {
  test('assigns new value on same detail', () => {
    expect(helpers.assignDescriptor(samples.descriptorSample, helpers.describeObject({ keyName: 'someString' })))
      .toMatchObject({
        details: [
          {
            key: 'keyName',
            type: ['string'],
            value: ['', 'someString']
          }
        ],
        length: 1,
        keys: ['keyName'],
        references: [],
        isArray: false,
        complete: true
      })
  })

  test('assigns empty array detail to filled array detail', () => {
    const childOne = { name: 'child one' }
    const childTwo = { name: 'child two' }
    const children = helpers.describeObject([childOne, childTwo])
    const noChildren = helpers.describeObject([])
    expect(helpers.assignDescriptor(children, noChildren))
      .toMatchObject({
        details: [
          {
            key: 0,
            type: ['object'],
            value: [childOne, childTwo]
          }
        ],
        length: 2,
        keys: [0],
        references: [0],
        isArray: true,
        complete: true
      })
  })
})

describe('describeObject', () => {
  test('will create empty object description', () => {
    expect(helpers.describeObject({}))
      .toEqual({
        index: 0,
        details: [],
        length: 0,
        keys: [],
        references: [],
        isArray: false,
        complete: true
      })
  })

  test('will create empty array description', () => {
    expect(helpers.describeObject([]))
      .toEqual({
        index: 0,
        details: [],
        length: 0,
        keys: [],
        references: [],
        isArray: true,
        complete: true
      })
  })

  test('can produce structure matching sample with single string detail', () => {
    expect(helpers.describeObject({ keyName: '' }))
      .toEqual(samples.descriptorSample)
  })

  test('produces a simple descriptor of an object', () => {
    const someItem = { aString: 'someString', aNumber: 34, aBoolean: true, aNull: null, anUndefined: undefined }
    const descriptor = helpers.describeObject(someItem)
    expect(descriptor.details[0]).toEqual({
      index: 0,
      key: 'aString',
      type: ['string'],
      value: ['someString'],
      nullable: false,
      optional: false,
      circular: false,
      isReference: false,
      arrayReference: null,
      objectReference: null
    })
    expect(descriptor.details[1]).toEqual({
      index: 1,
      key: 'aNumber',
      type: ['number'],
      value: [34],
      nullable: false,
      optional: false,
      circular: false,
      isReference: false,
      arrayReference: null,
      objectReference: null
    })
    expect(descriptor.details[2]).toEqual({
      index: 2,
      key: 'aBoolean',
      type: ['boolean'],
      value: [true],
      nullable: false,
      optional: false,
      circular: false,
      isReference: false,
      arrayReference: null,
      objectReference: null
    })
    expect(descriptor.details[3]).toEqual({
      index: 3,
      key: 'aNull',
      type: ['object'],
      value: [null],
      nullable: true,
      optional: false,
      circular: false,
      isReference: false,
      arrayReference: null,
      objectReference: null
    })
    expect(descriptor.details[4]).toEqual({
      index: 4,
      key: 'anUndefined',
      type: ['undefined'],
      value: [undefined],
      nullable: false,
      optional: false,
      circular: false,
      isReference: false,
      arrayReference: null,
      objectReference: null
    })
    expect(descriptor.length).toBe(5)
    expect(descriptor.references).toStrictEqual([])
    expect(descriptor.complete).toBe(true)
    expect(descriptor.isArray).toBe(false)
  })

  test('produces a simple descriptor of an array', () => {
    const someItem = ['someString', 34, true, null, undefined]
    const descriptor = helpers.describeObject(someItem)
    expect(descriptor.details[0]).toEqual({
      index: 0,
      key: 0,
      type: ['string', 'number', 'boolean', 'undefined'],
      value: ['someString', 34, true, null, undefined],
      nullable: true,
      optional: false,
      circular: false,
      isReference: false,
      arrayReference: null,
      objectReference: null
    })
    expect(descriptor.length).toBe(5)
    expect(descriptor.references).toStrictEqual([])
    expect(descriptor.complete).toBe(true)
    expect(descriptor.isArray).toBe(true)
  })
})

describe('compareDescriptor; object-descriptors', () => {
  test('will return true for two exact match descriptors of objects', () => {
    expect(helpers.compareDescriptor(
      samples.descriptorSample,
      samples.descriptorSample
    )).toBe(true)
  })

  test('will return true for descriptor where all keys exist in another descriptor of an object', () => {
    expect(helpers.compareDescriptor(
      samples.descriptorSample,
      helpers.describeObject({ keyName: '', someNumber: 23 })
    )).toBe(true)
  })

  test('will return true when the smaller descriptor\'s keys exist in another descriptor of an object', () => {
    expect(helpers.compareDescriptor(
      helpers.describeObject({ keyName: '', someNumber: 23 }),
      samples.descriptorSample
    )).toBe(true)
  })

  test('will return false for descriptor where the keys exist but have a different type of an object', () => {
    expect(helpers.compareDescriptor(
      samples.descriptorSample,
      helpers.describeObject({ keyName: 23 })
    )).toBe(false)
  })

  test('will return false for descriptor where no keys match for an object', () => {
    expect(helpers.compareDescriptor(
      samples.descriptorSample,
      helpers.describeObject({ someName: '' })
    )).toBe(false)
  })

  test('will return false for the smallest descriptor when not all keys match the other descriptor for an object', () => {
    expect(helpers.compareDescriptor(
      helpers.describeObject({ keyName: '', someNumber: 23 }),
      helpers.describeObject({ keyName: '', someNull: null })
    )).toBe(false)
  })
})

describe('compareDescriptor; array-descriptors', () => {
  test('will return true for two exact match descriptors of arrays', () => {
    expect(helpers.compareDescriptor(
      helpers.describeObject(['']),
      helpers.describeObject([''])
    )).toBe(true)
  })

  test('will return true for the same type and length', () => {
    expect(helpers.compareDescriptor(
      helpers.describeObject(['', 1, null]),
      helpers.describeObject([23, '', 6])
    )).toBe(true)
  })

  test('will return false for the same type but different length', () => {
    expect(helpers.compareDescriptor(
      helpers.describeObject(['', 1, 'string']),
      helpers.describeObject([23, ''])
    )).toBe(false)
  })

  test('will return false for array descriptor comarison with object descriptor', () => {
    expect(helpers.compareDescriptor(
      helpers.describeObject(['']),
      helpers.describeObject({ 0: '' })
    )).toBe(false)
  })
})

describe('describeObjectMap', () => {
  test('can produce structure matching sample with single string detail', () => {
    expect(helpers.describeObjectMap({ keyName: '' }))
      .toEqual(samples.descriptorMapSample)
  })

  test('can produce structure similar to sample mapped sample', () => {
    const descriptor = helpers.describeObject({ keyName: '' })
    const result = helpers.describeObjectMap(descriptor)
    expect(result)
      .toEqual(samples.mappedDescriptorMap)
  })

  test('object with self reference can be described', () => {
    const selfItem = { name: 'self', self: null }
    selfItem.self = selfItem
    expect(helpers.describeObjectMap(selfItem)).toEqual([
      {
        index: 0,
        details: [
          {
            index: 0,
            key: 'name',
            type: ['string'],
            value: ['self'],
            nullable: false,
            optional: false,
            circular: false,
            isReference: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 1,
            key: 'self',
            type: ['object'],
            value: [selfItem],
            nullable: false,
            optional: false,
            circular: true,
            isReference: true,
            arrayReference: null,
            objectReference: 0
          }
        ],
        length: 2,
        keys: ['name', 'self'],
        references: [1],
        isArray: false,
        complete: true
      }
    ])
  })

  test('able to describe and map linked list object with circular references', () => {
    expect(helpers.describeObjectMap(linkedList)).toEqual([
      {
        index: 0,
        details: [
          {
            index: 0,
            key: 'name',
            type: ['string'],
            value: ['one', 'two', 'three'],
            nullable: false,
            optional: false,
            circular: false,
            isReference: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 1,
            key: 'prev',
            type: ['object'],
            value: [null, linkedList, linkedList.next],
            nullable: true,
            optional: false,
            circular: true,
            isReference: true,
            arrayReference: null,
            objectReference: 0
          },
          {
            index: 2,
            key: 'next',
            type: ['object'],
            value: [linkedList.next, linkedList.next.next, null],
            nullable: true,
            optional: false,
            circular: false,
            isReference: true,
            arrayReference: null,
            objectReference: 0
          }
        ],
        length: 3,
        keys: ['name', 'prev', 'next'],
        references: [1, 2],
        isArray: false,
        complete: true
      }
    ])
  })

  test('able to describe and map node tree object with circular references', () => {
    expect(helpers.describeObjectMap(nodeTree)).toEqual([
      {
        index: 0,
        details: [
          {
            index: 0,
            key: 'name',
            type: ['string'],
            value: ['one', 'child two'],
            nullable: false,
            optional: false,
            circular: false,
            isReference: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 1,
            key: 'parent',
            type: ['object'],
            value: [
              null,
              nodeTree
            ],
            nullable: true,
            optional: false,
            circular: true,
            isReference: true,
            arrayReference: null,
            objectReference: 0
          },
          {
            index: 2,
            key: 'children',
            type: ['object'],
            value: [
              nodeTree.children,
              []
            ],
            nullable: false,
            optional: false,
            circular: false,
            isReference: true,
            arrayReference: 1,
            objectReference: null
          }
        ],
        length: 3,
        keys: ['name', 'parent', 'children'],
        references: [1, 2],
        isArray: false,
        complete: true
      },
      {
        index: 1,
        details: [
          {
            index: 0,
            key: 0,
            type: ['object'],
            value: [
              nodeTree.children[0],
              nodeTree.children[1]
            ],
            nullable: false,
            optional: true,
            circular: false,
            isReference: true,
            arrayReference: null,
            objectReference: 0
          }
        ],
        length: 2,
        keys: [0],
        references: [0],
        isArray: true,
        complete: true
      }
    ])
  })
})

describe('describeObjectMap; with mapLimit', () => {
  test('will limit a map to one which is the same as a single descriptor within an array', () => {
    const result = helpers.describeObjectMap(multiReferenceObject, { mapLimit: 1 })
    expect(result).toEqual([helpers.describeObject(multiReferenceObject)])
    expect(result.length).toBe(1)
  })

  test('will limit a map to two, capturing the original and one reference object', () => {
    expect(helpers.describeObjectMap(multiReferenceObject, { mapLimit: 2 }).length).toBe(2)
  })

  test('will limit a map to four, capturing three of the references', () => {
    expect(helpers.describeObjectMap(multiReferenceObject, { mapLimit: 4 }).length).toBe(4)
  })

  test('will limit a map by five which is the same as all references', () => {
    const fullyMapped = helpers.describeObjectMap(multiReferenceObject)
    const limitFive = helpers.describeObjectMap(multiReferenceObject, { mapLimit: 5 })
    expect(fullyMapped).toEqual(limitFive)
  })
})

describe('describeObjectMap; with depthLimit', () => {
  test('with depth limit zero will be the same as single descriptor within an array', () => {
    const result = helpers.describeObjectMap(deepReferenceObject, { depthLimit: 0 })
    expect(result).toEqual([helpers.describeObject(deepReferenceObject)])
    expect(result.length).toBe(1)
  })

  test('with depth limit one will only include main descriptor and one nested object', () => {
    expect(helpers.describeObjectMap(deepReferenceObject, { depthLimit: 1 }).length).toBe(2)
  })

  test('with depth limit two will not include the array on depth of four', () => {
    expect(helpers.describeObjectMap(deepReferenceObject, { depthLimit: 2 }).length).toBe(4)
  })

  test('with depth limit three is the max depth of this object so it should result in the same as no limit', () => {
    const result = helpers.describeObjectMap(deepReferenceObject, { depthLimit: 3 })
    expect(result.length).toBe(5)
    expect(result).toEqual(helpers.describeObjectMap(deepReferenceObject))
  })
})

describe('mapOriginalObject', () => {
  test('builds simple array of reference identifiers', () => {
    const someItem = { name: 'something', nested: { value: 'aValue' }, nested2: { nestedDeep: { nestedValue: 'bValue' } } }
    const descriptorMap = helpers.describeObjectMap(someItem)
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(descriptorMap, newReferenceMap)(someItem, descriptorMap[0])
    expect(newReferenceMap[0].object).toEqual({ name: 'something', nested: 1, nested2: 2 })
    expect(newReferenceMap[1].object).toEqual({ value: 'aValue' })
    expect(newReferenceMap[2].object).toEqual({ nestedDeep: 3 })
    expect(newReferenceMap[3].object).toEqual({ nestedValue: 'bValue' })
  })

  test('builds circular reference array of identifiers for linked list', () => {
    const descriptorMap = helpers.describeObjectMap(linkedList)
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(descriptorMap, newReferenceMap)(linkedList, descriptorMap[0])
    expect(newReferenceMap[0].object).toEqual({ name: 'one', prev: null, next: 1 })
    expect(newReferenceMap[1].object).toEqual({ name: 'two', prev: 0, next: 2 })
    expect(newReferenceMap[2].object).toEqual({ name: 'three', prev: 1, next: null })
  })

  test('builds circular reference array of identifiers for node tree', () => {
    const descriptorMap = helpers.describeObjectMap(nodeTree)
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(descriptorMap, newReferenceMap)(nodeTree, descriptorMap[0])
    expect(newReferenceMap[0].object).toEqual({ name: 'one', parent: null, children: 1 })
    expect(newReferenceMap[1].object).toEqual([2, 3])
    expect(newReferenceMap[2].object).toEqual({ name: 'child one', parent: 0, children: 4 })
    expect(newReferenceMap[3].object).toEqual({ name: 'child two', parent: 0, children: [] })
    expect(newReferenceMap[4].object).toEqual([5])
    expect(newReferenceMap[5].object).toEqual({ name: 'grandchild one', parent: 2, children: [] })
  })
})

describe('mapOriginalObject; with mapLimit', () => {
  test('will limit a map to one', () => {
    const descriptorMap = helpers.describeObjectMap(multiReferenceObject, { mapLimit: 1 })
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(descriptorMap, newReferenceMap, { mapLimit: 1 })(multiReferenceObject, descriptorMap[0])
    expect(newReferenceMap.length).toBe(1)
  })

  test('will limit a map to two', () => {
    const descriptorMap = helpers.describeObjectMap(multiReferenceObject, { mapLimit: 2 })
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(descriptorMap, newReferenceMap, { mapLimit: 2 })(multiReferenceObject, descriptorMap[0])
    expect(newReferenceMap.length).toBe(2)
  })

  test('will limit a map to four, capturing three of the references', () => {
    const descriptorMap = helpers.describeObjectMap(multiReferenceObject, { mapLimit: 2 })
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(descriptorMap, newReferenceMap, { mapLimit: 2 })(multiReferenceObject, descriptorMap[0])
    expect(helpers.describeObjectMap(multiReferenceObject, { mapLimit: 4 }).length).toBe(4)
  })

  test('will limit a map by five which is the same as all references', () => {
    const descriptorMap = helpers.describeObjectMap(multiReferenceObject)
    const fullReferenceMap = []
    fullReferenceMap[0] = helpers.mapOriginalObject(descriptorMap, fullReferenceMap)(multiReferenceObject, descriptorMap[0])
    const limitFiveMap = []
    limitFiveMap[0] = helpers.mapOriginalObject(descriptorMap, limitFiveMap, { mapLimit: 5 })(multiReferenceObject, descriptorMap[0])
    expect(fullReferenceMap).toEqual(limitFiveMap)
  })
})

describe('mapOriginalObject; with depthLimit', () => {
  test('with depth limit zero will be the same as single descriptor within an array', () => {
    const descriptorMap = helpers.describeObjectMap(deepReferenceObject, { depthLimit: 0 })
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(descriptorMap, newReferenceMap, { depthLimit: 0 })(deepReferenceObject, descriptorMap[0])
    expect(newReferenceMap.length).toBe(1)
  })

  test('with depth limit one will only include main descriptor and one nested object', () => {
    const descriptorMap = helpers.describeObjectMap(deepReferenceObject, { depthLimit: 1 })
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(descriptorMap, newReferenceMap, { depthLimit: 1 })(deepReferenceObject, descriptorMap[0])
    expect(newReferenceMap.length).toBe(2)
  })

  test('with depth limit two will not include the array on depth of four', () => {
    const descriptorMap = helpers.describeObjectMap(deepReferenceObject, { depthLimit: 2 })
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(descriptorMap, newReferenceMap, { depthLimit: 2 })(deepReferenceObject, descriptorMap[0])
    expect(newReferenceMap.length).toBe(4)
  })

  test('with depth limit three is the max depth of this object so it should result in the same as no limit', () => {
    const descriptorMap = helpers.describeObjectMap(deepReferenceObject)
    const fullReferenceMap = []
    fullReferenceMap[0] = helpers.mapOriginalObject(descriptorMap, fullReferenceMap)(deepReferenceObject, descriptorMap[0])
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(descriptorMap, newReferenceMap, { depthLimit: 3 })(deepReferenceObject, descriptorMap[0])
    expect(newReferenceMap.length).toBe(5)
    expect(newReferenceMap).toEqual(fullReferenceMap)
  })
})

describe('assignNewReferences', () => {
  test('creates a new simple reference based on array of reference identifiers', () => {
    const someItem = { name: 'something', nested: { value: 'aValue' }, nested2: { nestedDeep: { nestedValue: 'bValue' } } }
    const descriptorMap = helpers.describeObjectMap(someItem)
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(descriptorMap, newReferenceMap)(someItem, descriptorMap[0])
    const result = helpers.assignNewReferences(newReferenceMap)(newReferenceMap[0])
    expect(result).not.toBe(someItem)
    expect(result).toEqual(someItem)
  })

  test('takes circular reference linked list identifiers and creates new reference', () => {
    const descriptorMap = helpers.describeObjectMap(linkedList)
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(descriptorMap, newReferenceMap)(linkedList, descriptorMap[0])
    const result = helpers.assignNewReferences(newReferenceMap)(newReferenceMap[0])
    expect(result).not.toBe(linkedList)
    expect(result).toEqual(linkedList)
  })

  test('takes circular reference node tree identifiers and creates new reference', () => {
    const descriptorMap = helpers.describeObjectMap(nodeTree)
    const newReferenceMap = []
    newReferenceMap[0] = helpers.mapOriginalObject(descriptorMap, newReferenceMap)(nodeTree, descriptorMap[0])
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
