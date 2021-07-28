'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.array.reduce.js')

require('core-js/modules/es.array.iterator.js')

require('core-js/modules/es.object.to-string.js')

require('core-js/modules/web.dom-collections.iterator.js')

require('core-js/modules/web.dom-collections.for-each.js')

require('core-js/modules/es.array.find.js')

require('core-js/modules/es.object.assign.js')

require('core-js/modules/es.array.map.js')

require('core-js/modules/es.array.filter.js')

require('core-js/stable')

const _assignDescriptorDetail = _interopRequireDefault(require('./assignDescriptorDetail'))

const _cloneDescriptor = _interopRequireDefault(require('./cloneDescriptor'))

const _compareArrays = _interopRequireDefault(require('../arrays/compareArrays'))

const _uniqueArray = _interopRequireDefault(require('../arrays/uniqueArray'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * @typedef {Object} descriptorDetail
 * @property {number} index
 * @property {string|number} key
 * @property {Array.<string>} type
 * @property {Array} value
 * @property {boolean} nullable
 * @property {boolean} optional
 * @property {boolean} circular
 * @property {boolean} isReference
 * @property {boolean} isInstance
 * @property {null|number} arrayReference
 * @property {null|number} objectReference
 */

/**
 * @typedef {Object} descriptor
 * @property {number} index
 * @property {Array.<descriptorDetail>} details
 * @property {number} length
 * @property {Array.<string|number>} keys
 * @property {Array.<number>} references
 * @property {boolean} isArray
 * @property {boolean} complete
 */

/**
 * Apply one or more descriptors to an existing descriptor so that they represent a merged version of the descriptors.
 * @function
 * @param {descriptor} originalMap
 * @param  {...descriptor} descriptors
 * @returns {descriptor}
 */
const assignDescriptor = function assignDescriptor (originalMap) {
  for (var _len = arguments.length, descriptors = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    descriptors[_key - 1] = arguments[_key]
  }

  return descriptors.reduce(function (assignedDescriptor, descriptor) {
    const detailsDiff = (0, _compareArrays.default)(assignedDescriptor.keys, descriptor.keys)
    detailsDiff.forEach(function (diff) {
      const existingDetail = assignedDescriptor.details.find(function (detail) {
        return detail.key === diff.value
      })
      const newDetail = descriptor.details.find(function (detail) {
        return detail.key === diff.value
      })

      if (diff.result.every(function (result) {
        return result === 0
      })) {
        assignedDescriptor.details[existingDetail.index] = (0, _assignDescriptorDetail.default)(existingDetail, newDetail)
        return assignedDescriptor
      }

      const useDetail = diff[0] > 0 ? existingDetail : newDetail

      if (!useDetail) {
        assignedDescriptor.details[existingDetail.index].optional = true
        return assignedDescriptor
      }

      const useIndex = diff[0] > 0 ? useDetail.index : assignedDescriptor.length
      assignedDescriptor.details[useIndex] = Object.assign({}, useDetail, {
        index: useIndex,
        optional: true
      })
      assignedDescriptor.length = assignedDescriptor.length < assignedDescriptor.details.length ? assignedDescriptor.details.length : assignedDescriptor.length
      return assignedDescriptor
    })
    assignedDescriptor.keys = (0, _uniqueArray.default)(assignedDescriptor.details.map(function (detail) {
      return detail.key
    }))
    assignedDescriptor.references = (0, _uniqueArray.default)(assignedDescriptor.details.filter(function (detail) {
      return detail.isReference
    }).map(function (detail) {
      return detail.index
    }))
    assignedDescriptor.isArray = assignedDescriptor.length
      ? assignedDescriptor.details.every(function (detail) {
        return typeof detail.key === 'number'
      })
      : assignedDescriptor.isArray
    assignedDescriptor.complete = !assignedDescriptor.references.length || assignedDescriptor.complete || descriptor.complete
    return assignedDescriptor
  }, (0, _cloneDescriptor.default)(originalMap))
}

const _default = assignDescriptor
exports.default = _default
