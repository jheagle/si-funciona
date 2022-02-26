'use strict'

require('core-js/modules/es.object.define-property.js')

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
var describeObjectMap = function describeObjectMap (object) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  var _ref$mapLimit = _ref.mapLimit
  var mapLimit = _ref$mapLimit === void 0 ? 1000000000 : _ref$mapLimit
  var _ref$depthLimit = _ref.depthLimit
  var depthLimit = _ref$depthLimit === void 0 ? -1 : _ref$depthLimit
  var _ref$keepValues = _ref.keepValues
  var keepValues = _ref$keepValues === void 0 ? false : _ref$keepValues

  var descriptorMap = [(0, _describeObject.default)(object)]
  descriptorMap[0].index = 0

  var describeReferences = function describeReferences (descriptor, currentDetail) {
    var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1
    var returnCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (returnMap) {
      return returnMap
    }
    var index = descriptorMap.length
    var nextRef = currentDetail ? (0, _nextReference.default)(descriptor, currentDetail.index) : undefined
    var nextDetail = typeof nextRef !== 'undefined' ? descriptor.details[nextRef] : null

    if (currentDetail) {
      var vals = descriptor.isArray ? currentDetail.value : [currentDetail.value[currentDetail.value.length - 1]]
      vals.forEach(function (val) {
        var tempDescriptor = (0, _describeObject.default)(val)
        var existingDescriptorIndex = descriptorMap.findIndex(function (existingDescriptor) {
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
          var _currentDetail$arrayR

          index = (_currentDetail$arrayR = currentDetail.arrayReference) !== null && _currentDetail$arrayR !== void 0 ? _currentDetail$arrayR : index
          descriptor.details[currentDetail.index].arrayReference = index
        } else {
          var _currentDetail$object

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
          var newReference = (0, _nextReference.default)(tempDescriptor, -1)
          var newDetail = typeof newReference !== 'undefined' ? tempDescriptor.details[newReference] : null
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

  var descriptor = descriptorMap[0]
  var currentReference = (0, _nextReference.default)(descriptor, -1)

  if (typeof currentReference === 'undefined') {
    descriptorMap[0] = (0, _assignDescriptor.default)(descriptorMap[0], (0, _checkDescriptorComplete.default)(descriptor))
    descriptorMap[0] = (0, _checkClearValues.default)(descriptorMap[0], keepValues)
    return descriptorMap
  }

  return describeReferences(descriptor, descriptor.details[currentReference], depthLimit)
}

var _default = describeObjectMap
exports.default = _default
