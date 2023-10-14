'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.async-iterator.reduce.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.reduce.js')
require('core-js/modules/esnext.async-iterator.find.js')
require('core-js/modules/esnext.iterator.find.js')
require('core-js/stable')
var _cloneDescriptorDetail = _interopRequireDefault(require('./cloneDescriptorDetail'))
var _uniqueArray = _interopRequireDefault(require('../arrays/uniqueArray'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Assign properties from other details onto an existing detail.
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptorDetail} originalDetail
 * @param  {...module:objectDescriptors~descriptorDetail} details
 * @returns {module:objectDescriptors~descriptorDetail}
 */
const assignDescriptorDetail = function (originalDetail) {
  for (var _len = arguments.length, details = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    details[_key - 1] = arguments[_key]
  }
  return details.reduce((existingDetail, newDetail) => {
    existingDetail.type = (0, _uniqueArray.default)([...existingDetail.type, ...newDetail.type])
    existingDetail.value = (0, _uniqueArray.default)([...existingDetail.value, ...newDetail.value])
    existingDetail.nullable = existingDetail.nullable || newDetail.nullable
    existingDetail.optional = existingDetail.optional || newDetail.optional
    existingDetail.circular = existingDetail.circular || newDetail.circular
    existingDetail.isReference = existingDetail.isReference || newDetail.isReference
    existingDetail.isInstance = existingDetail.isInstance || newDetail.isInstance
    existingDetail.arrayReference = [existingDetail.arrayReference, newDetail.arrayReference].find(ref => typeof ref === 'number')
    existingDetail.objectReference = [existingDetail.objectReference, newDetail.objectReference].find(ref => typeof ref === 'number')
    existingDetail.arrayReference = typeof existingDetail.arrayReference === 'undefined' ? null : existingDetail.arrayReference
    existingDetail.objectReference = typeof existingDetail.objectReference === 'undefined' ? null : existingDetail.objectReference
    return existingDetail
  }, (0, _cloneDescriptorDetail.default)(originalDetail))
}
var _default = exports.default = assignDescriptorDetail
