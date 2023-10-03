'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.async-iterator.every.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.every.js')
require('core-js/modules/web.dom-collections.iterator.js')
require('core-js/modules/esnext.async-iterator.some.js')
require('core-js/modules/esnext.iterator.some.js')
require('core-js/modules/esnext.async-iterator.find.js')
require('core-js/modules/esnext.iterator.find.js')
require('core-js/stable')
/**
 * Check if two descriptors are the same or similar in that they have similar keys and the associated types are the same.
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor1
 * @param {module:objectDescriptors~descriptor} descriptor2
 * @returns {boolean}
 */
const compareDescriptor = (descriptor1, descriptor2) => {
  if (descriptor1.isArray !== descriptor2.isArray) {
    return false
  }
  if (descriptor1.length === 0 || descriptor2.length === 0) {
    return descriptor1.length === descriptor2.length
  }
  const smallerDescriptor = descriptor1.length <= descriptor2.length ? descriptor1 : descriptor2
  const largerDescriptor = descriptor2.length >= descriptor1.length ? descriptor2 : descriptor1
  return smallerDescriptor.keys.every(key => largerDescriptor.keys.includes(key)) ? smallerDescriptor.details.every(detail => detail.type.some(type => largerDescriptor.details.find(foundDetail => foundDetail.key === detail.key).type.includes(type))) : false
}
var _default = exports.default = compareDescriptor
