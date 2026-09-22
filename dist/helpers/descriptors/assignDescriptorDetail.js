'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.reduce.js')
const _cloneDescriptorDetail = _interopRequireDefault(require('./cloneDescriptorDetail'))
const _uniqueArray = _interopRequireDefault(require('../arrays/uniqueArray'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Assign properties from other details onto an existing detail, widening it (e.g. combining `type`/`value` arrays,
 * OR-ing boolean flags like `nullable`/`optional`) rather than overwriting it - the per-property counterpart to
 * {@link module:objectDescriptors.assignDescriptor}.
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptorDetail} originalDetail - The base detail to merge onto (not mutated -
 * a clone is merged and returned).
 * @param  {...module:objectDescriptors~descriptorDetail} details - One or more further details to merge in.
 * @returns {module:objectDescriptors~descriptorDetail} A new detail representing the merge of all of the above.
 */
const assignDescriptorDetail = (originalDetail, ...details) => details.reduce((existingDetail, newDetail) => {
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
const _default = exports.default = assignDescriptorDetail
