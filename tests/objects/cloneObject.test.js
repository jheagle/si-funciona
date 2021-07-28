/**
 * @jest-environment jsdom
 */

import cloneObject from '../../src/helpers/objects/cloneObject'
import {
  circularObject,
  deepReferenceObject,
  domItem,
  jsonDom,
  linkedList,
  multiReferenceObject,
  nodeTree
} from '../testHelpers'

describe('cloneObject', () => {
  test('produces a new copy of an object, changes to one object will not affect the original', () => {
    const someItem = { name: 'something' }
    const referenceItem = someItem
    expect(referenceItem).toBe(someItem)
    const result = cloneObject(someItem)
    expect(result).not.toBe(someItem)
    someItem.name = 'different'
    expect(referenceItem.name).toEqual('different')
    expect(result.name).toEqual('something')
  })

  test('can create new object from existing object with nested object', () => {
    const someItem = {
      name: 'something',
      nested: { value: 'aValue' },
      nested2: { nestedDeep: { nestedValue: 'bValue' } }
    }
    const result = cloneObject(someItem)
    expect(result).not.toBe(someItem)
    someItem.name = 'different'
    someItem.nested.value = 'cValue'
    someItem.nested2.nestedDeep.nestedValue = 'dValue'
    expect(result.name).toEqual('something')
    expect(result.nested.value).toEqual('aValue')
    expect(result.nested2.nestedDeep.nestedValue).toEqual('bValue')
  })

  test('will clone object with empty nested objects', () => {
    const result = cloneObject(jsonDom)
    expect(result).not.toBe(jsonDom)
    expect(result).toEqual(jsonDom)
  })

  test('will clone DOM Item', () => {
    const result = cloneObject(domItem)
    expect(result).not.toBe(domItem)
    expect(result).toEqual(domItem)
  })

  test('will successfully clone linked list', () => {
    const result = cloneObject(linkedList)
    expect(result).not.toBe(linkedList)
    expect(result).toEqual(linkedList)
  })

  test('will successfully clone circular references', () => {
    const result = cloneObject(nodeTree)
    expect(result).not.toBe(nodeTree)
    expect(result).toEqual(nodeTree)
  })

  test('will successfully clone deep reference object', () => {
    const result = cloneObject(deepReferenceObject)
    expect(result).not.toBe(deepReferenceObject)
    expect(result).toEqual(deepReferenceObject)
  })

  test('can remove all references with 0 depth option', () => {
    const result = cloneObject(deepReferenceObject, { depthLimit: 0 })
    expect(result).toMatchObject({})
  })

  test('can remove deep references with 1 depth option', () => {
    const result = cloneObject(deepReferenceObject, { depthLimit: 1 })
    expect(result).toMatchObject({
      object1: {},
      title: 'Some Title',
      item: 45
    })
  })

  test('can remove references deeper than 2 with depth option', () => {
    const result = cloneObject(deepReferenceObject, { depthLimit: 2 })
    expect(result).toMatchObject({
      object1: { name: 'someName', object2: {}, array2: [] },
      title: 'Some Title',
      item: 45
    })
  })

  test('can remove references deeper than 3 with depth option', () => {
    const result = cloneObject(deepReferenceObject, { depthLimit: 3 })
    expect(result).toMatchObject({
      object1: {
        name: 'someName',
        object2: { age: 12, array1: [] },
        array2: [89, 32]
      },
      title: 'Some Title',
      item: 45
    })
  })

  test('can remove references deeper than 4 with depth option, this is the max depth', () => {
    const result = cloneObject(deepReferenceObject, { depthLimit: 4 })
    expect(result).toMatchObject({
      object1: {
        name: 'someName',
        object2: { age: 12, array1: ['someString', 'anotherString'] },
        array2: [89, 32]
      },
      title: 'Some Title',
      item: 45
    })
  })

  test('can limit depth of circular references, using 1', () => {
    const result = cloneObject(circularObject, { depthLimit: 1 })
    expect(result).toMatchObject({ name: 'root', parent: {}, body: {}, head: {}, children: [] })
  })

  test('can limit depth of circular references, using 2', () => {
    const result = cloneObject(circularObject, { depthLimit: 2 })
    const expectResult = { name: 'root', parent: {}, body: {}, head: {}, children: [] }
    expectResult.body = { name: 'body', parent: expectResult, children: [] }
    expectResult.head = { name: 'head', parent: expectResult, children: [] }
    expectResult.children = [expectResult.body, expectResult.head]
    expect(result).toEqual(expectResult)
  })

  test('can limit depth of circular references, using 3', () => {
    const result = cloneObject(circularObject, { depthLimit: 3 })
    const expectResult = { name: 'root', parent: {}, body: {}, head: {}, children: [] }
    expectResult.body = { name: 'body', parent: expectResult, children: [{}, {}] }
    expectResult.head = { name: 'head', parent: expectResult, children: [{}, {}] }
    expectResult.children = [expectResult.body, expectResult.head]
    expect(result).toEqual(expectResult)
  })

  test('can limit depth of circular references, using 4', () => {
    const result = cloneObject(circularObject, { depthLimit: 4 })
    const expectResult = { name: 'root', parent: {}, body: {}, head: {}, children: [] }
    expectResult.body = { name: 'body', parent: expectResult, children: [] }
    expectResult.head = { name: 'head', parent: expectResult, children: [] }
    expectResult.children = [expectResult.body, expectResult.head]
    expectResult.body.children = [
      { name: 'body child one', parent: expectResult.body, children: [] },
      { name: 'body child two', parent: expectResult.body, children: [] }
    ]
    expectResult.head.children = [
      { name: 'head child one', parent: expectResult.head, children: [] },
      { name: 'head child two', parent: expectResult.head, children: [] }
    ]
    expect(result).toEqual(expectResult)
  })

  test('can reduce length of map when it exceeds mapLimit', () => {
    const result = cloneObject(multiReferenceObject, { mapLimit: 1 })
    expect(result).not.toBe(multiReferenceObject)
    expect(result).toStrictEqual(multiReferenceObject)
  })

  test('can limit length of map for deep references', () => {
    const result = cloneObject(deepReferenceObject, { mapLimit: 1 })
    expect(result).not.toBe(deepReferenceObject)
    expect(result).toStrictEqual(deepReferenceObject)
  })

  test('will be able to clone created object instance', () => {
    const instanceObject = { one: 'first', instance: Object.create({ two: 'second' }) }
    const result = cloneObject(instanceObject)
    expect(result).not.toBe(instanceObject)
    expect(result).toStrictEqual(instanceObject)
    expect(result.instance).toBe(instanceObject.instance)
  })

  test('will use original nested instance in new clone', () => {
    class SomeObject {
      construct () {
        this.one = 'first'
        this.two = 'second'
      }
    }

    const instanceObject = { string: 'aString', instance: new SomeObject() }
    const result = cloneObject(instanceObject)
    expect(result).not.toBe(instanceObject)
    expect(result).toStrictEqual(instanceObject)
    expect(result.instance).toBe(instanceObject.instance)
  })
})
