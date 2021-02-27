import * as helpers from '../dist/helpers/objects'
import { deepReferenceObject, domItem, jsonDom, linkedList, multiReferenceObject, nodeTree, circularObject } from './testHelpers'

describe('setValue', () => {
  test('will update an item and return the item', () => {
    const someObject = {
      firstProp: null,
      secondProp: 'something here'
    }
    const updateObject1 = helpers.setValue('firstProp', { newValue: 'some value' }, someObject)
    const updateObject2 = helpers.setValue('secondProp', 'a new thing here', updateObject1)
    expect(updateObject2).toEqual({ firstProp: { newValue: 'some value' }, secondProp: 'a new thing here' })
  })
})

describe('setAndReturnValue', () => {
  test('will update an item and return the value', () => {
    const someObject = {
      firstProp: null,
      secondProp: 'something here'
    }
    const firstValue = helpers.setAndReturnValue(someObject, 'firstProp', { newValue: 'some value' })
    expect(firstValue).toEqual({ newValue: 'some value' })
    const secondValue = helpers.setAndReturnValue(someObject, 'secondProp', 'a new thing here')
    expect(secondValue).toEqual('a new thing here')
  })
})

describe('objectKeys', () => {
  test('can get all keys from an object', () => {
    const someObject = { one: 'first', two: 'second' }
    expect(helpers.objectKeys(someObject)).toEqual(['one', 'two'])
  })

  test('can will skip inherited keys when flag not set', () => {
    const someObject = { one: 'first', two: 'second' }
    const newObject = Object.create(someObject)
    expect(helpers.objectKeys(newObject).length).toBe(0)
  })

  test('can will include inherited keys when flag is set', () => {
    const someObject = { one: 'first', two: 'second' }
    const newObject = Object.create(someObject)
    expect(helpers.objectKeys(newObject, true)).toEqual(['one', 'two'])
  })

  test('will get numeric keys from array', () => {
    const someArray = ['first', 'second']
    expect(helpers.objectKeys(someArray)).toEqual([0, 1])
  })

  test('will also get length property when inherited flag is set', () => {
    const someArray = ['first', 'second']
    expect(helpers.objectKeys(someArray, true)).toEqual(['0', '1', 'length'])
  })
})

describe('objectValues', () => {
  test('can get all values from an object', () => {
    const someObject = { one: 'first', two: 'second' }
    expect(helpers.objectValues(someObject)).toEqual(['first', 'second'])
  })

  test('can will skip inherited values when flag not set', () => {
    const someObject = { one: 'first', two: 'second' }
    const newObject = Object.create(someObject)
    expect(helpers.objectValues(newObject).length).toBe(0)
  })

  test('can will include inherited values when flag is set', () => {
    const someObject = { one: 'first', two: 'second' }
    const newObject = Object.create(someObject)
    expect(helpers.objectValues(newObject, true)).toEqual(['first', 'second'])
  })

  test('will get values from array', () => {
    const someArray = ['first', 'second']
    expect(helpers.objectValues(someArray)).toEqual(['first', 'second'])
  })

  test('will also retrieve the length value from the array when inherited flag is set', () => {
    const someArray = ['first', 'second']
    expect(helpers.objectValues(someArray, true)).toEqual(['first', 'second', 2])
  })
})

describe('mapObject', () => {
  const mapNameToNumber = name => ({ zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5 })[name]
  test('Behaves exactly as Array.map when the input is an array', () => {
    const testArray = ['zero', 'one', 'two', 'three', 'four', 'five']
    expect(helpers.mapObject(testArray, mapNameToNumber)).toEqual(testArray.map(mapNameToNumber))
  })

  test('Will apply the callback to each of the object values', () => {
    const testObject = { zeroth: 'zero', first: 'one', second: 'two', third: 'three', fourth: 'four', fifth: 'five' }
    expect(helpers.mapObject(testObject, mapNameToNumber)).toEqual({ zeroth: 0, first: 1, second: 2, third: 3, fourth: 4, fifth: 5 })
  })

  test('Will use this argument for callback', () => {
    class NumberClass {
      constructor (add, subtract) {
        this.add = add
        this.subtract = subtract
      }

      applyToNumber (number) {
        return number + this.add - this.subtract
      }
    }
    const numberInstance = new NumberClass(5, 2)
    expect(helpers.mapObject(
      { first: 1, second: 2, third: 3, fourth: 4, fifth: 5 },
      numberInstance.applyToNumber,
      numberInstance
    )).toEqual({ first: 4, second: 5, third: 6, fourth: 7, fifth: 8 })
  })
})

