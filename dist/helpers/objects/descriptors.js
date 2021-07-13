'use strict'

require('core-js/modules/es.array.from.js')

require('core-js/modules/es.array.slice.js')

require('core-js/modules/es.function.name.js')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.describeObjectMap = exports.sameDescriptor = exports.compareDescriptor = exports.describeObject = exports.assignDescriptor = exports.describeObjectDetail = void 0

require('core-js/modules/web.dom-collections.for-each.js')

require('core-js/modules/es.array.map.js')

require('core-js/modules/es.object.to-string.js')

require('core-js/modules/es.array.iterator.js')

require('core-js/modules/web.dom-collections.iterator.js')

require('core-js/modules/es.array.reduce.js')

require('core-js/modules/es.array.concat.js')

require('core-js/modules/es.array.find.js')

require('core-js/modules/es.object.assign.js')

require('core-js/modules/es.array.filter.js')

require('core-js/modules/es.array.includes.js')

require('core-js/modules/es.string.includes.js')

require('core-js/modules/es.array.find-index.js')

require('core-js/modules/es.symbol.js')

require('core-js/modules/es.symbol.description.js')

require('core-js/modules/es.symbol.iterator.js')

require('core-js/modules/es.string.iterator.js')

require('core-js/stable')

const _arrays = require('../arrays')

const _objects = require('../objects')

function _toConsumableArray (arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread() }

function _nonIterableSpread () { throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.') }

function _unsupportedIterableToArray (o, minLen) { if (!o) return; if (typeof o === 'string') return _arrayLikeToArray(o, minLen); let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) n = o.constructor.name; if (n === 'Map' || n === 'Set') return Array.from(o); if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen) }

function _iterableToArray (iter) { if (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null || iter['@@iterator'] != null) return Array.from(iter) }

function _arrayWithoutHoles (arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr) }

function _arrayLikeToArray (arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i] } return arr2 }

function _typeof (obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof (obj) { return typeof obj } } else { _typeof = function _typeof (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj } } return _typeof(obj) }

/**
 * Trace an object's attribute and provide details about it.
 * @function
 * @param {*} value
 * @param {string|number} [key=0]
 * @param {number} [index=0]
 * @returns {module:descriptorSamples~descriptorDetail}
 */
const describeObjectDetail = function describeObjectDetail (value) {
  const key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
  const index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0

  const type = _typeof(value)

  return {
    index: index,
    key: key,
    type: [type],
    value: [value],
    nullable: value === null,
    optional: false,
    circular: false,
    isReference: (0, _objects.isCloneable)(value) && !(0, _objects.emptyObject)(value),
    isInstance: (0, _objects.isInstanceObject)(value),
    arrayReference: null,
    objectReference: null
  }
}
/**
 * Get a new copy of an existing Descriptor Detail
 * @param {module:descriptorSamples~descriptorDetail} originalDetail
 * @returns {module:descriptorSamples~descriptorDetail}
 */

exports.describeObjectDetail = describeObjectDetail

const cloneDescriptorDetail = function cloneDescriptorDetail (originalDetail) {
  const copyDetail = {};
  (0, _objects.objectKeys)(originalDetail).forEach(function (key) {
    copyDetail[key] = Array.isArray(originalDetail[key])
      ? originalDetail[key].map(function (value) {
        return value
      })
      : originalDetail[key]
  })
  return copyDetail
}
/**
 * Make a copy of an object descriptor so that the original will not be mutated.
 * @function
 * @param {module:descriptorSamples~descriptor} originalMap
 * @returns {module:descriptorSamples~descriptor}
 */

const cloneDescriptor = function cloneDescriptor (originalMap) {
  const copyMap = {}
  copyMap.index = originalMap.index || 0
  copyMap.details = originalMap.details.map(cloneDescriptorDetail)
  copyMap.length = originalMap.length
  copyMap.keys = originalMap.keys.map(function (key) {
    return key
  })
  copyMap.references = originalMap.references.map(function (reference) {
    return reference
  })
  copyMap.isArray = originalMap.isArray
  copyMap.complete = originalMap.complete
  return copyMap
}
/**
 * Assign properties from other details onto an existing detail.
 * @param {module:descriptorSamples~descriptorDetail} originalDetail
 * @param  {...module:descriptorSamples~descriptorDetail} details
 * @returns {module:descriptorSamples~descriptorDetail}
 */

