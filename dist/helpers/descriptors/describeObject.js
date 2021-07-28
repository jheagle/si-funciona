'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.object.to-string.js')

require('core-js/stable')

const _assignDescriptorDetail = _interopRequireDefault(require('./assignDescriptorDetail'))

const _describeObjectDetail = _interopRequireDefault(require('./describeObjectDetail'))

const _objectKeys = _interopRequireDefault(require('../objects/objectKeys'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

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
 * @typedef {Object} descriptor
 * @property {number} index
 * @property {Array.<descriptorDetail>} details
 * @property {number} length
 * @property {Array.<string|number>} keys
 * @property {Array.<number>} references
 * @property {boolean} isArray
 * @property {boolean} complete
 */

/**
 * Trace an object and return the descriptor which defines the object's structure and attributes.
 * @function
 * @param {Object} object
 * @returns {descriptor}
 */
const describeObject = function describeObject (object) {
  const descriptor = {
    index: 0,
    details: [],
    length: 0,
    keys: [],
    references: [],
    isArray: false,
    complete: false
  }
  const keys = (0, _objectKeys.default)(object)

  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i]
    const newDetail = (0, _describeObjectDetail.default)(object[key], key, descriptor.length++)

    if (typeof key === 'number' && descriptor.details.length) {
      descriptor.details[0] = (0, _assignDescriptorDetail.default)(descriptor.details[0], newDetail)
      descriptor.keys = [0]

      if (newDetail.isReference) {
        descriptor.references = [0]
      }

      continue
    }

    descriptor.details.push(newDetail)
    descriptor.keys.push(newDetail.key)

    if (newDetail.isReference) {
      descriptor.references.push(newDetail.index)
    }
  }

  descriptor.isArray = Array.isArray(object)
  descriptor.complete = !descriptor.references.length
  return descriptor
}

const _default = describeObject
exports.default = _default
