'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.array.map.js')

require('core-js/stable')

const _setValue = _interopRequireDefault(require('../objects/setValue'))

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
 * Check if we should clear the values on this descriptor
 * @param {descriptor} descriptor
 * @param {boolean} [keepValues=false]
 * @returns {descriptor}
 */
const checkClearValues = function checkClearValues (descriptor) {
  const keepValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false
  return (0, _setValue.default)('details', descriptor.complete && !keepValues
    ? descriptor.details.map(function (detail) {
      return (0, _setValue.default)('value', [], detail)
    })
    : descriptor.details, descriptor)
}

const _default = checkClearValues
exports.default = _default