const assignDescriptorDetail = function assignDescriptorDetail (originalDetail) {
  for (var _len = arguments.length, details = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    details[_key - 1] = arguments[_key]
  }

  return details.reduce(function (existingDetail, newDetail) {
    existingDetail.type = (0, _arrays.uniqueArray)([].concat(_toConsumableArray(existingDetail.type), _toConsumableArray(newDetail.type)))
    existingDetail.value = (0, _arrays.uniqueArray)([].concat(_toConsumableArray(existingDetail.value), _toConsumableArray(newDetail.value)))
    existingDetail.nullable = existingDetail.nullable || newDetail.nullable
    existingDetail.optional = existingDetail.optional || newDetail.optional
    existingDetail.circular = existingDetail.circular || newDetail.circular
    existingDetail.isReference = existingDetail.isReference || newDetail.isReference
    existingDetail.isInstance = existingDetail.isInstance || newDetail.isInstance
    existingDetail.arrayReference = [existingDetail.arrayReference, newDetail.arrayReference].find(function (ref) {
      return typeof ref === 'number'
    })
    existingDetail.objectReference = [existingDetail.objectReference, newDetail.objectReference].find(function (ref) {
      return typeof ref === 'number'
    })
    existingDetail.arrayReference = typeof existingDetail.arrayReference === 'undefined' ? null : existingDetail.arrayReference
    existingDetail.objectReference = typeof existingDetail.objectReference === 'undefined' ? null : existingDetail.objectReference
    return existingDetail
  }, cloneDescriptorDetail(originalDetail))
}
/**
 * Apply one or more descriptors to an existing descriptor so that they represent a merged version of the descriptors.
 * @function
 * @param {module:descriptorSamples~descriptor} originalMap
 * @param  {...module:descriptorSamples~descriptor} descriptors
 * @returns {module:descriptorSamples~descriptor}
 */

