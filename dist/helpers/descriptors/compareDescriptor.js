'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.array.iterator.js')

require('core-js/modules/es.object.to-string.js')

require('core-js/modules/web.dom-collections.iterator.js')

require('core-js/modules/es.array.includes.js')

require('core-js/modules/es.string.includes.js')

require('core-js/modules/es.array.find.js')

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
 * Check if two descriptors are the same or similar in that they have similar keys and the associated types are the same.
 * @function
 * @param {descriptor} descriptor1
 * @param {descriptor} descriptor2
 * @returns {boolean}
 */
const compareDescriptor = function compareDescriptor (descriptor1, descriptor2) {
  if (descriptor1.isArray !== descriptor2.isArray) {
    return false
  }

  if (descriptor1.length === 0 || descriptor2.length === 0) {
    return descriptor1.length === descriptor2.length
  }

  const smallerDescriptor = descriptor1.length <= descriptor2.length ? descriptor1 : descriptor2
  const largerDescriptor = descriptor2.length >= descriptor1.length ? descriptor2 : descriptor1
  return smallerDescriptor.keys.every(function (key) {
    return largerDescriptor.keys.includes(key)
  })
    ? smallerDescriptor.details.every(function (detail) {
      return detail.type.some(function (type) {
        return largerDescriptor.details.find(function (foundDetail) {
          return foundDetail.key === detail.key
        }).type.includes(type)
      })
    })
    : false
}

const _default = compareDescriptor
exports.default = _default
