/**
 * Simplify working with object by providing array-like parsing. Also, provides cloning and merging along with accessors that always have a return value for optimal nesting.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module traceObject
 */

/**
 * @typedef {Object} objectMapDetail
 * @property {number} index
 * @property {string|number} key
 * @property {Array.<string>} type
 * @property {Array} value
 * @property {boolean} isReference
 * @property {null|number} reference
 */

/**
 * @type {objectMapDetail}
 */
export const mapDetailSample = {
  index: 0,
  key: 'keyName',
  type: ['array', 'boolean', 'function', 'number', 'object', 'string', 'undefined'],
  value: [''],
  isReference: false,
  reference: null
}

/**
 * @typedef {Object} objectMap
 * @property {Array.<objectMapDetail>} details
 * @property {number} length
 * @property {Array.<string|number>} keys
 * @property {Array.<Array.<string>>} types
 * @property {Array.<number>} references
 * @property {boolean} complete
 */

/**
 * @type {objectMap}
 */
export const objectMapSample = {
  details: [mapDetailSample],
  length: 1,
  keys: [mapDetailSample.key],
  types: [mapDetailSample.type],
  references: [],
  complete: true
}

/**
 * @typedef {Array.<objectMap>} objectTraceMap
 */

/**
 * @type {objectTraceMap}
 */
export const traceMapSample = [
  {
    details: [
      {
        index: 0,
        key: 'details',
        type: ['array'],
        value: [objectMapSample.details],
        isReference: true,
        reference: 1
      },
      {
        index: 1,
        key: 'length',
        type: ['number'],
        value: [objectMapSample.length],
        isReference: false,
        reference: null
      },
      {
        index: 2,
        key: 'keys',
        type: ['array'],
        value: [objectMapSample.keys],
        isReference: true,
        reference: 2
      },
      {
        index: 3,
        key: 'types',
        type: ['array'],
        value: [objectMapSample.types],
        isReference: true,
        reference: 3
      },
      {
        index: 4,
        key: 'references',
        type: ['array'],
        value: [objectMapSample.references],
        isReference: true,
        reference: 4
      },
      {
        index: 5,
        key: 'complete',
        type: ['boolean'],
        value: [objectMapSample.complete],
        isReference: false,
        reference: null
      }
    ],
    length: 6,
    keys: (new Set(['details', 'length', 'keys', 'types', 'references', 'complete'])),
    types: (new Set([['array'], ['number'], ['boolean']])),
    references: (new Set([0, 2, 3, 4])),
    complete: true
  },
  {
    details: [
      {
        index: 0,
        key: 0,
        type: ['object'],
        value: [mapDetailSample],
        isReference: true,
        reference: 5
      }
    ],
    length: 1,
    keys: (new Set([0])),
    types: (new Set([['object']])),
    references: (new Set([0])),
    complete: true
  },
  {
    details: [
      {
        index: 0,
        key: 0,
        type: ['number', 'string'],
        value: [mapDetailSample.key],
        isReference: false,
        reference: null
      }
    ],
    length: 1,
    keys: (new Set([0])),
    types: (new Set([['number', 'string']])),
    references: (new Set()),
    complete: true
  },
  {
    details: [
      {
        index: 0,
        key: 0,
        type: ['array'],
        value: [mapDetailSample.type],
        isReference: true,
        reference: 6
      }
    ],
    length: 1,
    keys: (new Set([0])),
    types: (new Set([['array']])),
    references: (new Set([0])),
    complete: true
  },
  {
    details: [
      {
        index: 0,
        key: 0,
        type: ['number'],
        value: [],
        isReference: false,
        reference: null
      }
    ],
    length: 1,
    keys: (new Set([0])),
    types: (new Set([['number']])),
    references: (new Set()),
    complete: true
  },
  {
    details: [
      {
        index: 0,
        key: 'index',
        type: ['number'],
        value: [0],
        isReference: false,
        reference: null
      },
      {
        index: 1,
        key: 'key',
        type: ['string', 'number'],
        value: [0],
        isReference: false,
        reference: null
      },
      {
        index: 2,
        key: 'type',
        type: ['array'],
        value: [mapDetailSample.type],
        isReference: true,
        reference: 6
      },
      {
        index: 3,
        key: 'value',
        type: ['array'],
        value: [mapDetailSample.value],
        isReference: true,
        reference: 7
      },
      {
        index: 4,
        key: 'isReference',
        type: ['boolean'],
        value: [false],
        isReference: false,
        reference: null
      },
      {
        index: 5,
        key: 'reference',
        type: ['null', 'number'],
        value: [null],
        isReference: false,
        reference: null
      }
    ],
    length: 6,
    keys: (new Set(['index', 'key', 'type', 'value', 'isReference', 'reference'])),
    types: (new Set([['number'], ['string', 'number'], ['array'], ['array'], ['boolean'], ['null', 'number']])),
    references: (new Set([2, 3])),
    complete: true
  },
  {
    details: [
      {
        index: 0,
        key: 0,
        type: ['string'],
        value: ['array'],
        isReference: false,
        reference: null
      },
      {
        index: 1,
        key: 1,
        type: ['string'],
        value: ['boolean'],
        isReference: false,
        reference: null
      },
      {
        index: 2,
        key: 2,
        type: ['string'],
        value: ['function'],
        isReference: false,
        reference: null
      },
      {
        index: 3,
        key: 3,
        type: ['string'],
        value: ['number'],
        isReference: false,
        reference: null
      },
      {
        index: 4,
        key: 4,
        type: ['string'],
        value: ['object'],
        isReference: false,
        reference: null
      },
      {
        index: 5,
        key: 5,
        type: ['string'],
        value: ['string'],
        isReference: false,
        reference: null
      },
      {
        index: 6,
        key: 6,
        type: ['string'],
        value: ['undefined'],
        isReference: false,
        reference: null
      }
    ],
    length: 7,
    keys: (new Set([0, 1, 2, 3, 4, 5, 6])),
    types: (new Set([['string']])),
    references: (new Set([])),
    complete: true
  },
  {
    details: [
      {
        index: 0,
        key: 0,
        type: ['string'],
        value: [''],
        isReference: false,
        reference: null
      }
    ],
    length: 1,
    keys: (new Set([0])),
    types: (new Set([['string']])),
    references: (new Set()),
    complete: true
  }
]
