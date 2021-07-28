'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.array.map.js')

require('core-js/modules/es.object.to-string.js')

require('core-js/modules/es.array.iterator.js')

require('core-js/modules/web.dom-collections.iterator.js')

require('core-js/stable')

const _cloneDescriptorDetail = _interopRequireDefault(require('./cloneDescriptorDetail'))

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
 * Make a copy of an object descriptor so that the original will not be mutated.
 * @function
 * @param {descriptor} originalMap
 * @returns {descriptor}
 */
const cloneDescriptor = function cloneDescriptor (originalMap) {
  const copyMap = {}
  copyMap.index = originalMap.index || 0
  copyMap.details = originalMap.details.map(_cloneDescriptorDetail.default)
  copyMap.length = originalMap.length
  copyMap.keys = originalMap.keys.map(function (key) {
    return key
  })
  copyMap.references = originalMap.references.map(function (reference) {
    return reference
  })
  copyMap.isArray = originalMap.isArray
  copyMap.complete = originalMap.complete
  return copyMap
}

const _default = cloneDescriptor
exports.default = _default
