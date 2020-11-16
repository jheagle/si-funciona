import * as helpers from '../../dist/helpers/objects/cloneHelpers'
import { circularObject, multiReferenceObject } from '../testHelpers'

describe('createReferenceIdentifier', () => {
  test('assigns properties into new reference identifier', () => {
    const testObject = { one: 1, two: 2 }
    const testIndex = 5
    const testReferers = [1, 2]
    expect(helpers.createReferenceIdentifier(testObject, testIndex, testReferers))
      .toEqual({ circular: [], complete: false, index: testIndex, object: null, original: testObject, references: [], referers: testReferers })
  })
})

describe('findObjectReferences', () => {
  test('identifiers references and sets them as null in a new object', () => {
    const testIndex = 5
    const testReferers = [1, 2]
    const identifier = helpers.createReferenceIdentifier(multiReferenceObject, testIndex, testReferers)
    expect(helpers.findObjectReferences(identifier)).toMatchObject({
      object: { object1: null, object2: null, array1: null, array2: null, title: 'Some Title', item: 45 },
      references: ['object1', 'object2', 'array1', 'array2']
    })
  })

  test('identifies references in circular object for a reference identifier ', () => {
    const identifier = helpers.createReferenceIdentifier(circularObject, 0)
    expect(helpers.findObjectReferences(identifier)).toMatchObject({
      complete: false,
      index: 0,
      object: { name: 'root', parent: {}, body: null, head: null, children: null },
      references: ['body', 'head', 'children'],
      referers: []
    })
  })
})

describe('findObjectReferences', () => {
  test('identifies reference locations and assigns the correct index', () => {
    const referenceMap = [
      helpers.createReferenceIdentifier(circularObject, 0)
    ]
    referenceMap[0] = helpers.findObjectReferences(referenceMap[0])
    referenceMap[0] = helpers.findReferenceKeys(referenceMap, 0)
    expect(referenceMap[0]).toMatchObject({
      complete: false,
      index: 0,
      object: { name: 'root', parent: {}, body: 1, head: 2, children: 3 },
      references: ['body', 'head', 'children'],
      referers: []
    })
    referenceMap[1] = helpers.findObjectReferences(referenceMap[1])
    expect(referenceMap[1]).toMatchObject({
      circular: [],
      complete: false,
      index: 1,
      object: { name: 'body', parent: null, children: null },
      references: ['parent', 'children'],
      referers: [0]
    })
    referenceMap[1] = helpers.findReferenceKeys(referenceMap, 1)
    expect(referenceMap[1]).toMatchObject({
      circular: ['parent'],
      complete: false,
      index: 1,
      object: { name: 'body', parent: 0, children: 4 },
      references: ['parent', 'children'],
      referers: [0]
    })
    expect(referenceMap[0].referers).toEqual([1])
  })
})

describe('findReferenceIndex', () => {
  test('will return the original index when it is the same in the reference map', () => {
    const testMap = [{ index: 0 }, { index: 1 }, { index: 2 }, { index: 3 }]
    expect(helpers.findReferenceIndex(testMap, 2)).toEqual(2)
  })

  test('will find the index when it is earlier in the array', () => {
    const testMap = [{ index: 0 }, { index: 4 }, { index: 5 }, { index: 6 }, { index: 7 }]
    expect(helpers.findReferenceIndex(testMap, 4)).toEqual(1)
  })

  test('will find the index when unordered found index is greater', () => {
    const testMap = [{ index: 0 }, { index: 4 }, { index: 6 }, { index: 8 }, { index: 10 }]
    expect(helpers.findReferenceIndex(testMap, 4)).toEqual(1)
  })

  test('will find the index when greater than and position is actually 0', () => {
    const testMap = [{ index: 4 }, { index: 6 }, { index: 8 }, { index: 10 }]
    expect(helpers.findReferenceIndex(testMap, 4)).toEqual(0)
  })

  test('will find the index current index is undefined', () => {
    const testMap = [{ index: 0 }, { index: 2 }]
    expect(helpers.findReferenceIndex(testMap, 2)).toEqual(1)
  })
})

