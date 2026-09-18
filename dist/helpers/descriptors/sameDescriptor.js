'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/es.array.includes.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.every.js')
require('core-js/modules/esnext.iterator.some.js')
require('core-js/stable')
/**
 * Check if two descriptors describe the exact same underlying values (not just compatible types, like
 * {@link module:objectDescriptors.compareDescriptor} does) - used to detect genuine circular references, where a
 * nested value's descriptor turns out to be identical to one of its own ancestors.
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor1 - The first descriptor to compare.
 * @param {module:objectDescriptors~descriptor} descriptor2 - The second descriptor to compare.
 * @returns {boolean} True if every detail's values match at the same position.
 */
const sameDescriptor = (descriptor1, descriptor2) => descriptor1.details.every((detail, index) => detail.value.some(dVal => descriptor2.details[index].value.includes(dVal)))
var _default = exports.default = sameDescriptor
