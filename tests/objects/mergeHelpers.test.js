import * as helpers from '../../dist/helpers/objects/mergeHelpers'
import { mergeArrays } from '../../dist/helpers/arrays'
import { createReferenceIdentifier, findObjectReferences, findReferenceKeys, objectAndReferences } from '../../dist/helpers/objects/cloneHelpers'
import { logObject, circularObject, linkedList } from '../testHelpers'

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

describe('mergeNonReferences', () => {
  test('will not overwrite any reference index, new references will be added', () => {
    const testObject1 = {
      aValue: 1,
      nestedObject: { someString: 'something', anotherString: 'something special here', oldStuff: { justOld: 9876 } },
      nestedArray: ['one', 'two', 'three']
    }
    const testObject2 = {
      aValue: 20,
      nestedObject: { someString: 'another thing', newStuff: { justNew: 12345 } },
      extraArray: [1, 2, 3]
    }
    const firstMap = buildReferenceMap(testObject1, 4)
    const secondMap = buildReferenceMap(testObject2, 4)
    expect(firstMap.length).toBe(4)
    expect(firstMap[0]).toMatchObject({
      object: { aValue: 1, nestedObject: 1, nestedArray: 2 },
      references: ['nestedObject', 'nestedArray']
    })
    expect(firstMap[0].merged).toBe(false)
    expect(firstMap[1].merged).toBe(false)
    expect(firstMap[2].merged).toBe(false)
    expect(firstMap[3].merged).toBe(false)
    expect(secondMap[0].merged).toBe(false)
    expect(secondMap[1].merged).toBe(false)
    expect(secondMap[2].merged).toBe(false)
    expect(secondMap[3].merged).toBe(false)
    firstMap[0].object = helpers.mergeNonReferences(firstMap, 0, secondMap, 0)
    expect(firstMap.length).toBe(5)
    expect(firstMap[0]).toMatchObject({
      object: { aValue: 20, nestedObject: 1, nestedArray: 2, extraArray: 4 },
      references: ['nestedObject', 'nestedArray', 'extraArray'],
      merged: true
    })
    expect(firstMap[0].merged).toBe(true)
    expect(firstMap[2].merged).toBe(true)
    expect(secondMap[0].merged).toBe(true)
    firstMap[1].object = helpers.mergeNonReferences(firstMap, 1, secondMap, 1)
    expect(firstMap.length).toBe(6)
    expect(firstMap[1]).toMatchObject({
      object: { someString: 'another thing', anotherString: 'something special here', oldStuff: 3, newStuff: 5 },
      references: ['oldStuff', 'newStuff']
    })
    expect(firstMap[1].merged).toBe(true)
    expect(firstMap[3].merged).toBe(true)
    expect(secondMap[1].merged).toBe(true)
  })

  test('will overwrite and remove reference if second map stores non-reference', () => {
    const testObject1 = { aValue: 1, nestedStuff: { someString: 'something' } }
    const testObject2 = { aValue: 20, nestedStuff: 'another thing' }
    const firstMap = buildReferenceMap(testObject1, 2)
    const secondMap = buildReferenceMap(testObject2, 1)
    expect(firstMap.length).toBe(2)
    expect(firstMap[0]).toMatchObject({
      object: { aValue: 1, nestedStuff: 1 },
      references: ['nestedStuff']
    })
    expect(firstMap[0].merged).toBe(false)
    expect(firstMap[1].merged).toBe(false)
    expect(secondMap[0].merged).toBe(false)
    const remove = []
    firstMap[0].object = helpers.mergeNonReferences(firstMap, 0, secondMap, 0, remove)
    expect(firstMap.length).toBe(2)
    expect(firstMap[0]).toMatchObject({
      object: { aValue: 20, nestedStuff: 'another thing' },
      references: []
    })
    expect(remove.length).toBe(1)
    expect(remove[0]).toBe(firstMap[1])
    expect(firstMap[0].merged).toBe(true)
    expect(firstMap[1].merged).toBe(false)
    expect(secondMap[0].merged).toBe(true)
    firstMap[1].object = helpers.mergeNonReferences(firstMap, 1, secondMap, 1)
    expect(firstMap.length).toBe(2)
    expect(firstMap[1]).toMatchObject({
      object: { someString: 'something' },
      references: []
    })
    expect(firstMap[1].merged).toBe(true)
  })
})

