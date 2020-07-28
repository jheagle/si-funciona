/**
 * Simplify working with object by providing array-like parsing. Also, provides cloning and merging along with accessors that always have a return value for optimal nesting.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module descriptorSamples
*/

/**
 * @typedef {Object} descriptorDetail
 * @property {number} index
 * @property {string|number} key
 * @property {Array.<string>} type
 * @property {Array} value
 * @property {boolean} nullable
 * @property {boolean} optional
 * @property {boolean} circular
 * @property {boolean} isReference
 * @property {null|number} arrayReference
 * @property {null|number} objectReference
 */

/**
 * @type {descriptorDetail}
 */
export const descriptorDetailSample = {
  index: 0,
  key: 'keyName',
  type: ['string'],
  value: [''],
  nullable: false,
  optional: false,
  circular: false,
  isReference: false,
  arrayReference: null,
  objectReference: null
}

/**
 * @typedef {Object} descriptor
 * @property {Array.<descriptorDetail>} details
 * @property {number} length
 * @property {Array.<string|number>} keys
 * @property {Array.<number>} references
 * @property {boolean} isArray
 * @property {boolean} complete
 */

/**
 * @type {descriptor}
 */
export const descriptorSample = {
  details: [descriptorDetailSample],
  length: 1,
  keys: [descriptorDetailSample.key],
  references: [],
  isArray: false,
  complete: true
}

/**
 * @typedef {Array.<descriptor>} descriptorMap
 */

/**
 * @type {descriptorMap}
 */
export const descriptorMapSample = [
  descriptorSample
]

/**
 * @type {descriptorMap}
 */
export const mappedDescriptorMap = [
  {
    details: [
      {
        index: 0,
        key: 'details',
        type: ['object'],
        value: [
          [
            {
              index: 0,
              key: 'keyName',
              type: ['string'],
              value: [''],
              nullable: false,
              optional: false,
              circular: false,
              isReference: false,
              arrayReference: null,
              objectReference: null
            }
          ]
        ],
        nullable: false,
        optional: false,
        circular: false,
        isReference: true,
        arrayReference: 1,
        objectReference: null
      },
      {
        index: 1,
        key: 'length',
        type: ['number'],
        value: [1],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        arrayReference: null,
        objectReference: null
      },
      {
        index: 2,
        key: 'keys',
        type: ['object'],
        value: [['keyName']],
        nullable: false,
        optional: false,
        circular: false,
        isReference: true,
        arrayReference: 2,
        objectReference: null
      },
      {
        index: 3,
        key: 'references',
        type: ['object'],
        value: [[]],
        nullable: false,
        optional: false,
        circular: false,
        isReference: true,
        arrayReference: 3,
        objectReference: null
      },
      {
        index: 4,
        key: 'isArray',
        type: ['boolean'],
        value: [false],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        arrayReference: null,
        objectReference: null
      },
      {
        index: 5,
        key: 'complete',
        type: ['boolean'],
        value: [true],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        arrayReference: null,
        objectReference: null
      }
    ],
    length: 6,
    keys: [
      'details',
      'length',
      'keys',
      'references',
      'isArray',
      'complete'
    ],
    references: [0, 2, 3],
    isArray: false,
    complete: false
  },
  {
    details: [
      {
        index: 0,
        key: 0,
        type: ['object'],
        value: [
          {
            index: 0,
            key: 'keyName',
            type: ['string'],
            value: [''],
            nullable: false,
            optional: false,
            circular: false,
            isReference: false,
            arrayReference: null,
            objectReference: null
          }
        ],
        nullable: false,
        optional: false,
        circular: false,
        isReference: true,
        arrayReference: null,
        objectReference: 4
      }
    ],
    length: 1,
    keys: [0],
    references: [0],
    isArray: true,
    complete: false
  },
  {
    details: [
      {
        index: 0,
        key: 0,
        type: ['string'],
        value: ['keyName'],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        arrayReference: null,
        objectReference: null
      }
    ],
    length: 1,
    keys: [0],
    references: [],
    isArray: true,
    complete: true
  },
  {
    details: [],
    length: 0,
    keys: [],
    references: [],
    isArray: true,
    complete: true
  },
  {
    details: [
      {
        index: 0,
        key: 'index',
        type: ['number'],
        value: [0],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        arrayReference: null,
        objectReference: null
      },
      {
        index: 1,
        key: 'key',
        type: ['string'],
        value: ['keyName'],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        arrayReference: null,
        objectReference: null
      },
      {
        index: 2,
        key: 'type',
        type: ['object'],
        value: [['string']],
        nullable: false,
        optional: false,
        circular: true,
        isReference: true,
        arrayReference: 2,
        objectReference: null
      },
      {
        index: 3,
        key: 'value',
        type: ['object'],
        value: [['']],
        nullable: false,
        optional: false,
        circular: true,
        isReference: true,
        arrayReference: 2,
        objectReference: null
      },
      {
        index: 4,
        key: 'nullable',
        type: ['boolean'],
        value: [false],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        arrayReference: null,
        objectReference: null
      },
      {
        index: 5,
        key: 'optional',
        type: ['boolean'],
        value: [false],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        arrayReference: null,
        objectReference: null
      },
      {
        index: 6,
        key: 'circular',
        type: ['boolean'],
        value: [false],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        arrayReference: null,
        objectReference: null
      },
      {
        index: 7,
        key: 'isReference',
        type: ['boolean'],
        value: [false],
        nullable: false,
        optional: false,
        circular: false,
        isReference: false,
        arrayReference: null,
        objectReference: null
      },
      {
        index: 8,
        key: 'arrayReference',
        type: [],
        value: [null],
        nullable: true,
        optional: false,
        circular: false,
        isReference: false,
        arrayReference: null,
        objectReference: null
      },
      {
        index: 9,
        key: 'objectReference',
        type: [],
        value: [null],
        nullable: true,
        optional: false,
        circular: false,
        isReference: false,
        arrayReference: null,
        objectReference: null
      }
    ],
    length: 10,
    keys: [
      'index',
      'key',
      'type',
      'value',
      'nullable',
      'optional',
      'circular',
      'isReference',
      'arrayReference',
      'objectReference'
    ],
    references: [2, 3],
    isArray: false,
    complete: false
  }
]