describe('filterObject', () => {
  const testFunction = value => (value % 2) === 0
  test('will use Array.filter when input is array', () => {
    const testArray = [1, 2, 3, 4, 5]
    expect(helpers.filterObject(testArray, testFunction))
      .toEqual(testArray.filter(testFunction))
  })

  test('applies function to exclude some values', () => {
    const testObject = { first: 1, second: 2, third: 3, fourth: 4, fifth: 5 }
    expect(helpers.filterObject(testObject, testFunction))
      .toEqual({ second: 2, fourth: 4 })
  })
})

describe('reduceObject', () => {
  const testFunction = (summation, value) => summation + value
  test('will use Array.reduce when input is array', () => {
    const testArray = [1, 2, 3, 4, 5]
    expect(helpers.reduceObject(testArray, testFunction, 0)).toEqual(testArray.reduce(testFunction))
  })

  test('applies function to create something new from the object', () => {
    const testObject = { first: 1, second: 2, third: 3, fourth: 4, fifth: 5 }
    expect(helpers.reduceObject(testObject, testFunction, 0)).toEqual(15)
  })
})

describe('emptyObject', () => {
  test('returns correct boolean for object and array check', () => {
    const testObjectEmpty = {}
    expect(helpers.emptyObject(testObjectEmpty)).toBe(true)
    const testObjectFull = { first: 1, second: 2, third: 3, fourth: 4, fifth: 5 }
    expect(helpers.emptyObject(testObjectFull)).toBe(false)
    const testArrayEmpty = []
    expect(helpers.emptyObject(testArrayEmpty)).toBe(true)
    const testArrayFull = ['first', 'second', 'third', 'fourth', 'fifth']
    expect(helpers.emptyObject(testArrayFull)).toBe(false)
  })

  test('returns false for null', () => {
    const testNull = null
    expect(helpers.emptyObject(testNull)).toBe(false)
  })
})

describe('isInstanceObject', () => {
  test('standard object has no inherited properties', () => {
    const someObject = { one: 'first', two: 'second' }
    expect(helpers.isInstanceObject(someObject)).toBe(false)
  })

  test('created object from another object will have inherited properties', () => {
    const someObject = { one: 'first', two: 'second' }
    const newObject = Object.create(someObject)
    expect(helpers.isInstanceObject(newObject)).toBe(true)
  })

  test('declared class is an instance object', () => {
    class SampleClass {
      construct () {
        this.one = 'first'
        this.two = 'second'
      }
    }
    expect(helpers.isInstanceObject(SampleClass)).toBe(true)
  })

  test('instatiated object is an instance object', () => {
    class SampleClass {
      construct () {
        this.one = 'first'
        this.two = 'second'
      }
    }
    const newObject = new SampleClass()
    expect(helpers.isInstanceObject(newObject)).toBe(true)
  })

  test('arrays are not instance objects', () => {
    const someArray = ['first', 'second']
    expect(helpers.isInstanceObject(someArray)).toBe(false)
  })
})

