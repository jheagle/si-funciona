import { descriptorMap } from './descriptorMap'

/**
 * @type {module:objectDescriptors~descriptorMap}
 * @memberOf module:objectDescriptors
 */
const mappedDescriptorMap: descriptorMap = [
  {
    index: 0,
    details: [
      {
        index: 0,
        key: 'index',
        type: ['number'],
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
        key: 'details',
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
        index: 2,
        key: 'length',
        type: ['number'],
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
        index: 3,
        key: 'keys',
        type: ['object'],
        value: [],
        nullable: false,
        optional: false,
        circular: false,
        isReference: true,
        isInstance: false,
        arrayReference: 3,
        objectReference: null
      },
      {
        index: 4,
        key: 'references',
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
        key: 'isArray',
        type: ['boolean'],
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
        key: 'complete',
        type: ['boolean'],
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
      'index',
      'details',
      'length',
      'keys',
      'references',
      'isArray',
      'complete'
    ],
    references: [1, 3],
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
        objectReference: 2
      }
    ],
    length: 1,
    keys: [0],
    references: [0],
    isArray: true,
    complete: true
  },
  {
    index: 2,
    details: [
      {
        index: 0,
        key: 'index',
        type: ['number'],
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
        key: 'key',
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
        key: 'type',
        type: ['object'],
        value: [],
        nullable: false,
        optional: false,
        circular: false,
        isReference: true,
        isInstance: false,
        arrayReference: 3,
        objectReference: null
      },
      {
        index: 3,
        key: 'value',
        type: ['object'],
        value: [],
        nullable: false,
        optional: false,
        circular: false,
        isReference: true,
        isInstance: false,
        arrayReference: 3,
        objectReference: null
      },
      {
        index: 4,
        key: 'nullable',
        type: ['boolean'],
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
        key: 'optional',
        type: ['boolean'],
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
        key: 'circular',
        type: ['boolean'],
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
        key: 'isReference',
        type: ['boolean'],
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
        index: 8,
        key: 'isInstance',
        type: ['boolean'],
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
        index: 9,
        key: 'arrayReference',
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
        index: 10,
        key: 'objectReference',
        type: ['object'],
        value: [],
        nullable: true,
        optional: false,
        circular: false,
        isReference: false,
        isInstance: false,
        arrayReference: null,
        objectReference: null
      }
    ],
    length: 11,
    keys: [
      'index',
      'key',
      'type',
      'value',
      'nullable',
      'optional',
      'circular',
      'isReference',
      'isInstance',
      'arrayReference',
      'objectReference'
    ],
    references: [2, 3],
    isArray: false,
    complete: true
  },
  {
    index: 3,
    details: [
      {
        index: 0,
        key: 0,
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
    length: 1,
    keys: [0],
    references: [],
    isArray: true,
    complete: true
  }
]

export default mappedDescriptorMap