describe('mergeReferenceArrays', () => {
  test('will only add new ref string if it does not already exist', () => {
    let references = []
    const ref = 'someNewRef'
    references = helpers.mergeReferenceArrays(references, ref)
    expect(references.length).toBe(1)
    expect(references).toEqual([ref])
    references = helpers.mergeReferenceArrays(references, ref)
    expect(references.length).toBe(1)
    expect(references).toEqual([ref])
    references = helpers.mergeReferenceArrays([references], ref)
    expect(references.length).toBe(1)
    expect(references).toEqual([[ref]])
  })

  test('will only add new ref array if it does not already exist', () => {
    let references = []
    const refString = 'someNewRef'
    const ref = [refString]
    references = helpers.mergeReferenceArrays(references, ref)
    expect(references.length).toBe(1)
    expect(references).toEqual([ref])
    references = helpers.mergeReferenceArrays(references, ref)
    expect(references.length).toBe(1)
    expect(references).toEqual([ref])
    references = helpers.mergeReferenceArrays([refString], ref)
    expect(references.length).toBe(1)
    expect(references).toEqual([ref])
    const anotherRef = 'anotherRef'
    references = [[refString, anotherRef]]
    references = helpers.mergeReferenceArrays(references, ref)
    expect(references.length).toBe(1)
    expect(references).toEqual([[refString, anotherRef]])
    const extraRef = 'extraRef'
    references = [[refString, [anotherRef]]]
    references = helpers.mergeReferenceArrays(references, [refString, [extraRef]])
    expect(references.length).toBe(1)
    expect(references).toEqual([[refString, [anotherRef, extraRef]]])
    references = [[refString, [anotherRef]]]
    references = helpers.mergeReferenceArrays(references, [refString, extraRef])
    expect(references.length).toBe(1)
    expect(references).toEqual([[refString, [anotherRef, extraRef]]])
  })

  test('will recursively merge references', () => {
    let references = []
    const refString = 'someNewRef'
    const anotherRef = 'anotherRef'
    const extraRef = 'extraRef'
    const ref = [refString, [anotherRef, extraRef]]
    references = helpers.mergeReferenceArrays(references, ref)
    expect(references.length).toBe(1)
    expect(references).toEqual([ref])
    references = helpers.mergeReferenceArrays(references, ref)
    expect(references.length).toBe(1)
    expect(references).toEqual([ref])
    const differentRef = [
      refString,
      [anotherRef, extraRef, [anotherRef], [extraRef, [refString, anotherRef]], [anotherRef, refString]]
    ]
    references = helpers.mergeReferenceArrays(references, differentRef)
    expect(references.length).toBe(1)
    expect(references).toEqual([
      [
        'someNewRef',
        [
          ['anotherRef', 'someNewRef'],
          ['extraRef', ['someNewRef', 'anotherRef']]
        ]
      ]
    ])
  })
})

describe('mergeReferenceObject', () => {
  const callMergeReferenceTimes = (firstMap, secondMap, times = 1) => {
    firstMap[0].object = helpers.mergeNonReferences(firstMap, 0, secondMap, 0)
    let objRefs = mergeArrays(firstMap[0].references, secondMap[0].references)
    objRefs = objRefs.reduce(helpers.mergeReferenceArrays, [])
    let object1 = objectAndReferences(firstMap[0].object, objRefs, 0)
    const object2 = objectAndReferences(secondMap[0].object, secondMap[0].references, 0)
    for (let i = 0; i < times; ++i) {
      object1 = helpers.mergeReferenceObject(firstMap, secondMap, object2)(object1, objRefs[0], 0)
      firstMap[0].references = object1.references.reduce(helpers.mergeReferenceArrays, [])
    }
    return object1
  }

  test('will skip merging references that are not ready for merge, returning original', () => {
    const testObject1 = { aValue: 1, someString: 'something', justHere: [], replaceRef: { replaceMe: 'with string' } }
    const testObject2 = { someString: 'another thing', aValue: 20, newStuff: null, replaceRef: 'string please' }
    const firstMap = buildReferenceMap(testObject1, 1)
    const secondMap = buildReferenceMap(testObject2, 1)
    const objRefs = mergeArrays(firstMap[0].references, secondMap[0].references)
    const object1 = objectAndReferences(firstMap[0].object, objRefs, 0)
    const object2 = objectAndReferences(secondMap[0].object, secondMap[0].references, 0)
    const result = helpers.mergeReferenceObject(firstMap, secondMap, object2)(object1, objRefs[0], 0)
    expect(result).toMatchObject({
      object: {
        aValue: 1,
        someString: 'something',
        justHere: [],
        replaceRef: 1
      },
      references: ['replaceRef']
    })
  })

  test('will assign first reference onto the object `body` and detect subsequent `parent` circular reference', () => {
    const firstMap = buildReferenceMap(circularObject, 2)
    const secondMap = buildReferenceMap(circularObject, 2)
    const result = callMergeReferenceTimes(firstMap, secondMap)
    expect(result).toMatchObject({
      object: { body: firstMap[1].object },
      references: [['body', [['parent', null], 'children']], 'head', 'children'],
      remove: [firstMap[1]]
    })
  })

  test('will detect circular reference and prevent further parsing', () => {
    const firstMap = buildReferenceMap(circularObject, 3)
    const secondMap = buildReferenceMap(circularObject, 3)
    const result = callMergeReferenceTimes(firstMap, secondMap, 2)
    expect(result).toMatchObject({
      object: { body: firstMap[1].object },
      references: [['body', ['children']], 'head', 'children'],
      remove: [firstMap[1], firstMap[0]]
    })
  })

  test('will use array reference to find nested references', () => {
    const firstMap = buildReferenceMap(circularObject, 5)
    const secondMap = buildReferenceMap(circularObject, 5)
    const result = callMergeReferenceTimes(firstMap, secondMap, 3)
    expect(result).toMatchObject({
      object: { body: firstMap[1].object },
      references: [['body', [['children', [0, 1]]]], 'head', 'children'],
      remove: [firstMap[1], firstMap[0], firstMap[4]]
    })
  })
})

