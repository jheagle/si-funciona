'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.mappedTraceMap = exports.traceObjectMapSample = exports.objectMapSample = exports.mapDetailSample = void 0

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
 * @property {boolean} nullable
 * @property {boolean} optional
 * @property {boolean} circular
 * @property {boolean} isReference
 * @property {null|number} reference
 */

/**
 * @type {objectMapDetail}
 */
var mapDetailSample = {
  index: 0,
  key: 'keyName',
  type: ['string'],
  value: [''],
  nullable: false,
  optional: false,
  circular: false,
  isReference: false,
  reference: null
}
/**
 * @typedef {Object} objectMap
 * @property {Array.<objectMapDetail>} details
 * @property {number} length
 * @property {Array.<string|number>} keys
 * @property {Array.<number>} references
 * @property {boolean} isArray
 * @property {boolean} complete
 */

/**
 * @type {objectMap}
 */

exports.mapDetailSample = mapDetailSample
var objectMapSample = {
  details: [mapDetailSample],
  length: 1,
  keys: [mapDetailSample.key],
  references: [],
  isArray: false,
  complete: true
}
/**
 * @typedef {Array.<objectMap>} objectTraceMap
 */

/**
 * @type {objectTraceMap}
 */

exports.objectMapSample = objectMapSample
var traceObjectMapSample = [{
  details: [{
    index: 0,
    key: 'keyName',
    type: ['string'],
    value: [''],
    nullable: false,
    optional: false,
    circular: false,
    isReference: false,
    reference: null
  }],
  length: 1,
  keys: ['keyName'],
  references: [],
  isArray: false,
  complete: true
}]
/**
 * @type {objectTraceMap}
 */

exports.traceObjectMapSample = traceObjectMapSample
var mappedTraceMap = [{
  details: [{
    index: 0,
    key: 'details',
    type: ['object'],
    value: [[{
      index: 0,
      key: 'keyName',
      type: ['string'],
      value: [''],
      nullable: false,
      optional: false,
      circular: false,
      isReference: false,
      reference: null
    }]],
    nullable: false,
    optional: false,
    circular: false,
    isReference: true,
    reference: 1
  }, {
    index: 1,
    key: 'length',
    type: ['number'],
    value: [1],
    nullable: false,
    optional: false,
    circular: false,
    isReference: false,
    reference: null
  }, {
    index: 2,
    key: 'keys',
    type: ['object'],
    value: [['keyName']],
    nullable: false,
    optional: false,
    circular: false,
    isReference: true,
    reference: 2
  }, {
    index: 3,
    key: 'references',
    type: ['object'],
    value: [[]],
    nullable: false,
    optional: false,
    circular: true,
    isReference: true,
    reference: 0
  }, {
    index: 4,
    key: 'isArray',
    type: ['boolean'],
    value: [false],
    nullable: false,
    optional: false,
    circular: false,
    isReference: false,
    reference: null
  }, {
    index: 5,
    key: 'complete',
    type: ['boolean'],
    value: [true],
    nullable: false,
    optional: false,
    circular: false,
    isReference: false,
    reference: null
  }],
  length: 6,
  keys: ['details', 'length', 'keys', 'references', 'isArray', 'complete'],
  references: [0, 2, 3],
  isArray: false,
  complete: false
}, {
  details: [{
    index: 0,
    key: 0,
    type: ['object'],
    value: [{
      index: 0,
      key: 'keyName',
      type: ['string'],
      value: [''],
      nullable: false,
      optional: false,
      circular: false,
      isReference: false,
      reference: null
    }],
    nullable: false,
    optional: false,
    circular: false,
    isReference: true,
    reference: 3
  }],
  length: 1,
  keys: [0],
  references: [0],
  isArray: true,
  complete: false
}, {
  details: [{
    index: 0,
    key: 0,
    type: ['string'],
    value: ['keyName'],
    nullable: false,
    optional: false,
    circular: false,
    isReference: false,
    reference: null
  }],
  length: 1,
  keys: [0],
  references: [],
  isArray: true,
  complete: true
}, {
  details: [{
    index: 0,
    key: 'index',
    type: ['number'],
    value: [0],
    nullable: false,
    optional: false,
    circular: false,
    isReference: false,
    reference: null
  }, {
    index: 1,
    key: 'key',
    type: ['string'],
    value: ['keyName'],
    nullable: false,
    optional: false,
    circular: false,
    isReference: false,
    reference: null
  }, {
    index: 2,
    key: 'type',
    type: ['object'],
    value: [['string']],
    nullable: false,
    optional: false,
    circular: false,
    isReference: true,
    reference: 4
  }, {
    index: 3,
    key: 'value',
    type: ['object'],
    value: [['']],
    nullable: false,
    optional: false,
    circular: false,
    isReference: true,
    reference: 5
  }, {
    index: 4,
    key: 'nullable',
    type: ['boolean'],
    value: [false],
    nullable: false,
    optional: false,
    circular: false,
    isReference: false,
    reference: null
  }, {
    index: 5,
    key: 'optional',
    type: ['boolean'],
    value: [false],
    nullable: false,
    optional: false,
    circular: false,
    isReference: false,
    reference: null
  }, {
    index: 6,
    key: 'circular',
    type: ['boolean'],
    value: [false],
    nullable: false,
    optional: false,
    circular: false,
    isReference: false,
    reference: null
  }, {
    index: 7,
    key: 'isReference',
    type: ['boolean'],
    value: [false],
    nullable: false,
    optional: false,
    circular: false,
    isReference: false,
    reference: null
  }, {
    index: 8,
    key: 'reference',
    type: [],
    value: [null],
    nullable: true,
    optional: false,
    circular: false,
    isReference: false,
    reference: null
  }],
  length: 9,
  keys: ['index', 'key', 'type', 'value', 'nullable', 'optional', 'circular', 'isReference', 'reference'],
  references: [2, 3],
  isArray: false,
  complete: false
}, {
  details: [{
    index: 0,
    key: 0,
    type: ['string'],
    value: ['string'],
    nullable: false,
    optional: false,
    circular: false,
    isReference: false,
    reference: null
  }],
  length: 1,
  keys: [0],
  references: [],
  isArray: true,
  complete: true
}, {
  details: [{
    index: 0,
    key: 0,
    type: ['string'],
    value: [''],
    nullable: false,
    optional: false,
    circular: false,
    isReference: false,
    reference: null
  }],
  length: 1,
  keys: [0],
  references: [],
  isArray: true,
  complete: true
}]
exports.mappedTraceMap = mappedTraceMap