const assignDescriptor = function assignDescriptor (originalMap) {
  for (var _len2 = arguments.length, descriptors = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    descriptors[_key2 - 1] = arguments[_key2]
  }

  return descriptors.reduce(function (assignedDescriptor, descriptor) {
    const detailsDiff = (0, _arrays.compareArrays)(assignedDescriptor.keys, descriptor.keys)
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
        assignedDescriptor.details[existingDetail.index] = assignDescriptorDetail(existingDetail, newDetail)
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
    assignedDescriptor.keys = (0, _arrays.uniqueArray)(assignedDescriptor.details.map(function (detail) {
      return detail.key
    }))
    assignedDescriptor.references = (0, _arrays.uniqueArray)(assignedDescriptor.details.filter(function (detail) {
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
  }, cloneDescriptor(originalMap))
}
/**
 * Trace an object and return the descriptor which defines the object's structure and attributes.
 * @function
 * @param {Object} object
 * @returns {module:descriptorSamples~descriptor}
 */

exports.assignDescriptor = assignDescriptor

const describeObject = function describeObject (object) {
  const descriptor = {
    index: 0,
    details: [],
    length: 0,
    keys: [],
    references: [],
    isArray: false,
    complete: false
  }
  const keys = (0, _objects.objectKeys)(object)

  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i]
    const newDetail = describeObjectDetail(object[key], key, descriptor.length++)

    if (typeof key === 'number' && descriptor.details.length) {
      descriptor.details[0] = assignDescriptorDetail(descriptor.details[0], newDetail)
      descriptor.keys = [0]

      if (newDetail.isReference) {
        descriptor.references = [0]
      }

      continue
    }

    descriptor.details.push(newDetail)
    descriptor.keys.push(newDetail.key)

    if (newDetail.isReference) {
      descriptor.references.push(newDetail.index)
    }
  }

  descriptor.isArray = Array.isArray(object)
  descriptor.complete = !descriptor.references.length
  return descriptor
}
/**
 * Check if two descriptors are the same or similar in that they have similar keys and the associated types are the same.
 * @function
 * @param {module:descriptorSamples~descriptor} descriptor1
 * @param {module:descriptorSamples~descriptor} descriptor2
 * @returns {boolean}
 */

exports.describeObject = describeObject

const compareDescriptor = function compareDescriptor (descriptor1, descriptor2) {
  if (descriptor1.isArray !== descriptor2.isArray) {
    return false
  }

  if (descriptor1.length === 0 || descriptor2.length === 0) {
    return descriptor1.length === descriptor2.length
  }

  const smallerDescriptor = descriptor1.length <= descriptor2.length ? descriptor1 : descriptor2
  const largerDescriptor = descriptor2.length >= descriptor1.length ? descriptor2 : descriptor1
  return smallerDescriptor.keys.every(function (key) {
    return largerDescriptor.keys.includes(key)
  })
    ? smallerDescriptor.details.every(function (detail) {
      return detail.type.some(function (type) {
        return largerDescriptor.details.find(function (foundDetail) {
          return foundDetail.key === detail.key
        }).type.includes(type)
      })
    })
    : false
}

exports.compareDescriptor = compareDescriptor

const sameDescriptor = function sameDescriptor (descriptor1, descriptor2) {
  return descriptor1.details.every(function (detail, index) {
    return detail.value.some(function (dVal) {
      return descriptor2.details[index].value.includes(dVal)
    })
  })
}
/**
 * Find the index of the next descriptorDetail to build a resource for.
 * @param {module:descriptorSamples~descriptor} descriptor
 * @param {number} currentReference
 * @returns {number|undefined}
 */

exports.sameDescriptor = sameDescriptor

const nextReference = function nextReference (descriptor, currentReference) {
  return descriptor.references.find(function (nextRef) {
    if (nextRef <= currentReference) {
      return false
    }

    const val = descriptor.details[nextRef].value[descriptor.details[nextRef].value.length - 1]

    if (_typeof(val) !== 'object' || val === null || typeof val === 'undefined' || descriptor.details[nextRef].circular || descriptor.details[nextRef].isInstance) {
      return false
    }

    return !!(0, _objects.objectKeys)(val).length
  })
}
/**
 * Check if the descriptors references have all been built and set complete to true if they have.
 * @param {module:descriptorSamples~descriptor} descriptor
 * @returns {module:descriptorSamples~descriptor}
 */

const checkDescriptorComplete = function checkDescriptorComplete (descriptor) {
  return (0, _objects.setValue)('complete', descriptor.references.every(function (refId) {
    return [descriptor.details[refId].arrayReference, descriptor.details[refId].objectReference].some(function (ref) {
      return typeof ref === 'number'
    })
  }), descriptor)
}
/**
 * Check if we should clear the values on this descriptor
 * @param {module:descriptorSamples~descriptor} descriptor
 * @param {boolean} [keepValues=false]
 * @returns {module:descriptorSamples~descriptor}
 */

const checkClearValues = function checkClearValues (descriptor) {
  const keepValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false
  return (0, _objects.setValue)('details', descriptor.complete && !keepValues
    ? descriptor.details.map(function (detail) {
      return (0, _objects.setValue)('value', [], detail)
    })
    : descriptor.details, descriptor)
}
/**
 * Trace out the entire object including nested objects.
 * @function
 * @param {Object|Array} object
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=1000000000]
 * @param {number} [options.depthLimit=-1]
 * @param {boolean} [options.keepValues=false]
 * @returns {module:descriptorSamples~descriptorMap}
 */

const describeObjectMap = function describeObjectMap (object) {
  const _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  const _ref$mapLimit = _ref.mapLimit
  const mapLimit = _ref$mapLimit === void 0 ? 1000000000 : _ref$mapLimit
  const _ref$depthLimit = _ref.depthLimit
  const depthLimit = _ref$depthLimit === void 0 ? -1 : _ref$depthLimit
  const _ref$keepValues = _ref.keepValues
  const keepValues = _ref$keepValues === void 0 ? false : _ref$keepValues

  const descriptorMap = [describeObject(object)]
  descriptorMap[0].index = 0

  const describeReferences = function describeReferences (descriptor, currentDetail) {
    let limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1
    const returnCallback = arguments.length > 3 && arguments[3] !== undefined
      ? arguments[3]
      : function (returnMap) {
        return returnMap
      }
    let index = descriptorMap.length
    const nextRef = currentDetail ? nextReference(descriptor, currentDetail.index) : undefined
    const nextDetail = typeof nextRef !== 'undefined' ? descriptor.details[nextRef] : null

    if (currentDetail) {
      const vals = descriptor.isArray ? currentDetail.value : [currentDetail.value[currentDetail.value.length - 1]]
      vals.forEach(function (val) {
        const tempDescriptor = describeObject(val)
        const existingDescriptorIndex = descriptorMap.findIndex(function (existingDescriptor) {
          return compareDescriptor(tempDescriptor, existingDescriptor)
        })

        if (existingDescriptorIndex >= 0) {
          index = existingDescriptorIndex

          if (tempDescriptor.length && sameDescriptor(tempDescriptor, descriptorMap[existingDescriptorIndex])) {
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
          descriptorMap[index] = descriptorMap[index] ? assignDescriptor(descriptorMap[index], tempDescriptor) : tempDescriptor
        }

        descriptorMap[descriptor.index] = assignDescriptor(descriptorMap[descriptor.index], descriptor)
        currentDetail = descriptorMap[descriptor.index].details.find(function (detail) {
          return detail.key === currentDetail.key
        })

        if (!currentDetail.circular) {
          const newReference = nextReference(tempDescriptor, -1)
          const newDetail = typeof newReference !== 'undefined' ? tempDescriptor.details[newReference] : null
          return describeReferences(tempDescriptor, newDetail, --limit, function (returnMap) {
            return describeReferences(descriptor, nextDetail, --limit)
          })
        }
      })
    }

    descriptorMap[descriptor.index] = assignDescriptor(descriptorMap[descriptor.index], checkDescriptorComplete(descriptor))
    descriptorMap[descriptor.index] = checkClearValues(descriptorMap[descriptor.index], keepValues)
    return nextDetail ? describeReferences(descriptor, nextDetail, --limit) : returnCallback(descriptorMap)
  }

  const descriptor = descriptorMap[0]
  const currentReference = nextReference(descriptor, -1)

  if (typeof currentReference === 'undefined') {
    descriptorMap[0] = assignDescriptor(descriptorMap[0], checkDescriptorComplete(descriptor, keepValues))
    descriptorMap[0] = checkClearValues(descriptorMap[0], keepValues)
    return descriptorMap
  }

  return describeReferences(descriptor, descriptor.details[currentReference], depthLimit)
}

exports.describeObjectMap = describeObjectMap
