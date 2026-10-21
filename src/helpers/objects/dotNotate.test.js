import dotNotate from './dotNotate'
import {
  circularObject,
  deepReferenceObject
} from 'test-filesystem'

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
      name: 'someName',
      age: 12,
      'array.0': 'someString',
      'array.1': 'anotherString'
    })
  })

  test('keeps an empty object/array as its own leaf, rather than silently dropping its key', () => {
    expect(dotNotate({ a: {}, b: [], c: 'd' })).toEqual({ a: {}, b: [], c: 'd' })
  })

  test('describes a circular object', () => {
    const result = dotNotate(circularObject, ['parent', 'body', 'head'])
    const resultKeys = Object.keys(result)
    expect(resultKeys.length).toBe(20)
    expect(resultKeys).toEqual([
      'name',
      'parent',
      'body',
      'head',
      'children.0.name',
      'children.0.parent',
      'children.0.children.0.name',
      'children.0.children.0.parent',
      'children.0.children.0.children',
      'children.0.children.1.name',
      'children.0.children.1.parent',
      'children.0.children.1.children',
      'children.1.name',
      'children.1.parent',
      'children.1.children.0.name',
      'children.1.children.0.parent',
      'children.1.children.0.children',
      'children.1.children.1.name',
      'children.1.children.1.parent',
      'children.1.children.1.children'
    ])
  })

  test('describes an object with varying deeply nested properties', () => {
    expect(dotNotate(deepReferenceObject)).toEqual({
      'object1.name': 'someName',
      'object1.object2.age': 12,
      'object1.object2.array1.0': 'someString',
      'object1.object2.array1.1': 'anotherString',
      'object1.array2.0': 89,
      'object1.array2.1': 32,
      title: 'Some Title',
      item: 45
    })
  })

  test('keeps the keys listed in retainObjects as objects', () => {
    expect(dotNotate({ a: { b: { c: 1 } }, d: { e: 2 } }, ['a.b'])).toEqual({
      'a.b': { c: 1 },
      'd.e': 2
    })
  })

  test('treats every dot in a retained key literally, not as a regex wildcard', () => {
    expect(dotNotate({ a: { bXc: { d: 1 }, b: { c: { d: 2 } } } }, ['a.b.c'])).toEqual({
      'a.bXc.d': 1,
      'a.b.c': { d: 2 }
    })
  })
})
