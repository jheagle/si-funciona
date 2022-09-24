import dotSet from './dotSet'
import {
  circularObject,
  deepReferenceObject, multiReferenceObject
} from 'js-build-tools/dist/testHelpers'

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