'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.object.to-string.js')

require('core-js/modules/esnext.async-iterator.every.js')

require('core-js/modules/esnext.iterator.constructor.js')

require('core-js/modules/esnext.iterator.every.js')

require('core-js/modules/esnext.async-iterator.some.js')

require('core-js/modules/esnext.iterator.some.js')

require('core-js/modules/es.array.includes.js')

require('core-js/modules/es.string.includes.js')

require('core-js/stable')

/**
 * Check if the two descriptors are the same.
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor1
 * @param {module:objectDescriptors~descriptor} descriptor2
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
