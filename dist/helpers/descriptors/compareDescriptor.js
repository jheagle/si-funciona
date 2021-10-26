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
 * Check if two descriptors are the same or similar in that they have similar keys and the associated types are the same.
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor1
 * @param {module:objectDescriptors~descriptor} descriptor2
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