describe('mergeReferences', () => {
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

describe('processMergeIdentifer', () => {
  test('will process the first identifier in more references', () => {
    const firstMap = [createReferenceIdentifier(circularObject, 0)]
    const secondMap = [createReferenceIdentifier(circularObject, 0)]
    const mapDetails = [
      {
        referenceMap: firstMap,
        moreReferences: [firstMap[0]]
      },
      {
        referenceMap: secondMap,
        moreReferences: [secondMap[0]]
      }
    ]
    const moreReferences = helpers.processMergeIdentifer(mapDetails)(0)
    expect(moreReferences.length).toBe(3)
    expect(moreReferences[0]).not.toEqual(firstMap[0])
    expect(firstMap[0].object).toMatchObject({
      body: 1,
      children: 3,
      head: 2,
      name: 'root',
      parent: {}
    })
  })
})

describe('processMergeIdentifiers', () => {
  test('will process the first identifier in more references', () => {
    let firstMap = []
    let secondMap = []
    ;([firstMap, secondMap] = helpers.processMergeIdentifiers(circularObject))
    expect(secondMap.length).toBe(1)
    expect(firstMap.length).toBe(10)
    expect(firstMap[0]).toMatchObject({
      circular: [],
      index: 0,
      object: { name: 'root', parent: {}, body: 1, head: 2, children: 3 },
      references: ['body', 'head', 'children'],
      referers: [1, 2]
    })
    expect(firstMap[1]).toMatchObject({
      circular: ['parent'],
      index: 1,
      object: { name: 'body', parent: 0, children: 4 },
      references: ['parent', 'children'],
      referers: [0, 3, 6, 7]
    })
    expect(firstMap[2]).toMatchObject({
      circular: ['parent'],
      index: 2,
      object: { name: 'head', parent: 0, children: 5 },
      references: ['parent', 'children'],
      referers: [0, 3, 8, 9]
    })
    expect(firstMap[3]).toMatchObject({
      circular: [0, 1],
      index: 3,
      object: [1, 2],
      references: [0, 1],
      referers: [0]
    })
    expect(firstMap[4]).toMatchObject({
      circular: [],
      index: 4,
      object: [6, 7],
      references: [0, 1],
      referers: [1]
    })
    expect(firstMap[5]).toMatchObject({
      circular: [],
      index: 5,
      object: [8, 9],
      references: [0, 1],
      referers: [2]
    })
    expect(firstMap[6]).toMatchObject({
      circular: ['parent'],
      index: 6,
      object: { name: 'body child one', parent: 1, children: [] },
      references: ['parent'],
      referers: [4]
    })
    expect(firstMap[7]).toMatchObject({
      circular: ['parent'],
      index: 7,
      object: { name: 'body child two', parent: 1, children: [] },
      references: ['parent'],
      referers: [4]
    })
    expect(firstMap[8]).toMatchObject({
      circular: ['parent'],
      index: 8,
      object: { name: 'head child one', parent: 2, children: [] },
      references: ['parent'],
      referers: [5]
    })
    expect(firstMap[9]).toMatchObject({
      circular: ['parent'],
      index: 9,
      object: { name: 'head child two', parent: 2, children: [] },
      references: ['parent'],
      referers: [5]
    })
  })
})