describe('isCloneable', () => {
  test('a string is not a reference, no need to clone', () => {
    const someString = 'some string'
    expect(helpers.isCloneable(someString)).toBe(false)
  })

  test('a number is not a reference, no need to clone', () => {
    const someNumber = 1234
    expect(helpers.isCloneable(someNumber)).toBe(false)
  })

  test('standard object can be cloned', () => {
    const someObject = { one: 'first', two: 'second' }
    expect(helpers.isCloneable(someObject)).toBe(true)
  })

  test('created object cannot be cloned', () => {
    const someObject = { one: 'first', two: 'second' }
    const newObject = Object.create(someObject)
    expect(helpers.isCloneable(newObject)).toBe(false)
  })

  test('declared class cannot be cloned', () => {
    class SampleClass {
      construct () {
        this.one = 'first'
        this.two = 'second'
      }
    }
    expect(helpers.isCloneable(SampleClass)).toBe(false)
  })

  test('instatiated object cannot be cloned', () => {
    class SampleClass {
      construct () {
        this.one = 'first'
        this.two = 'second'
      }
    }
    const newObject = new SampleClass()
    expect(helpers.isCloneable(newObject)).toBe(false)
  })

  test('arrays are cloneable', () => {
    const someArray = ['first', 'second']
    expect(helpers.isCloneable(someArray)).toBe(true)
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

  test('will clone object with empty nested objects', () => {
    const result = helpers.cloneObject(jsonDom)
    expect(result).not.toBe(jsonDom)
    expect(result).toEqual(jsonDom)
  })

  test('will clone DOM Item', () => {
    const result = helpers.cloneObject(domItem)
    expect(result).not.toBe(domItem)
    expect(result).toEqual(domItem)
  })

  test('will successfully clone linked list', () => {
    const result = helpers.cloneObject(linkedList)
    expect(result).not.toBe(linkedList)
    expect(result).toEqual(linkedList)
  })

  test('will successfully clone circular references', () => {
    const result = helpers.cloneObject(nodeTree)
    expect(result).not.toBe(nodeTree)
    expect(result).toEqual(nodeTree)
  })

  test('will successfully clone deep reference object', () => {
    const result = helpers.cloneObject(deepReferenceObject)
    expect(result).not.toBe(deepReferenceObject)
    expect(result).toEqual(deepReferenceObject)
  })

  test('can remove deep references with 0 depth option', () => {
    const result = helpers.cloneObject(deepReferenceObject, { depthLimit: 0 })
    expect(result).toMatchObject({
      object1: {},
      title: 'Some Title',
      item: 45
    })
  })

  test('can remove references deeper than 1 with depth option', () => {
    const result = helpers.cloneObject(deepReferenceObject, { depthLimit: 1 })
    expect(result).toMatchObject({
      object1: { name: 'someName', object2: {}, array2: [] },
      title: 'Some Title',
      item: 45
    })
  })

  test('can remove references deeper than 2 with depth option', () => {
    const result = helpers.cloneObject(deepReferenceObject, { depthLimit: 2 })
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

  test('can remove references deeper than 3 with depth option, this is the max depth', () => {
    const result = helpers.cloneObject(deepReferenceObject, { depthLimit: 3 })
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

  test('can limit depth of circular references, using 0', () => {
    const result = helpers.cloneObject(circularObject, { depthLimit: 0 })
    expect(result).toMatchObject({ name: 'root', parent: {}, body: {}, head: {}, children: [] })
  })

  test('can limit depth of circular references, using 1', () => {
    const result = helpers.cloneObject(circularObject, { depthLimit: 1 })
    const expectResult = { name: 'root', parent: {}, body: {}, head: {}, children: [] }
    expectResult.body = { name: 'body', parent: expectResult, children: [] }
    expectResult.head = { name: 'head', parent: expectResult, children: [] }
    expectResult.children = [expectResult.body, expectResult.head]
    expect(result).toEqual(expectResult)
  })

  test('can limit depth of circular references, using 2', () => {
    const result = helpers.cloneObject(circularObject, { depthLimit: 2 })
    const expectResult = { name: 'root', parent: {}, body: {}, head: {}, children: [] }
    expectResult.body = { name: 'body', parent: expectResult, children: [{}, {}] }
    expectResult.head = { name: 'head', parent: expectResult, children: [{}, {}] }
    expectResult.children = [expectResult.body, expectResult.head]
    expect(result).toEqual(expectResult)
  })

  test('can limit depth of circular references, using 3', () => {
    const result = helpers.cloneObject(circularObject, { depthLimit: 3 })
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
    const result = helpers.cloneObject(multiReferenceObject, { mapLimit: 1 })
    expect(result).not.toBe(multiReferenceObject)
    expect(result).toStrictEqual(multiReferenceObject)
  })

  test('can limit length of map for deep references', () => {
    const result = helpers.cloneObject(deepReferenceObject, { mapLimit: 1 })
    expect(result).not.toBe(deepReferenceObject)
    expect(result).toStrictEqual(deepReferenceObject)
  })

  test('will be able to clone created object instance', () => {
    const instanceObject = { one: 'first', instance: Object.create({ two: 'second' }) }
    const result = helpers.cloneObject(instanceObject)
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
    const result = helpers.cloneObject(instanceObject)
    expect(result).not.toBe(instanceObject)
    expect(result).toStrictEqual(instanceObject)
    expect(result.instance).toBe(instanceObject.instance)
  })
})

describe('mergeObjects', () => {
  test('combines two objects into one new object', () => {
    const someItem = { name: 'something', number: 5, nested: { value: 'aValue' }, anArray: [1, 2, 3] }
    const secondItem = { name: 'different', key: 'someKey' }
    const newItem = helpers.mergeObjects({}, someItem, secondItem)
    expect(newItem).not.toBe(someItem)
    expect(newItem).toEqual({ name: 'different', number: 5, nested: { value: 'aValue' }, anArray: [1, 2, 3], key: 'someKey' })
  })

  test('combines multiple objects into one new object', () => {
    const someItem = { name: 'something', anArray: [1, 2, 3] }
    const secondItem = { number: 10, nested: { value: 'aValue' } }
    const thirdItem = { number: 5, anArray: [2, 3, 4, 5, 6, 7] }
    const fourthItem = { name: 'different', key: 'someKey' }
    const newItem = helpers.mergeObjects({}, someItem, secondItem, thirdItem, fourthItem)
    expect(newItem).not.toBe(someItem)
    expect(newItem.nested).not.toBe(secondItem.nested)
    expect(newItem).toEqual({ name: 'different', number: 5, nested: { value: 'aValue' }, anArray: [1, 2, 3, 4, 5, 6, 7], key: 'someKey' })
  })

  test('combine objects with circular references', () => {
    const anotherCircular = { name: 'root', parent: {}, body: {}, head: {}, children: [] }
    anotherCircular.children = [
      { name: 'body', parent: {}, children: [] },
      { name: 'head', parent: {}, children: [] }
    ]
    anotherCircular.body = anotherCircular.children[0]
    anotherCircular.head = anotherCircular.children[1]
    anotherCircular.body.parent = anotherCircular
    anotherCircular.head.parent = anotherCircular
    anotherCircular.body.children = [
      { name: 'body child one', parent: {}, children: [] }
    ]
    anotherCircular.body.children[0].parent = anotherCircular.body
    anotherCircular.head.children = []
    const newItem = helpers.mergeObjects(anotherCircular, circularObject)
    expect(newItem).toEqual(circularObject)
  })

  test('combining dom items', () => {
    const children = [
      {
        tagName: 'body',
        attributes: {},
        element: document.body,
        children: []
      },
      {
        tagName: 'head',
        attributes: {},
        element: document.head,
        children: []
      }
    ]
    const template = {
      tagName: 'div',
      attributes: {
        style: {}
      },
      element: document,
      eventListeners: {},
      parentItem: {},
      children: []
    }
    const newAttributes = {
      body: children[0],
      children: children,
      head: children[1],
      tagName: 'html'
    }
    const result = helpers.mergeObjects(template, newAttributes)
    const expectedResult = {
      tagName: 'html',
      attributes: { style: {} },
      element: document,
      eventListeners: {},
      parentItem: {},
      children: [],
      body: {
        tagName: 'body',
        attributes: {},
        element: document.body,
        children: []
      },
      head: {
        tagName: 'head',
        attributes: {},
        element: document.head,
        children: []
      }
    }
    expectedResult.children[0] = expectedResult.body
    expectedResult.children[1] = expectedResult.head
    expect(result).toEqual(expectedResult)
  })

  test('add large reference onto attribute of first object, with circular references', () => {
    const children = [
      {
        tagName: 'body',
        parentItem: {},
        children: []
      },
      {
        tagName: 'head',
        parentItem: {},
        children: []
      }
    ]
    const newAttributes = {
      parentItem: {
        tagName: 'html',
        body: children[0],
        head: children[1],
        parentItem: {},
        children: children
      }
    }
    const result = helpers.mergeObjects(children[1], newAttributes)
    const expectedResult = {
      tagName: 'head',
      parentItem: {
        tagName: 'html',
        body: {
          tagName: 'body',
          parentItem: {},
          children: []
        },
        parentItem: {},
        children: []
      },
      children: []
    }
    expectedResult.parentItem.head = expectedResult
    expectedResult.parentItem.children[0] = expectedResult.parentItem.body
    expectedResult.parentItem.children[1] = expectedResult.parentItem.head
    expect(result).toEqual(expectedResult)
  })

  test('maintains first object when second matching object is empty', () => {
    const children = [
      {
        attributes: {},
        children: [],
        element: document.head,
        eventListeners: {},
        parentItem: {},
        tagName: 'head'
      },
      {
        attributes: {},
        children: [],
        element: document.body,
        eventListeners: {},
        parentItem: {},
        tagName: 'body'
      }
    ]
    const rootItem = {
      attributes: {},
      body: children[1],
      children: children,
      element: document,
      eventListeners: [],
      head: children[0],
      parentItem: {},
      tagName: 'html'
    }

    rootItem.body.parentItem = rootItem
    rootItem.head.parentItem = rootItem
    rootItem.children[0].parentItem = rootItem
    rootItem.children[1].parentItem = rootItem

    const baseItem = {
      attributes: { style: {} },
      children: [],
      element: {},
      eventListeners: {},
      parentItem: {},
      tagName: 'div'
    }

    const result = helpers.mergeObjects(baseItem, rootItem)
    const expectedResult = rootItem
    expectedResult.attributes = baseItem.attributes
    expect(result).toEqual(expectedResult)
  })

  test('merge multiple objects', () => {
    const baseItem = {
      attributes: { style: {} },
      children: [],
      element: {},
      eventListeners: {},
      parentItem: {},
      tagName: 'div'
    }

    const children = [
      {
        attributes: {},
        children: [],
        element: document.head,
        eventListeners: {},
        parentItem: {},
        tagName: 'head'
      },
      {
        attributes: {},
        children: [],
        element: document.body,
        eventListeners: {},
        parentItem: {},
        tagName: 'body'
      }
    ]
    const attributes = []
    attributes[0] = {
      attributes: { style: {} },
      children: [],
      element: document.head,
      eventListeners: {},
      parentItem: {},
      tagName: 'head'
    }

    attributes[1] = {
      parentItem: {
        attributes: { style: {} },
        body: children[1],
        children: children,
        element: document,
        eventListeners: [],
        head: children[0],
        parentItem: {},
        tagName: 'html'
      }
    }

    const result = helpers.mergeObjects(baseItem, attributes[0], attributes[1])
    const expectedResult = {
      attributes: { style: {} },
      children: [],
      element: document.head,
      eventListeners: {},
      parentItem: {
        attributes: { style: {} },
        body: children[1],
        children: children,
        element: document,
        eventListeners: [],
        head: children[0],
        parentItem: {},
        tagName: 'html'
      },
      tagName: 'head'
    }
    expectedResult.parentItem.children[0] = expectedResult
    expectedResult.parentItem.head = expectedResult
    expect(result).toEqual(expectedResult)
  })
})
