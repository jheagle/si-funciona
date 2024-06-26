'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.async-iterator.every.js')
require('core-js/modules/esnext.async-iterator.some.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.every.js')
require('core-js/modules/esnext.iterator.some.js')
require('core-js/stable')
var _setValue = _interopRequireDefault(require('../objects/setValue'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Check if the descriptors references have all been built and set complete to true if they have.
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor
 * @returns {module:objectDescriptors~descriptor}
 */
const checkDescriptorComplete = descriptor => (0, _setValue.default)('complete', descriptor.references.every(refId => [descriptor.details[refId].arrayReference, descriptor.details[refId].objectReference].some(ref => typeof ref === 'number')), descriptor)
var _default = exports.default = checkDescriptorComplete
