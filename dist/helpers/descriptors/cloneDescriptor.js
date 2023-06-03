'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.async-iterator.map.js')
require('core-js/modules/esnext.iterator.map.js')
require('core-js/modules/web.dom-collections.iterator.js')
require('core-js/stable')
var _cloneDescriptorDetail = _interopRequireDefault(require('./cloneDescriptorDetail'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Make a copy of an object descriptor so that the original will not be mutated.
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} originalMap
 * @returns {module:objectDescriptors~descriptor}
 */
const cloneDescriptor = originalMap => {
  const copyMap = {}
  copyMap.index = originalMap.index || 0
  copyMap.details = originalMap.details.map(_cloneDescriptorDetail.default)
  copyMap.length = originalMap.length
  copyMap.keys = originalMap.keys.map(key => key)
  copyMap.references = originalMap.references.map(reference => reference)
  copyMap.isArray = originalMap.isArray
  copyMap.complete = originalMap.complete
  return copyMap
}
var _default = cloneDescriptor
exports.default = _default
