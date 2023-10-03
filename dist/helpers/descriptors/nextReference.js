'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.async-iterator.find.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.find.js')
require('core-js/stable')
var _objectKeys = _interopRequireDefault(require('../objects/objectKeys'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Find the index of the next module:objectDescriptors.descriptorDetail to build a resource for.
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor
 * @param {number} currentReference
 * @returns {number|undefined}
 */
const nextReference = (descriptor, currentReference) => descriptor.references.find(nextRef => {
  if (nextRef <= currentReference) {
    return false
  }
  const val = descriptor.details[nextRef].value[descriptor.details[nextRef].value.length - 1]
  if (typeof val !== 'object' || val === null || typeof val === 'undefined' || descriptor.details[nextRef].circular || descriptor.details[nextRef].isInstance) {
    return false
  }
  return !!(0, _objectKeys.default)(val).length
})
var _default = exports.default = nextReference
