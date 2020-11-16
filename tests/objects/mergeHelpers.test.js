import * as helpers from '../../src/helpers/objects/mergeHelpers'
import { createReferenceIdentifier, findObjectReferences, findReferenceKeys, objectAndReferences } from '../../dist/helpers/objects/cloneHelpers'
import { logObject, circularObject, linkedList } from '../testHelpers'

describe.skip('mergeNonReferences', () => {
  test('stores object and references array provided', () => {
    const testObject1 = { one: 1, two: 2, three: 3 }
    const testObject2 = { four: 4, five: 5, six: 6 }
    const testReferences1 = ['one', 'two', 'three']
    const testReferences2 = ['four', 'five', 'six']
    const dualObjAndRefs = helpers.dualObjectAndReferences(
      objectAndReferences(testObject1, testReferences1),
      objectAndReferences(testObject2, testReferences2)
    )
    expect(dualObjAndRefs.object1).toMatchObject({
      object: testObject1,
      references: testReferences1
    })
    expect(dualObjAndRefs.object2).toMatchObject({
      object: testObject2,
      references: testReferences2
    })
  })
})

describe('mergeReferences', () => {
  const buildReferenceMap = (object, limit) => {
    const referenceMap = [
      createReferenceIdentifier(object, 0)
    ]
    for (let i = 0; i < limit; ++i) {
      referenceMap[i] = findObjectReferences(referenceMap[i])
      referenceMap[i] = findReferenceKeys(referenceMap, i)
      referenceMap[i].merged = false
    }
    return referenceMap
  }

  test('will return without changes when either of the zero indexed identifiers are not complete', () => {
    let firstMap = buildReferenceMap(circularObject, 0)
    let secondMap = buildReferenceMap(circularObject, 0)
    expect(firstMap[0].object).toBe(null)
    expect(secondMap[0].object).toBe(null)
    expect(helpers.mergeReferences(firstMap, secondMap)[0].object).toBe(firstMap[0].object)
    secondMap = buildReferenceMap(circularObject, 1)
    expect(secondMap[0].object).toMatchObject({ body: 1, children: 3, head: 2, name: 'root', parent: {} })
    expect(helpers.mergeReferences(firstMap, secondMap)[0].object).toBe(firstMap[0].object)
    firstMap = buildReferenceMap(circularObject, 1)
    secondMap = buildReferenceMap(circularObject, 0)
    expect(firstMap[0].object).toMatchObject({ body: 1, children: 3, head: 2, name: 'root', parent: {} })
    expect(secondMap[0].object).toBe(null)
    expect(helpers.mergeReferences(firstMap, secondMap)[0].object).toBe(firstMap[0].object)
  })

  test('will merge non reference values and return if no other references', () => {
    const testObject1 = { aValue: 1, someString: 'something', justHere: [], replaceRef: { replaceMe: 'with string' } }
    const testObject2 = { someString: 'another thing', aValue: 20, newStuff: null, replaceRef: 'string please' }
    const firstMap = buildReferenceMap(testObject1, 1)
    const secondMap = buildReferenceMap(testObject2, 1)
    const result = helpers.mergeReferences(firstMap, secondMap)
    expect(result[0].object).toMatchObject({
      aValue: 20,
      someString: 'another thing',
      justHere: [],
      replaceRef: 'string please',
      newStuff: null
    })
  })

  test('will merge available completed identifiers', () => {
    const testObject1 = { aValue: 1, nestedObject: { someString: 'something' }, nestedArray: ['one', 'two', 'three'] }
    const testObject2 = { nestedObject: { someString: 'another thing', newStuff: null }, aValue: 20, nestedArray: ['three', 'four', 'five'] }
    const firstMap = buildReferenceMap(testObject1, 2)
    const secondMap = buildReferenceMap(testObject2, 2)
    const result = helpers.mergeReferences(firstMap, secondMap)
    expect(result.length).toBe(2)
    expect(result[0]).toMatchObject({
      object: {
        aValue: 20,
        nestedObject: { someString: 'another thing', newStuff: null },
        nestedArray: 2
      },
      references: ['nestedArray']
    })
    expect(result[1]).toMatchObject({
      complete: false,
      index: 2,
      object: null,
      referers: [0]
    })
  })

  test('will merge multiple references for all that are complete', () => {
    const testObject1 = { aValue: 1, nestedObject: { someString: 'something' }, nestedArray: ['one', 'two', 'three'] }
    const testObject2 = { nestedObject: { someString: 'another thing', newStuff: null }, aValue: 20, nestedArray: ['three', 'four', 'five'] }
    const firstMap = buildReferenceMap(testObject1, 3)
    const secondMap = buildReferenceMap(testObject2, 3)
    const result = helpers.mergeReferences(firstMap, secondMap)
    expect(result.length).toBe(1)
    expect(result[0]).toMatchObject({
      object: {
        aValue: 20,
        nestedObject: { someString: 'another thing', newStuff: null },
        nestedArray: ['one', 'two', 'three', 'four', 'five']
      },
      references: []
    })
  })

  test('will merge deeply nested references', () => {
    const testObject1 = { nestedObject: { deepNested: { someString: 'something' } } }
    const testObject2 = { nestedObject: { deepNested: { someString: 'another thing' } } }
    const firstMap = buildReferenceMap(testObject1, 3)
    const secondMap = buildReferenceMap(testObject2, 3)
    const result = helpers.mergeReferences(firstMap, secondMap)
    expect(result.length).toBe(1)
    expect(secondMap.length).toBe(1)
    expect(result[0]).toMatchObject({
      object: { nestedObject: { deepNested: { someString: 'another thing' } } },
      references: []
    })
  })

  test('will merge for same of multiple references for linked list', () => {
    const firstMap = buildReferenceMap(linkedList, 3)
    const secondMap = buildReferenceMap(linkedList, 3)
    const result = helpers.mergeReferences(firstMap, secondMap)
    expect(result.length).toBe(1)
    expect(result[0]).toMatchObject({
      object: linkedList,
      references: []
    })
  })

  test('will merge for same of multiple references with circular reference', () => {
    const firstMap = buildReferenceMap(circularObject, 10)
    const secondMap = buildReferenceMap(circularObject, 10)
    const result = helpers.mergeReferences(firstMap, secondMap)
    expect(result.length).toBe(1)
    expect(result[0]).toMatchObject({
      object: circularObject,
      references: []
    })
  })

  test('will merge for mismatched references', () => {
    const testObject1 = { aValue: 1, nestedObject: { someString: 'something', anotherString: 'something special here', oldStuff: { justOld: 9876 } }, nestedArray: ['one', 'two', 'three'] }
    const testObject2 = { aValue: 20, nestedObject: { someString: 'another thing', newStuff: { justNew: 12345 } }, extraArray: [1, 2, 3] }
    const firstMap = buildReferenceMap(testObject1, 4)
    const secondMap = buildReferenceMap(testObject2, 4)
    const result = helpers.mergeReferences(firstMap, secondMap)
    expect(result.length).toBe(1)
    expect(result[0]).toMatchObject({
      object: {
        aValue: 20,
        nestedObject: {
          someString: 'another thing',
          anotherString: 'something special here',
          newStuff: { justNew: 12345 },
          oldStuff: { justOld: 9876 }
        },
        nestedArray: ['one', 'two', 'three'],
        extraArray: [1, 2, 3]
      },
      references: []
    })
  })

  test('will merge multipart object arrays', () => {
    const testObject1 = {
      name: 'different',
      anArray: [1, 2, 3],
      number: 10,
      nested: { value: 'aValue' },
      key: 'someKey'
    }
    const testObject2 = { number: 5, anArray: [2, 3, 4, 5, 6, 7] }
    const firstMap = buildReferenceMap(testObject1, 3)
    const secondMap = buildReferenceMap(testObject2, 2)
    const result = helpers.mergeReferences(firstMap, secondMap)
    expect(result.length).toBe(1)
    expect(result[0]).toMatchObject({
      object: {
        name: 'different',
        anArray: [1, 2, 3, 4, 5, 6, 7],
        number: 5,
        nested: { value: 'aValue' },
        key: 'someKey'
      },
      references: []
    })
  })
})
