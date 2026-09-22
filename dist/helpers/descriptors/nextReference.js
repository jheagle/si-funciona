'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.find.js')
const _objectKeys = _interopRequireDefault(require('../objects/objectKeys'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Find the index (within `descriptor.details`) of the next referenced property - after `currentReference` - whose
 * own nested object/array still needs its descriptor built. Used to walk through a descriptor's references one at
 * a time while building out a descriptorMap.
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor - The descriptor whose references to search.
 * @param {number} currentReference - The `details` index already processed - search continues after this one.
 * @returns {number|undefined} The next detail index to process, or `undefined` if none remain.
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
const _default = exports.default = nextReference
