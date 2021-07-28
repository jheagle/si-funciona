import describeObject from '../../src/helpers/descriptors/describeObject'
import descriptorSample from '../../src/helpers/descriptors/samples/descriptor'

describe('describeObject', () => {
  test('will create empty object description', () => {
    expect(describeObject({}))
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
    expect(describeObject([]))
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
    expect(describeObject({ keyName: '' }))
      .toEqual(descriptorSample)
  })

  test('produces a simple descriptor of an object', () => {
    const someItem = { aString: 'someString', aNumber: 34, aBoolean: true, aNull: null, anUndefined: undefined }
    const descriptor = describeObject(someItem)
    expect(descriptor.details[0]).toEqual({
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
    expect(descriptor.details[1]).toEqual({
      index: 1,
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
    expect(descriptor.details[2]).toEqual({
      index: 2,
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
    expect(descriptor.details[3]).toEqual({
      index: 3,
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
    expect(descriptor.details[4]).toEqual({
      index: 4,
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
    expect(descriptor.length).toBe(5)
    expect(descriptor.references).toStrictEqual([])
    expect(descriptor.complete).toBe(true)
    expect(descriptor.isArray).toBe(false)
  })

  test('produces a simple descriptor of an array', () => {
    const someItem = ['someString', 34, true, null, undefined]
    const descriptor = describeObject(someItem)
    expect(descriptor.details[0]).toEqual({
      index: 0,
      key: 0,
      type: ['string', 'number', 'boolean', 'object', 'undefined'],
      value: ['someString', 34, true, null, undefined],
      nullable: true,
      optional: false,
      circular: false,
      isReference: false,
      isInstance: false,
      arrayReference: null,
      objectReference: null
    })
    expect(descriptor.length).toBe(5)
    expect(descriptor.references).toStrictEqual([])
    expect(descriptor.complete).toBe(true)
    expect(descriptor.isArray).toBe(true)
  })
})