describe('findReference', () => {
  test('will return the original reference when it is the same in the reference map', () => {
    const testMap = [{ index: 0 }, { index: 1 }, { index: 2 }, { index: 3 }]
    expect(helpers.findReference(testMap, 2)).toEqual({ index: 2 })
  })

  test('will find the reference when it is earlier in the array', () => {
    const testMap = [{ index: 0 }, { index: 4 }, { index: 5 }, { index: 6 }, { index: 7 }]
    expect(helpers.findReference(testMap, 4)).toEqual({ index: 4 })
  })

  test('will find the reference when unordered found index is greater', () => {
    const testMap = [{ index: 0 }, { index: 4 }, { index: 6 }, { index: 8 }, { index: 10 }]
    expect(helpers.findReference(testMap, 4)).toEqual({ index: 4 })
  })

  test('will find the reference when greater than and position is actually 0', () => {
    const testMap = [{ index: 4 }, { index: 6 }, { index: 8 }, { index: 10 }]
    expect(helpers.findReference(testMap, 4)).toEqual({ index: 4 })
  })

  test('will find the reference current index is undefined', () => {
    const testMap = [{ index: 0 }, { index: 2 }]
    expect(helpers.findReference(testMap, 2)).toEqual({ index: 2 })
  })
})

describe('objectAndReferences', () => {
  test('stores object and references array provided', () => {
    const testObject = { one: 1, two: 2, three: 3 }
    const testReferences = ['one', 'two', 'three']
    expect(helpers.objectAndReferences(testObject, testReferences)).toMatchObject({
      object: testObject,
      references: testReferences
    })
  })
})

describe('linkReferenceObject', () => {
  const buildReferenceMap = limit => {
    const referenceMap = [
      helpers.createReferenceIdentifier(circularObject, 0)
    ]
    for (let i = 0; i < limit; ++i) {
      referenceMap[i] = helpers.findObjectReferences(referenceMap[i])
      referenceMap[i] = helpers.findReferenceKeys(referenceMap, i)
      referenceMap[i].complete = true
    }
    return referenceMap
  }

  const callLinkReferencesTimes = (referenceMap, times = 1) => {
    let objectReference = helpers.objectAndReferences(referenceMap[0].object, referenceMap[0].references)
    for (let i = 0; i < times; ++i) {
      objectReference = helpers.linkReferenceObject(referenceMap)(objectReference, referenceMap[0].references[0], 0)
    }
    return objectReference
  }

  test('will skip linking references that are incomplete, returning original', () => {
    const referenceMap = buildReferenceMap(1)
    const objectReference = helpers.objectAndReferences(referenceMap[0].object, referenceMap[0].references)
    const result = helpers.linkReferenceObject(referenceMap)(objectReference, referenceMap[0].references[0], 0)
    expect(result).toEqual(objectReference)
  })

  test('will assign first reference onto the object `body` and detect subsequent `parent` circular reference', () => {
    const referenceMap = buildReferenceMap(2)
    const result = callLinkReferencesTimes(referenceMap)
    expect(result).toMatchObject({
      object: { body: referenceMap[1].object },
      references: [['body', [['parent', null], 'children']], 'head', 'children'],
      remove: [referenceMap[1]]
    })
  })

  test('will detect circular reference and prevent further parsing', () => {
    const referenceMap = buildReferenceMap(3)
    const result = callLinkReferencesTimes(referenceMap, 2)
    expect(result).toMatchObject({
      object: { body: referenceMap[1].object },
      references: [['body', ['children']], 'head', 'children'],
      remove: [referenceMap[1], referenceMap[0]]
    })
  })

  test('will use array reference to find nested references', () => {
    const referenceMap = buildReferenceMap(5)
    const result = callLinkReferencesTimes(referenceMap, 3)
    expect(result).toMatchObject({
      object: { body: referenceMap[1].object },
      references: [['body', [['children', [0, 1]]]], 'head', 'children'],
      remove: [referenceMap[1], referenceMap[0], referenceMap[4]]
    })
  })
})

