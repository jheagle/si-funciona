'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

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
 * Check if the descriptors references have all been built and set complete to true if they have.
 * @param {descriptor} descriptor
 * @returns {descriptor}
 */
const checkDescriptorComplete = function checkDescriptorComplete (descriptor) {
  return (0, _setValue.default)('complete', descriptor.references.every(function (refId) {
    return [descriptor.details[refId].arrayReference, descriptor.details[refId].objectReference].some(function (ref) {
      return typeof ref === 'number'
    })
  }), descriptor)
}

const _default = checkDescriptorComplete
exports.default = _default
