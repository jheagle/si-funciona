'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.every.js')
require('core-js/modules/esnext.iterator.filter.js')
require('core-js/modules/esnext.iterator.find.js')
require('core-js/modules/esnext.iterator.for-each.js')
require('core-js/modules/esnext.iterator.map.js')
require('core-js/modules/esnext.iterator.reduce.js')
require('core-js/stable')
var _assignDescriptorDetail = _interopRequireDefault(require('./assignDescriptorDetail'))
var _cloneDescriptor = _interopRequireDefault(require('./cloneDescriptor'))
var _compareArrays = _interopRequireDefault(require('../arrays/compareArrays'))
var _uniqueArray = _interopRequireDefault(require('../arrays/uniqueArray'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Apply one or more descriptors to an existing descriptor so that they represent a merged version of the descriptors.
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} originalMap
 * @param  {...module:objectDescriptors~descriptor} descriptors
 * @returns {module:objectDescriptors~descriptor}
 */
const assignDescriptor = function (originalMap) {
  for (var _len = arguments.length, descriptors = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    descriptors[_key - 1] = arguments[_key]
  }
  return descriptors.reduce((assignedDescriptor, descriptor) => {
    const detailsDiff = (0, _compareArrays.default)(assignedDescriptor.keys, descriptor.keys)
    detailsDiff.forEach(diff => {
      const existingDetail = assignedDescriptor.details.find(detail => detail.key === diff.value)
      const newDetail = descriptor.details.find(detail => detail.key === diff.value)
      if (diff.result.every(result => result === 0)) {
        assignedDescriptor.details[existingDetail.index] = (0, _assignDescriptorDetail.default)(existingDetail, newDetail)
        return assignedDescriptor
      }
      const useDetail = diff.result[0] > 0 ? existingDetail : newDetail
      if (!useDetail) {
        assignedDescriptor.details[existingDetail.index].optional = true
        return assignedDescriptor
      }
      const useIndex = diff.result[0] > 0 ? useDetail.index : assignedDescriptor.length
      assignedDescriptor.details[useIndex] = Object.assign({}, useDetail, {
        index: useIndex,
        optional: true
      })
      assignedDescriptor.length = assignedDescriptor.length < assignedDescriptor.details.length ? assignedDescriptor.details.length : assignedDescriptor.length
      return assignedDescriptor
    })
    assignedDescriptor.keys = (0, _uniqueArray.default)(assignedDescriptor.details.map(detail => detail.key))
    assignedDescriptor.references = (0, _uniqueArray.default)(assignedDescriptor.details.filter(detail => detail.isReference).map(detail => detail.index))
    assignedDescriptor.isArray = assignedDescriptor.length ? assignedDescriptor.details.every(detail => typeof detail.key === 'number') : assignedDescriptor.isArray
    assignedDescriptor.complete = !assignedDescriptor.references.length || assignedDescriptor.complete || descriptor.complete
    return assignedDescriptor
  }, (0, _cloneDescriptor.default)(originalMap))
}
var _default = exports.default = assignDescriptor