describe('removeFromReferenceMap', () => {
  const buildReferenceMap = limit => {
    const referenceMap = [
      helpers.createReferenceIdentifier(circularObject, 0)
    ]
    for (let i = 0; i < limit; ++i) {
      referenceMap[i] = helpers.findObjectReferences(referenceMap[i])
      referenceMap[i] = helpers.findReferenceKeys(referenceMap, i)
      referenceMap[i].complete = true
    }
    return referenceMap
  }

  const removeReferer = (nextRef, index) => {
    const refererPosition = nextRef.referers.findIndex(i => i === index)
    nextRef.referers.splice(refererPosition, 1)
    return nextRef
  }

  test('will not remove the 0 index of the reference map', () => {
    const referenceMap = buildReferenceMap(1)
    expect(helpers.removeFromReferenceMap(referenceMap)(referenceMap[0])).toBe(false)
  })

  test('will be unable to remove non-existant identifier and return false', () => {
    const referenceMap = buildReferenceMap(1)
    const fakeIdentifier = helpers.createReferenceIdentifier({}, 4)
    expect(helpers.removeFromReferenceMap(referenceMap)(fakeIdentifier)).toBe(false)
  })

  test('will not remove identifier that has referers from a higher index', () => {
    const referenceMap = buildReferenceMap(4)
    expect(helpers.removeFromReferenceMap(referenceMap)(referenceMap[1])).toBe(false)
  })

  test('will remove identifier if it has higher index referer that no longer exists', () => {
    const referenceMap = buildReferenceMap(4)
    referenceMap[1] = removeReferer(referenceMap[1], 0)
    referenceMap[3] = removeReferer(referenceMap[3], 0)
    helpers.removeFromReferenceMap(referenceMap)(referenceMap[3])
    referenceMap[1] = removeReferer(referenceMap[1], 3)
    expect(helpers.removeFromReferenceMap(referenceMap)(referenceMap[1])).toBe(true)
  })

  test('will successfully remove an identifier and remove the index from referers on zero indexed identifier', () => {
    const referenceMap = buildReferenceMap(2)
    expect(referenceMap[0].referers).toEqual([1])
    referenceMap[1] = removeReferer(referenceMap[1], 0)
    expect(helpers.removeFromReferenceMap(referenceMap)(referenceMap[1])).toBe(true)
    expect(referenceMap[0].referers).toEqual([])
  })
})

describe('linkReferences', () => {
  const buildReferenceMap = limit => {
    const referenceMap = [
      helpers.createReferenceIdentifier(circularObject, 0)
    ]
    for (let i = 0; i < limit; ++i) {
      referenceMap[i] = helpers.findObjectReferences(referenceMap[i])
      referenceMap[i] = helpers.findReferenceKeys(referenceMap, i)
      referenceMap[i].complete = true
    }
    return referenceMap
  }

  test('will return without changes when the zero indexed identifier is not complete', () => {
    const referenceMap = buildReferenceMap(0)
    expect(referenceMap[0].object).toBe(null)
    expect(helpers.linkReferences(referenceMap)[0].object).toBe(null)
  })

  test('will return without changes when there are no other completed identifiers', () => {
    const referenceMap = buildReferenceMap(1)
    expect(helpers.linkReferences(referenceMap)[0].object).toMatchObject({
      body: 1,
      children: 3,
      head: 2,
      name: 'root',
      parent: {}
    })
  })

  test('will update by linking references when there are completed identifiers', () => {
    const referenceMap = buildReferenceMap(2)
    const first = referenceMap[1].object
    expect(helpers.linkReferences(referenceMap)[0].object).toMatchObject({
      body: first,
      children: 3,
      head: 2,
      name: 'root',
      parent: {}
    })
  })

  test('will update multiple references for all that are complete', () => {
    const referenceMap = buildReferenceMap(4)
    const first = referenceMap[1].object
    const second = referenceMap[2].object
    const third = referenceMap[3].object
    expect(helpers.linkReferences(referenceMap)[0].object).toMatchObject({
      body: first,
      children: third,
      head: second,
      name: 'root',
      parent: {}
    })
  })
})

describe('processIdentifer', () => {
  const buildReferenceMap = () => [
    helpers.createReferenceIdentifier(circularObject, 0)
  ]

  test('will process the first identifier in more references', () => {
    const referenceMap = buildReferenceMap()
    expect(referenceMap[0].object).toBe(null)
    const moreReferences = helpers.processIdentifier(referenceMap, [referenceMap[0]])
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

describe('processIdentifers', () => {
  test('will process the first identifier in more references', () => {
    const referenceMap = helpers.processIdentifiers(circularObject)
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
