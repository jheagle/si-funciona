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
 * Once a descriptor is complete (all its references have been resolved), its details' actual `value` arrays are no
 * longer needed to build the descriptor further - clear them to save memory, unless `keepValues` says otherwise.
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor - The descriptor to check.
 * @param {boolean} [keepValues=false] - Set true to keep the values even once the descriptor is complete.
 * @returns {module:objectDescriptors~descriptor} The same descriptor, with `details[].value` cleared if applicable.
 */
const checkClearValues = (descriptor, keepValues = false) => (0, _setValue.default)('details', descriptor.complete && !keepValues ? descriptor.details.map(detail => (0, _setValue.default)('value', [], detail)) : descriptor.details, descriptor)
var _default = exports.default = checkClearValues
