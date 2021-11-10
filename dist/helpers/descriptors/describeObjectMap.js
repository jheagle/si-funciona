'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.object.to-string.js')

require('core-js/modules/esnext.async-iterator.for-each.js')

require('core-js/modules/esnext.iterator.constructor.js')

require('core-js/modules/esnext.iterator.for-each.js')

require('core-js/modules/web.dom-collections.for-each.js')

require('core-js/modules/es.array.find-index.js')

require('core-js/modules/es.array.find.js')

require('core-js/modules/esnext.async-iterator.find.js')

require('core-js/modules/esnext.iterator.find.js')

require('core-js/stable')

const _assignDescriptor = _interopRequireDefault(require('./assignDescriptor'))

const _checkClearValues = _interopRequireDefault(require('./checkClearValues'))

const _checkDescriptorComplete = _interopRequireDefault(require('./checkDescriptorComplete'))

const _compareDescriptor = _interopRequireDefault(require('./compareDescriptor'))

const _describeObject = _interopRequireDefault(require('./describeObject'))

const _nextReference = _interopRequireDefault(require('./nextReference'))

const _sameDescriptor = _interopRequireDefault(require('./sameDescriptor'))

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
const describeObjectMap = function describeObjectMap (object) {
  const _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  const _ref$mapLimit = _ref.mapLimit
  const mapLimit = _ref$mapLimit === void 0 ? 1000000000 : _ref$mapLimit
  const _ref$depthLimit = _ref.depthLimit
  const depthLimit = _ref$depthLimit === void 0 ? -1 : _ref$depthLimit
  const _ref$keepValues = _ref.keepValues
  const keepValues = _ref$keepValues === void 0 ? false : _ref$keepValues

  const descriptorMap = [(0, _describeObject.default)(object)]
  descriptorMap[0].index = 0

  const describeReferences = function describeReferences (descriptor, currentDetail) {
    let limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1
    const returnCallback = arguments.length > 3 && arguments[3] !== undefined
      ? arguments[3]
      : function (returnMap) {
        return returnMap
      }
    let index = descriptorMap.length
    const nextRef = currentDetail ? (0, _nextReference.default)(descriptor, currentDetail.index) : undefined
    const nextDetail = typeof nextRef !== 'undefined' ? descriptor.details[nextRef] : null

    if (currentDetail) {
      const vals = descriptor.isArray ? currentDetail.value : [currentDetail.value[currentDetail.value.length - 1]]
      vals.forEach(function (val) {
        const tempDescriptor = (0, _describeObject.default)(val)
        const existingDescriptorIndex = descriptorMap.findIndex(function (existingDescriptor) {
          return (0, _compareDescriptor.default)(tempDescriptor, existingDescriptor)
        })

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
          let _currentDetail$arrayR

          index = (_currentDetail$arrayR = currentDetail.arrayReference) !== null && _currentDetail$arrayR !== void 0 ? _currentDetail$arrayR : index
          descriptor.details[currentDetail.index].arrayReference = index
        } else {
          let _currentDetail$object

          index = (_currentDetail$object = currentDetail.objectReference) !== null && _currentDetail$object !== void 0 ? _currentDetail$object : index
          descriptor.details[currentDetail.index].objectReference = index
        }

        tempDescriptor.index = index

        if (existingDescriptorIndex < 0) {
          descriptorMap[index] = descriptorMap[index] ? (0, _assignDescriptor.default)(descriptorMap[index], tempDescriptor) : tempDescriptor
        }

        descriptorMap[descriptor.index] = (0, _assignDescriptor.default)(descriptorMap[descriptor.index], descriptor)
        currentDetail = descriptorMap[descriptor.index].details.find(function (detail) {
          return detail.key === currentDetail.key
        })

        if (!currentDetail.circular) {
          const newReference = (0, _nextReference.default)(tempDescriptor, -1)
          const newDetail = typeof newReference !== 'undefined' ? tempDescriptor.details[newReference] : null
          return describeReferences(tempDescriptor, newDetail, --limit, function (returnMap) {
            return describeReferences(descriptor, nextDetail, --limit)
          })
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

const _default = describeObjectMap
exports.default = _default
