'use strict'

require('core-js/modules/es.object.define-property.js')

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

require('core-js/stable')

var _setValue = _interopRequireDefault(require('../objects/setValue'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * Check if the descriptors references have all been built and set complete to true if they have.
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor
 * @returns {module:objectDescriptors~descriptor}
 */
var checkDescriptorComplete = function checkDescriptorComplete (descriptor) {
  return (0, _setValue.default)('complete', descriptor.references.every(function (refId) {
    return [descriptor.details[refId].arrayReference, descriptor.details[refId].objectReference].some(function (ref) {
      return typeof ref === 'number'
    })
  }), descriptor)
}

var _default = checkDescriptorComplete
exports.default = _default
