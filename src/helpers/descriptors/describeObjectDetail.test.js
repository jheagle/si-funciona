import describeObjectDetail from './describeObjectDetail'
import descriptorDetailSample from './samples/descriptorDetail'

describe('describeObjectDetail generates detail for', () => {
  test('undefined type', () => {
    expect(describeObjectDetail(undefined, 'anUndefined'))
      .toEqual({
        index: 0,
        key: 'anUndefined',
        type: ['undefined'],
        value: [undefined],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        isInstance: false,
        arrayReference: null,
        objectReference: null
      })
  })

  test('boolean type', () => {
    expect(describeObjectDetail(true, 'aBoolean'))
      .toEqual({
        index: 0,
        key: 'aBoolean',
        type: ['boolean'],
        value: [true],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        isInstance: false,
        arrayReference: null,
        objectReference: null
      })
  })

  test('number type', () => {
    expect(describeObjectDetail(34, 'aNumber'))
      .toEqual({
        index: 0,
        key: 'aNumber',
        type: ['number'],
        value: [34],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        isInstance: false,
        arrayReference: null,
        objectReference: null
      })
  })

  test('string type', () => {
    expect(describeObjectDetail('someString', 'aString'))
      .toEqual({
        index: 0,
        key: 'aString',
        type: ['string'],
        value: ['someString'],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        isInstance: false,
        arrayReference: null,
        objectReference: null
      })
  })

  test('bigint type', () => {
    expect(describeObjectDetail(9007199254740992n, 'aBigInt'))
      .toEqual({
        index: 0,
        key: 'aBigInt',
        type: ['bigint'],
        value: [9007199254740992n],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        isInstance: false,
        arrayReference: null,
        objectReference: null
      })
  })

  test('symbol type', () => {
    const sym1 = Symbol('sym')
    expect(describeObjectDetail(sym1, 'aSymbol'))
      .toEqual({
        index: 0,
        key: 'aSymbol',
        type: ['symbol'],
        value: [sym1],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        isInstance: false,
        arrayReference: null,
        objectReference: null
      })
  })

  test('null type', () => {
    expect(describeObjectDetail(null, 'aNull'))
      .toEqual({
        index: 0,
        key: 'aNull',
        type: ['object'],
        value: [null],
        nullable: true,
        optional: false,
        circular: false,
        isReference: false,
        isInstance: false,
        arrayReference: null,
        objectReference: null
      })
  })

  test('object type', () => {
    const someObject = { item: 'something' }
    expect(describeObjectDetail(someObject, 'anObject'))
      .toEqual({
        index: 0,
        key: 'anObject',
        type: ['object'],
        value: [someObject],
        nullable: false,
        optional: false,
        circular: false,
        isReference: true,
        isInstance: false,
        arrayReference: null,
        objectReference: null
      })

    const someArray = ['a', 'b', 'c']
    expect(describeObjectDetail(someArray, 'anArray'))
      .toEqual({
        index: 0,
        key: 'anArray',
        type: ['object'],
        value: [someArray],
        nullable: false,
        optional: false,
        circular: false,
        isReference: true,
        isInstance: false,
        arrayReference: null,
        objectReference: null
      })
  })

  test('function type', () => {
    const someFunction = () => true
    expect(describeObjectDetail(someFunction, 'aFunction'))
      .toEqual({
        index: 0,
        key: 'aFunction',
        type: ['function'],
        value: [someFunction],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        isInstance: true,
        arrayReference: null,
        objectReference: null
      })
  })

  test('sample object detail with string', () => {
    expect(describeObjectDetail('', 'keyName'))
      .toEqual(descriptorDetailSample)
  })

  test('sample object detail with class instance object', () => {
    const dateObject = new Date()
    expect(describeObjectDetail(dateObject, 'aDate'))
      .toEqual({
        index: 0,
        key: 'aDate',
        type: ['object'],
        value: [dateObject],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        isInstance: true,
        arrayReference: null,
        objectReference: null
      })
  })

  test('sample object detail with created instance object', () => {
    const someObject = { item: 'something' }
    const newObject = Object.create(someObject)
    expect(describeObjectDetail(newObject, 'anObject'))
      .toEqual({
        index: 0,
        key: 'anObject',
        type: ['object'],
        value: [newObject],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        isInstance: true,
        arrayReference: null,
        objectReference: null
      })
  })
})
