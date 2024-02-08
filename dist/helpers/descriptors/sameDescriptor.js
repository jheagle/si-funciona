'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.async-iterator.every.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.every.js')
require('core-js/modules/esnext.async-iterator.some.js')
require('core-js/modules/esnext.iterator.some.js')
require('core-js/stable')
/**
 * Check if the two descriptors are the same.
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor1
 * @param {module:objectDescriptors~descriptor} descriptor2
 * @returns {boolean}
 */
const sameDescriptor = (descriptor1, descriptor2) => descriptor1.details.every((detail, index) => detail.value.some(dVal => descriptor2.details[index].value.includes(dVal)))
var _default = exports.default = sameDescriptor
