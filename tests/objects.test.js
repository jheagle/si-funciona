import * as helpers from '../dist/helpers/objects'
import * as samples from '../dist/helpers/objects/descriptorSamples'

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
        type: [],
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
})

describe('describeObject', () => {
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
      type: [],
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
    expect(helpers.describeObjectMap(helpers.describeObject({ keyName: '' })))
      .toEqual(samples.mappedDescriptorMap)
  })
})

describe('describeObjectMap; with mapLimit', () => {
  const multiReferenceObject = {
    object1: {
      name: 'someName'
    },
    object2: {
      age: 12
    },
    array1: [
      'someString',
      'anotherString'
    ],
    array2: [
      89,
      32
    ],
    title: 'Some Title',
    item: 45
  }

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
  const deepReferenceObject = {
    object1: {
      name: 'someName',
      object2: {
        age: 12,
        array1: [
          'someString',
          'anotherString'
        ]
      },
      array2: [
        89,
        32
      ]
    },
    title: 'Some Title',
    item: 45
  }

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
