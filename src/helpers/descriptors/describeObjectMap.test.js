import describeObjectMap from './describeObjectMap'
import descriptorMapSample from './samples/descriptorMap'
import describeObject from './describeObject'
import mappedDescriptorMap from './samples/mappedDescriptorMap'
import {
  circularObject,
  deepReferenceObject,
  domItem,
  jsonDom,
  linkedList,
  multiReferenceObject,
  nodeTree
} from 'test-filesystem'

describe('describeObjectMap', () => {
  test('can produce structure matching sample with single string detail', () => {
    expect(describeObjectMap({ keyName: '' }, { keepValues: true }))
      .toEqual(descriptorMapSample)
  })

  test('can produce structure similar to sample mapped sample', () => {
    const descriptor = describeObject({ keyName: '' })
    const result = describeObjectMap(descriptor)
    expect(result)
      .toEqual(mappedDescriptorMap)
  })

  test('object with self reference can be described', () => {
    const selfItem = { name: 'self', self: null }
    selfItem.self = selfItem
    expect(describeObjectMap(selfItem)).toEqual([
      {
        index: 0,
        details: [
          {
            index: 0,
            key: 'name',
            type: ['string'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 1,
            key: 'self',
            type: ['object'],
            value: [],
            nullable: false,
            optional: false,
            circular: true,
            isReference: true,
            isInstance: false,
            arrayReference: null,
            objectReference: 0
          }
        ],
        length: 2,
        keys: ['name', 'self'],
        references: [1],
        isArray: false,
        complete: true
      }
    ])
  })

  test('able to describe and map linked list object with circular references', () => {
    expect(describeObjectMap(linkedList)).toEqual([
      {
        index: 0,
        details: [
          {
            index: 0,
            key: 'name',
            type: ['string'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 1,
            key: 'prev',
            type: ['object'],
            value: [],
            nullable: true,
            optional: false,
            circular: true,
            isReference: true,
            isInstance: false,
            arrayReference: null,
            objectReference: 0
          },
          {
            index: 2,
            key: 'next',
            type: ['object'],
            value: [],
            nullable: true,
            optional: false,
            circular: false,
            isReference: true,
            isInstance: false,
            arrayReference: null,
            objectReference: 0
          }
        ],
        length: 3,
        keys: ['name', 'prev', 'next'],
        references: [1, 2],
        isArray: false,
        complete: true
      }
    ])
  })

  test('able to describe and map node tree object with circular references', () => {
    expect(describeObjectMap(nodeTree)).toEqual([
      {
        index: 0,
        details: [
          {
            index: 0,
            key: 'name',
            type: ['string'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 1,
            key: 'parent',
            type: ['object'],
            value: [],
            nullable: true,
            optional: false,
            circular: true,
            isReference: true,
            isInstance: false,
            arrayReference: null,
            objectReference: 0
          },
          {
            index: 2,
            key: 'children',
            type: ['object'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: true,
            isInstance: false,
            arrayReference: 1,
            objectReference: null
          }
        ],
        length: 3,
        keys: ['name', 'parent', 'children'],
        references: [1, 2],
        isArray: false,
        complete: true
      },
      {
        index: 1,
        details: [
          {
            index: 0,
            key: 0,
            type: ['object'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: true,
            isInstance: false,
            arrayReference: null,
            objectReference: 0
          }
        ],
        length: 2,
        keys: [0],
        references: [0],
        isArray: true,
        complete: true
      }
    ])
  })

  test('object with empty nested array or object can link to reference', () => {
    expect(describeObjectMap(jsonDom)).toEqual([
      {
        index: 0,
        details: [
          {
            index: 0,
            key: 'tagName',
            type: ['string'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 1,
            key: 'attributes',
            type: ['object'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: true,
            isInstance: false,
            arrayReference: null,
            objectReference: 1
          },
          {
            index: 2,
            key: 'element',
            type: ['object'],
            value: [],
            nullable: true,
            optional: false,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 3,
            key: 'eventListeners',
            type: ['object'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 4,
            key: 'parentItem',
            type: ['object'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 5,
            key: 'children',
            type: ['object'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 6,
            key: 'axis',
            type: ['string'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          }
        ],
        length: 7,
        keys: [
          'tagName',
          'attributes',
          'element',
          'eventListeners',
          'parentItem',
          'children',
          'axis'
        ],
        references: [1],
        isArray: false,
        complete: true
      },
      {
        index: 1,
        details: [
          {
            index: 0,
            key: 'style',
            type: ['object'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 1,
            key: 'className',
            type: ['string'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          }
        ],
        length: 2,
        keys: ['style', 'className'],
        references: [],
        isArray: false,
        complete: true
      }
    ])
  })

  test('ensure domItem with child items can be mapped', () => {
    expect(describeObjectMap(domItem)).toEqual([
      {
        index: 0,
        details: [
          {
            index: 0,
            key: 0,
            type: ['object'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: true,
            isInstance: false,
            arrayReference: null,
            objectReference: 1
          }
        ],
        length: 1,
        keys: [0],
        references: [0],
        isArray: true,
        complete: true
      },
      {
        index: 1,
        details: [
          {
            index: 0,
            key: 'attributes',
            type: ['object'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: true,
            isInstance: false,
            arrayReference: null,
            objectReference: 2
          },
          {
            index: 1,
            key: 'axis',
            type: ['string'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 2,
            key: 'children',
            type: ['object'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: true,
            isInstance: false,
            arrayReference: 0,
            objectReference: null
          },
          {
            index: 3,
            key: 'element',
            type: ['object'],
            value: [],
            nullable: true,
            optional: false,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 4,
            key: 'eventListeners',
            type: ['object'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 5,
            key: 'parentItem',
            type: ['object'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 6,
            key: 'tagName',
            type: ['string'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 7,
            key: 'hasShip',
            type: ['boolean'],
            value: [],
            nullable: false,
            optional: true,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 8,
            key: 'isHit',
            type: ['boolean'],
            value: [],
            nullable: false,
            optional: true,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 9,
            key: 'point',
            type: ['object'],
            value: [],
            nullable: false,
            optional: true,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          }
        ],
        length: 10,
        keys: [
          'attributes',
          'axis',
          'children',
          'element',
          'eventListeners',
          'parentItem',
          'tagName',
          'hasShip',
          'isHit',
          'point'
        ],
        references: [0, 2],
        isArray: false,
        complete: true
      },
      {
        index: 2,
        details: [
          {
            index: 0,
            key: 'className',
            type: ['string'],
            value: [],
            nullable: false,
            optional: true,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 1,
            key: 'style',
            type: ['object'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          }
        ],
        length: 2,
        keys: ['className', 'style'],
        references: [],
        isArray: false,
        complete: true
      }
    ])
  })

  test('object with nested instance will not declare as reference', () => {
    const instanceObject = { one: 'first', instance: Object.create({ two: 'second' }) }
    expect(describeObjectMap(instanceObject)).toEqual([{
      index: 0,
      details: [
        {
          index: 0,
          key: 'one',
          type: ['string'],
          value: [],
          nullable: false,
          optional: false,
          circular: false,
          isReference: false,
          isInstance: false,
          arrayReference: null,
          objectReference: null
        },
        {
          index: 1,
          key: 'instance',
          type: ['object'],
          value: [],
          nullable: false,
          optional: false,
          circular: false,
          isReference: false,
          isInstance: true,
          arrayReference: null,
          objectReference: null
        }
      ],
      length: 2,
      keys: ['one', 'instance'],
      references: [],
      isArray: false,
      complete: true
    }])
  })

  test('object checked from middle instead of top of node tree', () => {
    const childNode = nodeTree.children[0]
    expect(describeObjectMap(childNode)).toEqual([
      {
        index: 0,
        details: [
          {
            index: 0,
            key: 'name',
            type: ['string'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 1,
            key: 'parent',
            type: ['object'],
            value: [],
            nullable: true,
            optional: false,
            circular: false,
            isReference: true,
            isInstance: false,
            arrayReference: null,
            objectReference: 0
          },
          {
            index: 2,
            key: 'children',
            type: ['object'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: true,
            isInstance: false,
            arrayReference: 1,
            objectReference: null
          }
        ],
        length: 3,
        keys: ['name', 'parent', 'children'],
        references: [1, 2],
        isArray: false,
        complete: true
      },
      {
        index: 1,
        details: [
          {
            index: 0,
            key: 0,
            type: ['object'],
            value: [],
            nullable: false,
            optional: false,
            circular: true,
            isReference: true,
            isInstance: false,
            arrayReference: null,
            objectReference: 0
          }
        ],
        length: 2,
        keys: [0],
        references: [0],
        isArray: true,
        complete: true
      }
    ])
  })

  test('multiple circular reference object will complete from top', () => {
    expect(describeObjectMap(circularObject)).toEqual([
      {
        index: 0,
        details: [
          {
            index: 0,
            key: 'name',
            type: ['string'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 1,
            key: 'parent',
            type: ['object'],
            value: [],
            nullable: true,
            optional: false,
            circular: true,
            isReference: true,
            isInstance: false,
            arrayReference: null,
            objectReference: 0
          },
          {
            index: 2,
            key: 'body',
            type: ['object'],
            value: [],
            nullable: false,
            optional: true,
            circular: false,
            isReference: true,
            isInstance: false,
            arrayReference: null,
            objectReference: 0
          },
          {
            index: 3,
            key: 'head',
            type: ['object'],
            value: [],
            nullable: false,
            optional: true,
            circular: false,
            isReference: true,
            isInstance: false,
            arrayReference: null,
            objectReference: 0
          },
          {
            index: 4,
            key: 'children',
            type: ['object'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: true,
            isInstance: false,
            arrayReference: 1,
            objectReference: null
          }
        ],
        length: 5,
        keys: ['name', 'parent', 'body', 'head', 'children'],
        references: [1, 2, 3, 4],
        isArray: false,
        complete: true
      },
      {
        index: 1,
        details: [
          {
            index: 0,
            key: 0,
            type: ['object'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: true,
            isInstance: false,
            arrayReference: null,
            objectReference: 0
          }
        ],
        length: 2,
        keys: [0],
        references: [0],
        isArray: true,
        complete: true
      }
    ])
  })

  test('multiple circular reference object will complete from middle', () => {
    expect(describeObjectMap(circularObject.body)).toEqual([
      {
        index: 0,
        details: [
          {
            index: 0,
            key: 'name',
            type: ['string'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: false,
            isInstance: false,
            arrayReference: null,
            objectReference: null
          },
          {
            index: 1,
            key: 'parent',
            type: ['object'],
            value: [],
            nullable: true,
            optional: false,
            circular: false,
            isReference: true,
            isInstance: false,
            arrayReference: null,
            objectReference: 0
          },
          {
            index: 2,
            key: 'children',
            type: ['object'],
            value: [],
            nullable: false,
            optional: false,
            circular: false,
            isReference: true,
            isInstance: false,
            arrayReference: 1,
            objectReference: null
          },
          {
            index: 3,
            key: 'body',
            type: ['object'],
            value: [],
            nullable: false,
            optional: true,
            circular: true,
            isReference: true,
            isInstance: false,
            arrayReference: null,
            objectReference: 0
          },
          {
            index: 4,
            key: 'head',
            type: ['object'],
            value: [],
            nullable: false,
            optional: true,
            circular: true,
            isReference: true,
            isInstance: false,
            arrayReference: null,
            objectReference: 0
          }
        ],
        length: 5,
        keys: ['name', 'parent', 'children', 'body', 'head'],
        references: [1, 2, 3, 4],
        isArray: false,
        complete: true
      },
      {
        index: 1,
        details: [
          {
            index: 0,
            key: 0,
            type: ['object'],
            value: [],
            nullable: false,
            optional: false,
            circular: true,
            isReference: true,
            isInstance: false,
            arrayReference: null,
            objectReference: 0
          }
        ],
        length: 2,
        keys: [0],
        references: [0],
        isArray: true,
        complete: true
      }
    ])
  })
})

describe('describeObjectMap; with mapLimit', () => {
  test('will limit a map to one which is the same as a single descriptor within an array', () => {
    const result = describeObjectMap(multiReferenceObject, { mapLimit: 1 })
    expect(result).toEqual([describeObject(multiReferenceObject)])
    expect(result.length).toBe(1)
  })

  test('will limit a map to two, capturing the original and one reference object', () => {
    expect(describeObjectMap(multiReferenceObject, { mapLimit: 2 }).length).toBe(2)
  })

  test('will limit a map to four, capturing three of the references', () => {
    expect(describeObjectMap(multiReferenceObject, { mapLimit: 4 }).length).toBe(4)
  })

  test('will limit a map by five which is the same as all references', () => {
    const fullyMapped = describeObjectMap(multiReferenceObject)
    const limitFive = describeObjectMap(multiReferenceObject, { mapLimit: 5 })
    expect(fullyMapped).toEqual(limitFive)
  })
})

describe('describeObjectMap; with depthLimit', () => {
  test('with depth limit zero will be the same as single descriptor within an array', () => {
    const result = describeObjectMap(deepReferenceObject, { depthLimit: 0 })
    expect(result).toEqual([describeObject(deepReferenceObject)])
    expect(result.length).toBe(1)
  })

  test('with depth limit one will only include main descriptor and one nested object', () => {
    expect(describeObjectMap(deepReferenceObject, { depthLimit: 1 }).length).toBe(3)
  })

  test('with depth limit two will not include the array on depth of four', () => {
    expect(describeObjectMap(deepReferenceObject, { depthLimit: 2 }).length).toBe(4)
  })

  test('with depth limit three is the max depth of this object so it should result in the same as no limit', () => {
    const result = describeObjectMap(deepReferenceObject, { depthLimit: 3 })
    expect(result.length).toBe(5)
    expect(result).toEqual(describeObjectMap(deepReferenceObject))
  })
})
