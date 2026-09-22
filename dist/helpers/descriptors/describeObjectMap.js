'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.find.js')
require('core-js/modules/esnext.iterator.for-each.js')
const _assignDescriptor = _interopRequireDefault(require('./assignDescriptor'))
const _checkClearValues = _interopRequireDefault(require('./checkClearValues'))
const _checkDescriptorComplete = _interopRequireDefault(require('./checkDescriptorComplete'))
const _compareDescriptor = _interopRequireDefault(require('./compareDescriptor'))
const _describeObject = _interopRequireDefault(require('./describeObject'))
const _nextReference = _interopRequireDefault(require('./nextReference'))
const _sameDescriptor = _interopRequireDefault(require('./sameDescriptor'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Trace out the entire object including nested objects, producing a flat descriptorMap - see the
 * {@link module:objectDescriptors} module description for what a descriptor represents and why it's flat. This is
 * the main entry point into this module: start here to describe a real object/array before comparing, merging, or
 * inspecting its structure with the other functions in this module.
 * @example
 * describeObjectMap({ name: 'example', tags: ['a', 'b'] })
 * // [
 * //   { index: 0, details: [...], length: 2, keys: ['name', 'tags'], references: [1], isArray: false, complete: true },
 * //   { index: 1, details: [...], length: 2, keys: [0], references: [], isArray: true, complete: true }
 * // ]
 * // descriptorMap[0] describes the top-level object; its 'tags' property is a reference (references: [1]) to
 * // descriptorMap[1], which separately describes that nested array. descriptorMap[1]'s own `length` (2) reflects
 * // the array's actual length, but `keys` has only one entry (0) since both elements share the same type
 * // ('string') and are described together by a single, representative descriptorDetail.
 * @memberOf module:objectDescriptors
 * @param {Object|Array} object - The real object or array to describe.
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=1000000000] - Stop describing further nested references once the map reaches
 * this many descriptors - a safety limit for extremely large or deeply-referenced structures.
 * @param {number} [options.depthLimit=-1] - How many levels of nested objects/arrays to describe; `-1` means no
 * limit, `0` describes only the top level, etc.
 * @param {boolean} [options.keepValues=false] - By default, each detail's actual values are cleared once its
 * descriptor is complete (to save memory) - set true to keep them.
 * @returns {module:objectDescriptors~descriptorMap}
 */
const describeObjectMap = (object, {
  mapLimit = 1000000000,
  depthLimit = -1,
  keepValues = false
} = {}) => {
  const descriptorMap = [(0, _describeObject.default)(object)]
  descriptorMap[0].index = 0
  const describeReferences = (descriptor, currentDetail, limit = -1, returnCallback = returnMap => returnMap) => {
    let index = descriptorMap.length
    const nextRef = currentDetail ? (0, _nextReference.default)(descriptor, currentDetail.index) : undefined
    const nextDetail = typeof nextRef !== 'undefined' ? descriptor.details[nextRef] : null
    if (currentDetail) {
      const vals = descriptor.isArray ? currentDetail.value : [currentDetail.value[currentDetail.value.length - 1]]
      vals.forEach(val => {
        let _a, _b
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
const _default = exports.default = describeObjectMap
