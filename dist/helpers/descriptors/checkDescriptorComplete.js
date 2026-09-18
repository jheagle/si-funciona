'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.every.js')
require('core-js/stable')
var _setValue = _interopRequireDefault(require('../objects/setValue'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Check if every property this descriptor references (i.e. every nested object/array it points to) has actually
 * had its own descriptor built yet, and set the descriptor's `complete` flag to true if so.
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor - The descriptor to check.
 * @returns {module:objectDescriptors~descriptor} The same descriptor, with `complete` updated.
 */
const checkDescriptorComplete = descriptor => (0, _setValue.default)('complete', descriptor.references.every(refId => [descriptor.details[refId].arrayReference, descriptor.details[refId].objectReference].some(ref => typeof ref === 'number')), descriptor)
var _default = exports.default = checkDescriptorComplete
