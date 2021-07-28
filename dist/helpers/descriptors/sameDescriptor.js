'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.array.includes.js')

require('core-js/modules/es.string.includes.js')

require('core-js/stable')

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
 *
 * @param {descriptor} descriptor1
 * @param {descriptor} descriptor2
 * @returns {boolean}
 */
const sameDescriptor = function sameDescriptor (descriptor1, descriptor2) {
  return descriptor1.details.every(function (detail, index) {
    return detail.value.some(function (dVal) {
      return descriptor2.details[index].value.includes(dVal)
    })
  })
}

const _default = sameDescriptor
exports.default = _default
