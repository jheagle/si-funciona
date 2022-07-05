import dotGet from './dotGet'
import {
  circularObject,
  deepReferenceObject
} from '../../../testHelpers'

describe('dotGet', () => {
  test('retrieve a value at level 0 of the object', () => {
    expect(dotGet(deepReferenceObject, 'object1')).toBe(deepReferenceObject.object1)
  })

  test('get null or default if property does not exist', () => {
    expect(dotGet(deepReferenceObject, 'fake')).toBeNull()
    const defaultValue = 'test'
    expect(dotGet(deepReferenceObject, 'fake', defaultValue)).toBe(defaultValue)
  })

  test('get value from array', () => {
    expect(dotGet(deepReferenceObject, 'object1.array2.0')).toBe(deepReferenceObject.object1.array2[0])
  })

  test('use wildcard to get all results', () => {
    expect(dotGet(circularObject, 'children.*.name')).toEqual(['body', 'head'])
  })

  test('nested wildcard', () => {
    expect(dotGet(circularObject, 'children.*.children.*.name')).toEqual([
      ['body child one', 'body child two'],
      ['head child one', 'head child two']
    ])
  })
})