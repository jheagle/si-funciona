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
  // @ts-ignore
  copyMap.index = originalMap.index || 0
  // @ts-ignore
  copyMap.details = originalMap.details.map(_cloneDescriptorDetail.default)
  // @ts-ignore
  copyMap.length = originalMap.length
  // @ts-ignore
  copyMap.keys = originalMap.keys.map(key => key)
  // @ts-ignore
  copyMap.references = originalMap.references.map(reference => reference)
  // @ts-ignore
  copyMap.isArray = originalMap.isArray
  // @ts-ignore
  copyMap.complete = originalMap.complete
  return copyMap
}
var _default = cloneDescriptor
exports.default = _default
