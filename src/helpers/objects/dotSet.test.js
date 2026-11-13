import dotSet from './dotSet'
import {
  circularObject,
  deepReferenceObject, multiReferenceObject
} from 'test-filesystem'

describe('dotSet', () => {
  test('set a value at level 0 of the object', () => {
    const setValue = 'test'
    dotSet(multiReferenceObject, 'object1', setValue)
    expect(multiReferenceObject.object1).toBe(setValue)
  })

  test('set null on new property', () => {
    const setValue = null
    dotSet(deepReferenceObject, 'fake', setValue)
    expect(deepReferenceObject.fake).toBeNull()
  })

  test('set value on array', () => {
    const setValue = 'test'
    dotSet(deepReferenceObject, 'object1.array2.0', setValue)
    expect(deepReferenceObject.object1.array2[0]).toBe(setValue)
  })

  test('creates a missing parent as a plain object for a named key', () => {
    const result = dotSet({}, 'group.setting', 'value')
    expect(Array.isArray(result.group)).toBe(false)
    expect(result).toEqual({ group: { setting: 'value' } })
    expect(JSON.stringify(result)).toEqual('{"group":{"setting":"value"}}')
  })

  test('creates missing parents several levels deep as plain objects', () => {
    expect(dotSet({}, 'a.b.c', 1)).toEqual({ a: { b: { c: 1 } } })
  })

  test('creates a missing parent as an array for an index key', () => {
    const result = dotSet({}, 'list.0', 'first')
    expect(Array.isArray(result.list)).toBe(true)
    expect(result).toEqual({ list: ['first'] })
    expect(dotSet({}, 'list.0.name', 'x')).toEqual({ list: [{ name: 'x' }] })
  })

  test('use wildcard to get all results', () => {
    const setValue = 'test'
    dotSet(circularObject, 'children.*.name', setValue)
    expect(circularObject.children[0].name).toBe(setValue)
    expect(circularObject.children[1].name).toBe(setValue)
  })

  test('nested wildcard', () => {
    const setValue = 'test nested'
    dotSet(circularObject, 'children.*.children.*.name', setValue)
    expect(circularObject.children[0].children[0].name).toBe(setValue)
    expect(circularObject.children[0].children[1].name).toBe(setValue)
    expect(circularObject.children[1].children[0].name).toBe(setValue)
    expect(circularObject.children[1].children[1].name).toBe(setValue)
  })
})
