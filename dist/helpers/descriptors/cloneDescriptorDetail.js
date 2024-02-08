'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.async-iterator.for-each.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.for-each.js')
require('core-js/modules/esnext.async-iterator.map.js')
require('core-js/modules/esnext.iterator.map.js')
require('core-js/stable')
var _objectKeys = _interopRequireDefault(require('../objects/objectKeys'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Get a new copy of an existing Descriptor Detail
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptorDetail} originalDetail
 * @returns {module:objectDescriptors~descriptorDetail}
 */
const cloneDescriptorDetail = originalDetail => {
  const copyDetail = {};
  (0, _objectKeys.default)(originalDetail).forEach(key => {
    // @ts-ignore
    copyDetail[key] = Array.isArray(originalDetail[key]) ? originalDetail[key].map(value => value) : originalDetail[key]
  })
  return copyDetail
}
var _default = exports.default = cloneDescriptorDetail
