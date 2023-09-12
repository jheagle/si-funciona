'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.async-iterator.for-each.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.for-each.js')
require('core-js/modules/esnext.async-iterator.find.js')
require('core-js/modules/esnext.iterator.find.js')
require('core-js/stable')
var _assignDescriptor = _interopRequireDefault(require('./assignDescriptor'))
var _checkClearValues = _interopRequireDefault(require('./checkClearValues'))
var _checkDescriptorComplete = _interopRequireDefault(require('./checkDescriptorComplete'))
var _compareDescriptor = _interopRequireDefault(require('./compareDescriptor'))
var _describeObject = _interopRequireDefault(require('./describeObject'))
var _nextReference = _interopRequireDefault(require('./nextReference'))
var _sameDescriptor = _interopRequireDefault(require('./sameDescriptor'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Trace out the entire object including nested objects.
 * @function
 * @memberOf module:objectDescriptors
 * @param {Object|Array} object
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=1000000000]
 * @param {number} [options.depthLimit=-1]
 * @param {boolean} [options.keepValues=false]
 * @returns {module:objectDescriptors~descriptorMap}
 */
const describeObjectMap = function (object) {
  const {
    mapLimit = 1000000000,
    depthLimit = -1,
    keepValues = false
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  const descriptorMap = [(0, _describeObject.default)(object)]
  descriptorMap[0].index = 0
  const describeReferences = function (descriptor, currentDetail) {
    let limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1
    const returnCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : returnMap => returnMap
    let index = descriptorMap.length
    const nextRef = currentDetail ? (0, _nextReference.default)(descriptor, currentDetail.index) : undefined
    const nextDetail = typeof nextRef !== 'undefined' ? descriptor.details[nextRef] : null
    if (currentDetail) {
      const vals = descriptor.isArray ? currentDetail.value : [currentDetail.value[currentDetail.value.length - 1]]
      vals.forEach(val => {
        var _a, _b
        const tempDescriptor = (0, _describeObject.default)(val)
        const existingDescriptorIndex = descriptorMap.findIndex(existingDescriptor => (0, _compareDescriptor.default)(tempDescriptor, existingDescriptor))
        if (existingDescriptorIndex >= 0) {
          index = existingDescriptorIndex
          if (tempDescriptor.length && (0, _sameDescriptor.default)(tempDescriptor, descriptorMap[existingDescriptorIndex])) {
            currentDetail.circular = true
            descriptor.details[currentDetail.index] = currentDetail
          }
        }
        if (index >= mapLimit) {
          return descriptorMap
        }
        if (limit === 0) {
          return descriptorMap
        }
        if (tempDescriptor.isArray) {
          index = (_a = currentDetail.arrayReference) !== null && _a !== void 0 ? _a : index
          descriptor.details[currentDetail.index].arrayReference = index
        } else {
          index = (_b = currentDetail.objectReference) !== null && _b !== void 0 ? _b : index
          descriptor.details[currentDetail.index].objectReference = index
        }
        tempDescriptor.index = index
        if (existingDescriptorIndex < 0) {
          descriptorMap[index] = descriptorMap[index] ? (0, _assignDescriptor.default)(descriptorMap[index], tempDescriptor) : tempDescriptor
        }
        descriptorMap[descriptor.index] = (0, _assignDescriptor.default)(descriptorMap[descriptor.index], descriptor)
        currentDetail = descriptorMap[descriptor.index].details.find(detail => detail.key === currentDetail.key)
        if (!currentDetail.circular) {
          const newReference = (0, _nextReference.default)(tempDescriptor, -1)
          const newDetail = typeof newReference !== 'undefined' ? tempDescriptor.details[newReference] : null
          return describeReferences(tempDescriptor, newDetail, --limit, returnMap => describeReferences(descriptor, nextDetail, --limit))
        }
      })
    }
    descriptorMap[descriptor.index] = (0, _assignDescriptor.default)(descriptorMap[descriptor.index], (0, _checkDescriptorComplete.default)(descriptor))
    descriptorMap[descriptor.index] = (0, _checkClearValues.default)(descriptorMap[descriptor.index], keepValues)
    return nextDetail ? describeReferences(descriptor, nextDetail, --limit) : returnCallback(descriptorMap)
  }
  const descriptor = descriptorMap[0]
  const currentReference = (0, _nextReference.default)(descriptor, -1)
  if (typeof currentReference === 'undefined') {
    descriptorMap[0] = (0, _assignDescriptor.default)(descriptorMap[0], (0, _checkDescriptorComplete.default)(descriptor))
    descriptorMap[0] = (0, _checkClearValues.default)(descriptorMap[0], keepValues)
    return descriptorMap
  }
  return describeReferences(descriptor, descriptor.details[currentReference], depthLimit)
}
var _default = describeObjectMap
exports.default = _default
