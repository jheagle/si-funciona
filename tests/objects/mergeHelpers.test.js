import * as helpers from '../../dist/helpers/objects/mergeHelpers'
import { circularObject } from '../testHelpers'

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

describe('processMergeIdentifier', () => {
  test('will process the first identifier in more references', () => {
    const objects = [circularObject, circularObject]
    const referenceMap = [helpers.createMergeReferenceIdentifier(objects, 0)]
    let moreReferences = [referenceMap[0]]
    moreReferences = helpers.processMergeIdentifier(referenceMap, moreReferences)
    expect(moreReferences.length).toBe(3)
    expect(moreReferences[0]).not.toEqual(referenceMap[0])
    expect(referenceMap[0].object).toMatchObject({
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
    const referenceMap = helpers.processMergeIdentifiers([circularObject])
    expect(referenceMap.length).toBe(10)
    expect(referenceMap[0]).toMatchObject({
      circular: [],
      index: 0,
      object: { name: 'root', parent: {}, body: 1, head: 2, children: 3 },
      references: ['body', 'head', 'children'],
      referers: [1, 2]
    })
    expect(referenceMap[1]).toMatchObject({
      circular: ['parent'],
      index: 1,
      object: { name: 'body', parent: 0, children: 4 },
      references: ['parent', 'children'],
      referers: [0, 3, 6, 7]
    })
    expect(referenceMap[2]).toMatchObject({
      circular: ['parent'],
      index: 2,
      object: { name: 'head', parent: 0, children: 5 },
      references: ['parent', 'children'],
      referers: [0, 3, 8, 9]
    })
    expect(referenceMap[3]).toMatchObject({
      circular: [0, 1],
      index: 3,
      object: [1, 2],
      references: [0, 1],
      referers: [0]
    })
    expect(referenceMap[4]).toMatchObject({
      circular: [],
      index: 4,
      object: [6, 7],
      references: [0, 1],
      referers: [1]
    })
    expect(referenceMap[5]).toMatchObject({
      circular: [],
      index: 5,
      object: [8, 9],
      references: [0, 1],
      referers: [2]
    })
    expect(referenceMap[6]).toMatchObject({
      circular: ['parent'],
      index: 6,
      object: { name: 'body child one', parent: 1, children: [] },
      references: ['parent'],
      referers: [4]
    })
    expect(referenceMap[7]).toMatchObject({
      circular: ['parent'],
      index: 7,
      object: { name: 'body child two', parent: 1, children: [] },
      references: ['parent'],
      referers: [4]
    })
    expect(referenceMap[8]).toMatchObject({
      circular: ['parent'],
      index: 8,
      object: { name: 'head child one', parent: 2, children: [] },
      references: ['parent'],
      referers: [5]
    })
    expect(referenceMap[9]).toMatchObject({
      circular: ['parent'],
      index: 9,
      object: { name: 'head child two', parent: 2, children: [] },
      references: ['parent'],
      referers: [5]
    })
  })
})
