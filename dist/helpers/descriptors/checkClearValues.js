'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.array.map.js')

require('core-js/modules/esnext.async-iterator.map.js')

require('core-js/modules/esnext.iterator.map.js')

require('core-js/stable')

const _setValue = _interopRequireDefault(require('../objects/setValue'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * Check if we should clear the values on this descriptor
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor
 * @param {boolean} [keepValues=false]
 * @returns {module:objectDescriptors~descriptor}
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
