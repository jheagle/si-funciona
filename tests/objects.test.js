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

describe('traceObjectDetail generates detail for', () => {
  test('undefined type', () => {
    expect(helpers.traceObjectDetail(undefined, 'anUndefined'))
      .toMatchObject({
        index: 0,
        key: 'anUndefined',
        type: ['undefined'],
        value: [undefined],
        nullable: false,
        isReference: false,
        reference: null
      })
  })

  test('boolean type', () => {
    expect(helpers.traceObjectDetail(true, 'aBoolean'))
      .toMatchObject({
        index: 0,
        key: 'aBoolean',
        type: ['boolean'],
        value: [true],
        nullable: false,
        isReference: false,
        reference: null
      })
  })

  test('number type', () => {
    expect(helpers.traceObjectDetail(34, 'aNumber'))
      .toMatchObject({
        index: 0,
        key: 'aNumber',
        type: ['number'],
        value: [34],
        nullable: false,
        isReference: false,
        reference: null
      })
  })

  test('string type', () => {
    expect(helpers.traceObjectDetail('someString', 'aString'))
      .toMatchObject({
        index: 0,
        key: 'aString',
        type: ['string'],
        value: ['someString'],
        nullable: false,
        isReference: false,
        reference: null
      })
  })

  test('bigint type', () => {
    expect(helpers.traceObjectDetail(9007199254740992n, 'aBigInt'))
      .toMatchObject({
        index: 0,
        key: 'aBigInt',
        type: ['bigint'],
        value: [9007199254740992n],
        nullable: false,
        isReference: false,
        reference: null
      })
  })

  test('symbol type', () => {
    const sym1 = Symbol('sym')
    expect(helpers.traceObjectDetail(sym1, 'aSymbol'))
      .toMatchObject({
        index: 0,
        key: 'aSymbol',
        type: ['symbol'],
        value: [sym1],
        nullable: false,
        isReference: false,
        reference: null
      })
  })

  test('null type', () => {
    expect(helpers.traceObjectDetail(null, 'aNull'))
      .toMatchObject({
        index: 0,
        key: 'aNull',
        type: [],
        value: [null],
        nullable: true,
        isReference: false,
        reference: null
      })
  })

  test('object type', () => {
    const someObject = { item: 'something' }
    expect(helpers.traceObjectDetail(someObject, 'anObject'))
      .toMatchObject({
        index: 0,
        key: 'anObject',
        type: ['object'],
        value: [someObject],
        nullable: false,
        isReference: true,
        reference: null
      })

    const dateObject = new Date()
    expect(helpers.traceObjectDetail(dateObject, 'aDate'))
      .toMatchObject({
        index: 0,
        key: 'aDate',
        type: ['object'],
        value: [dateObject],
        nullable: false,
        isReference: true,
        reference: null
      })

    const someArray = ['a', 'b', 'c']
    expect(helpers.traceObjectDetail(someArray, 'anArray'))
      .toMatchObject({
        index: 0,
        key: 'anArray',
        type: ['object'],
        value: [someArray],
        nullable: false,
        isReference: true,
        reference: null
      })
  })

  test('function type', () => {
    const someFunction = () => true
    expect(helpers.traceObjectDetail(someFunction, 'aFunction'))
      .toMatchObject({
        index: 0,
        key: 'aFunction',
        type: ['function'],
        value: [someFunction],
        nullable: false,
        isReference: false,
        reference: null
      })
  })
})

describe('traceObject', () => {
  test('produces a simple trace of an object', () => {
    const someItem = { aString: 'someString', aNumber: 34, aBoolean: true, aNull: null, anUndefined: undefined }
    const trace = helpers.traceObject(someItem)
    expect(trace.details[0]).toMatchObject({
      index: 0,
      key: 'aString',
      type: ['string'],
      value: ['someString'],
      nullable: false,
      isReference: false,
      reference: null
    })
    expect(trace.details[1]).toMatchObject({
      index: 1,
      key: 'aNumber',
      type: ['number'],
      value: [34],
      nullable: false,
      isReference: false,
      reference: null
    })
    expect(trace.details[2]).toMatchObject({
      index: 2,
      key: 'aBoolean',
      type: ['boolean'],
      value: [true],
      nullable: false,
      isReference: false,
      reference: null
    })
    expect(trace.details[3]).toMatchObject({
      index: 3,
      key: 'aNull',
      type: [],
      value: [null],
      nullable: true,
      isReference: false,
      reference: null
    })
    expect(trace.details[4]).toMatchObject({
      index: 4,
      key: 'anUndefined',
      type: ['undefined'],
      value: [undefined],
      nullable: false,
      isReference: false,
      reference: null
    })
    expect(trace.length).toBe(5)
    expect(trace.keys).toStrictEqual(['aString', 'aNumber', 'aBoolean', 'aNull', 'anUndefined'])
    expect(trace.types).toStrictEqual([['string'], ['number'], ['boolean'], [], ['undefined']])
    expect(trace.references).toStrictEqual([])
    expect(trace.complete).toBe(true)
    expect(trace.isArray).toBe(false)
  })

  test('produces a simple trace of an array', () => {
    const someItem = ['someString', 34, true, null, undefined]
    const trace = helpers.traceObject(someItem)
    expect(trace.details[0]).toMatchObject({
      index: 0,
      key: 0,
      type: ['string', 'number', 'boolean', 'undefined'],
      value: ['someString', 34, true, null, undefined],
      nullable: true,
      isReference: false,
      reference: null
    })
    expect(trace.length).toBe(5)
    expect(trace.keys).toStrictEqual([0])
    expect(trace.types).toStrictEqual([['string', 'number', 'boolean', 'undefined']])
    expect(trace.references).toStrictEqual([])
    expect(trace.complete).toBe(true)
    expect(trace.isArray).toBe(true)
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
