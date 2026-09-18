'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.map.js')
require('core-js/stable')
var _setValue = _interopRequireDefault(require('../objects/setValue'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Check if we should clear the values on this descriptor
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor
 * @param {boolean} [keepValues=false]
 * @returns {module:objectDescriptors~descriptor}
 */
const checkClearValues = (descriptor, keepValues = false) => (0, _setValue.default)('details', descriptor.complete && !keepValues ? descriptor.details.map(detail => (0, _setValue.default)('value', [], detail)) : descriptor.details, descriptor)
var _default = exports.default = checkClearValues
