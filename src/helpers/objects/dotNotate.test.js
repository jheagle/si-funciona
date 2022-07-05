import dotNotate from './dotNotate'
import {
  circularObject,
  deepReferenceObject
} from '../../../testHelpers'

describe('dotNotate', () => {
  test('describes a simple object', () => {
    const simpleObject = {
      name: 'someName',
      age: 12,
      array: [
        'someString',
        'anotherString'
      ]
    }
    expect(dotNotate(simpleObject)).toEqual({
      'name': 'someName',
      'age': 12,
      'array.0': 'someString',
      'array.1': 'anotherString'
    })
  })

  test('describes a circular object', () => {
    const result = dotNotate(circularObject)
    expect(Object.keys(result).length).toBe(166)
  })

  test('describes an object with varying deeply nested properties', () => {
    expect(dotNotate(deepReferenceObject)).toEqual({
      'object1.name': 'someName',
      'object1.object2.age': 12,
      'object1.object2.array1.0': 'someString',
      'object1.object2.array1.1': 'anotherString',
      'object1.array2.0': 89,
      'object1.array2.1': 32,
      'title': 'Some Title',
      'item': 45,
    })
  })
})