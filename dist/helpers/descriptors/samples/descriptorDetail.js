'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

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
 * @property {boolean} isInstance
 * @property {null|number} arrayReference
 * @property {null|number} objectReference
 */

/**
 * @type {descriptorDetail}
 */
const descriptorDetailSample = {
  index: 0,
  key: 'keyName',
  type: ['string'],
  value: [''],
  nullable: false,
  optional: false,
  circular: false,
  isReference: false,
  isInstance: false,
  arrayReference: null,
  objectReference: null
}
const _default = descriptorDetailSample
exports.default = _default
