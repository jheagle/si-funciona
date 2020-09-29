'use strict'

require('core-js/modules/es.symbol')

require('core-js/modules/es.symbol.description')

require('core-js/modules/es.symbol.iterator')

require('core-js/modules/es.array.concat')

require('core-js/modules/es.array.every')

require('core-js/modules/es.array.filter')

require('core-js/modules/es.array.find')

require('core-js/modules/es.array.find-index')

require('core-js/modules/es.array.for-each')

require('core-js/modules/es.array.from')

require('core-js/modules/es.array.includes')

require('core-js/modules/es.array.iterator')

require('core-js/modules/es.array.map')

require('core-js/modules/es.array.reduce')

require('core-js/modules/es.array.slice')

require('core-js/modules/es.array.some')

require('core-js/modules/es.function.name')

require('core-js/modules/es.object.assign')

require('core-js/modules/es.object.to-string')

require('core-js/modules/es.regexp.to-string')

require('core-js/modules/es.string.includes')

require('core-js/modules/es.string.iterator')

require('core-js/modules/web.dom-collections.for-each')

require('core-js/modules/web.dom-collections.iterator')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.assignNewReferences = exports.mapOriginalObject = exports.describeObjectMap = exports.sameDescriptor = exports.compareDescriptor = exports.describeObject = exports.assignDescriptor = exports.describeObjectDetail = void 0

require('core-js/stable')

var _arrays = require('../arrays')

var _objects = require('../objects')

function _toConsumableArray (arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread() }

function _nonIterableSpread () { throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.') }

function _unsupportedIterableToArray (o, minLen) { if (!o) return; if (typeof o === 'string') return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) n = o.constructor.name; if (n === 'Map' || n === 'Set') return Array.from(o); if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen) }

function _iterableToArray (iter) { if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(iter)) return Array.from(iter) }

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
var describeObjectDetail = function describeObjectDetail (value) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0

  var type = _typeof(value)

  var isInstance = (0, _objects.isInstanceObject)(value)
  return {
    index: index,
    key: key,
    type: [type],
    value: [value],
    nullable: value === null,
    optional: false,
    circular: false,
    isReference: type === 'object' && value !== null && !isInstance && !(0, _objects.emptyObject)(value),
    isInstance: isInstance,
    arrayReference: null,
    objectReference: null
  }
}
/**
 * Build an array of all keys from the details of this descriptor.
 * @function
 * @param {module:descriptorSamples~descriptor} descriptor
 * @returns {Array.<string>}
 */

exports.describeObjectDetail = describeObjectDetail

var descriptorKeys = function descriptorKeys (descriptor) {
  return (0, _arrays.uniqueArray)(descriptor.details.map(function (detail) {
    return detail.key
  }))
}
/**
 * Create an array of the indexes in the details that contain references.
 * @function
 * @param {module:descriptorSamples~descriptor} descriptor
 * @returns {Array.<number>}
 */

var descriptorReferences = function descriptorReferences (descriptor) {
  return (0, _arrays.uniqueArray)(descriptor.details.filter(function (detail) {
    return detail.isReference
  }).map(function (detail) {
    return detail.index
  }))
}
/**
 * Check based on the detail keys if this descriptor represents an array.
 * @function
 * @param {module:descriptorSamples~descriptor} descriptor
 * @returns {boolean}
 */

var descriptorIsArray = function descriptorIsArray (descriptor) {
  return descriptor.length ? descriptor.details.every(function (detail) {
    return typeof detail.key === 'number'
  }) : descriptor.isArray
}
/**
 * Make a copy of an object descriptor so that the original will not be mutated.
 * @function
 * @param {module:descriptorSamples~descriptor} originalMap
 * @returns {module:descriptorSamples~descriptor}
 */

var cloneDescriptor = function cloneDescriptor (originalMap) {
  var copyMap = {}
  copyMap.index = originalMap.index || 0
  copyMap.details = originalMap.details.map(function (detail) {
    var copyDetail = {};
    (0, _objects.objectKeys)(detail).forEach(function (key) {
      copyDetail[key] = Array.isArray(detail[key]) ? detail[key].map(function (value) {
        return value
      }) : detail[key]
    })
    return copyDetail
  })
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
 * Apply one or more descriptors to an existing descriptor so that they represent a merged version of the descriptors.
 * @function
 * @param {module:descriptorSamples~descriptor} originalMap
 * @param  {...module:descriptorSamples~descriptor} descriptors
 * @returns {module:descriptorSamples~descriptor}
 */

var assignDescriptor = function assignDescriptor (originalMap) {
  for (var _len = arguments.length, descriptors = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    descriptors[_key - 1] = arguments[_key]
  }

  return descriptors.reduce(function (assignedDescriptor, descriptor) {
    var detailsDiff = (0, _arrays.compareArrays)(assignedDescriptor.keys, descriptor.keys)
    detailsDiff.forEach(function (diff) {
      var existingDetail = assignedDescriptor.details.find(function (detail) {
        return detail.key === diff.value
      })
      var newDetail = descriptor.details.find(function (detail) {
        return detail.key === diff.value
      })

      if (diff.result.every(function (result) {
        return result === 0
      })) {
        assignedDescriptor.details[existingDetail.index] = Object.assign({}, existingDetail, {
          type: (0, _arrays.uniqueArray)([].concat(_toConsumableArray(existingDetail.type), _toConsumableArray(newDetail.type))),
          value: (0, _arrays.uniqueArray)([].concat(_toConsumableArray(existingDetail.value), _toConsumableArray(newDetail.value))),
          nullable: existingDetail.nullable || newDetail.nullable,
          optional: existingDetail.optional || newDetail.optional,
          circular: existingDetail.circular || newDetail.circular,
          isReference: existingDetail.isReference || newDetail.isReference,
          isInstance: existingDetail.isInstance || newDetail.isInstance,
          arrayReference: [existingDetail.arrayReference, newDetail.arrayReference].find(function (ref) {
            return typeof ref === 'number'
          }),
          objectReference: [existingDetail.objectReference, newDetail.objectReference].find(function (ref) {
            return typeof ref === 'number'
          })
        })
        assignedDescriptor.details[existingDetail.index].arrayReference = typeof assignedDescriptor.details[existingDetail.index].arrayReference === 'undefined' ? null : assignedDescriptor.details[existingDetail.index].arrayReference
        assignedDescriptor.details[existingDetail.index].objectReference = typeof assignedDescriptor.details[existingDetail.index].objectReference === 'undefined' ? null : assignedDescriptor.details[existingDetail.index].objectReference
        return assignedDescriptor
      }

      var useDetail = diff[0] > 0 ? existingDetail : newDetail

      if (!useDetail) {
        assignedDescriptor.details[existingDetail.index].optional = true
        return assignedDescriptor
      }

      var useIndex = diff[0] > 0 ? useDetail.index : assignedDescriptor.length
      assignedDescriptor.details[useIndex] = Object.assign({}, useDetail, {
        index: useIndex,
        optional: true
      })
      assignedDescriptor.length = assignedDescriptor.length < assignedDescriptor.details.length ? assignedDescriptor.details.length : assignedDescriptor.length
      return assignedDescriptor
    })
    assignedDescriptor.keys = descriptorKeys(assignedDescriptor)
    assignedDescriptor.references = descriptorReferences(assignedDescriptor)
    assignedDescriptor.isArray = descriptorIsArray(assignedDescriptor)
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

var describeObject = function describeObject (object) {
  var descriptor = (0, _objects.reduceObject)(object, function (descriptor, value, key) {
    if (typeof key === 'number' && descriptor.details.length) {
      var type = _typeof(value)

      var isReference = type === 'object' && value !== null

      if (value !== null) {
        descriptor.details[0].type = (0, _arrays.uniqueArray)([].concat(_toConsumableArray(descriptor.details[0].type), [type]))
      }

      descriptor.details[0].value = (0, _arrays.uniqueArray)([].concat(_toConsumableArray(descriptor.details[0].value), [value]))
      descriptor.details[0].nullable = descriptor.details[0].nullable || value === null
      descriptor.details[0].isReference = descriptor.details[0].isReference || isReference
      ++descriptor.length
      return descriptor
    }

    descriptor.details = [].concat(_toConsumableArray(descriptor.details), [describeObjectDetail(value, key, descriptor.length++)])
    return descriptor
  }, {
    index: 0,
    details: [],
    length: 0,
    keys: [],
    references: [],
    isArray: false,
    complete: false
  })
  descriptor.keys = descriptorKeys(descriptor)
  descriptor.references = descriptorReferences(descriptor)
  descriptor.isArray = Array.isArray(object) || descriptorIsArray(descriptor)
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

var compareDescriptor = function compareDescriptor (descriptor1, descriptor2) {
  if (descriptor1.isArray !== descriptor2.isArray) {
    return false
  }

  if (descriptor1.length === 0 || descriptor2.length === 0) {
    return descriptor1.length === descriptor2.length
  }

  var smallerDescriptor = descriptor1.length <= descriptor2.length ? descriptor1 : descriptor2
  var largerDescriptor = descriptor2.length >= descriptor1.length ? descriptor2 : descriptor1
  return smallerDescriptor.keys.every(function (key) {
    return largerDescriptor.keys.includes(key)
  }) ? smallerDescriptor.details.every(function (detail) {
      return detail.type.some(function (type) {
        return largerDescriptor.details.find(function (foundDetail) {
          return foundDetail.key === detail.key
        }).type.includes(type)
      })
    }) : false
}

exports.compareDescriptor = compareDescriptor

var sameDescriptor = function sameDescriptor (descriptor1, descriptor2) {
  return descriptor1.details.every(function (detail, index) {
    return detail.value.some(function (dVal) {
      return descriptor2.details[index].value.includes(dVal)
    })
  })
}
/**
 * Find the index of the next descriptorDetail to build a resource for.
 * @param {descriptor} descriptor
 * @param {number} currentReference
 * @returns {number|undefined}
 */

exports.sameDescriptor = sameDescriptor

var nextReference = function nextReference (descriptor, currentReference) {
  return descriptor.references.find(function (nextRef) {
    if (nextRef <= currentReference) {
      return false
    }

    var val = descriptor.details[nextRef].value[descriptor.details[nextRef].value.length - 1]

    if (_typeof(val) !== 'object' || val === null || typeof val === 'undefined' || descriptor.details[nextRef].circular || descriptor.details[nextRef].isInstance) {
      return false
    }

    return !!(0, _objects.objectKeys)(val).length
  })
}
/**
 * Check if the descriptors references have all been built and set complete to true if they have.
 * @param {descriptor} descriptor
 * @returns {descriptor}
 */

var checkDescriptorComplete = function checkDescriptorComplete (descriptor) {
  return (0, _objects.setValue)('complete', descriptor.references.every(function (refId) {
    return [descriptor.details[refId].arrayReference, descriptor.details[refId].objectReference].some(function (ref) {
      return typeof ref === 'number'
    })
  }), descriptor)
}
/**
 * Check if we should clear the values on this descriptor
 * @param {descriptor} descriptor
 * @param {boolean} [keepValues=false]
 * @returns {descriptor}
 */

var checkClearValues = function checkClearValues (descriptor) {
  var keepValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false
  return (0, _objects.setValue)('details', descriptor.complete && !keepValues ? descriptor.details.map(function (detail) {
    return (0, _objects.setValue)('value', [], detail)
  }) : descriptor.details, descriptor)
}
/**
 * Trace out the entire object including nested objects.
 * @function
 * @param {Object|Array} object
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=1000]
 * @param {number} [options.depthLimit=-1]
 * @param {boolean} [options.keepValues=false]
 * @returns {module:descriptorSamples~descriptorMap}
 */

var describeObjectMap = function describeObjectMap (object) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  var _ref$mapLimit = _ref.mapLimit
  var mapLimit = _ref$mapLimit === void 0 ? 1000 : _ref$mapLimit
  var _ref$depthLimit = _ref.depthLimit
  var depthLimit = _ref$depthLimit === void 0 ? -1 : _ref$depthLimit
  var _ref$keepValues = _ref.keepValues
  var keepValues = _ref$keepValues === void 0 ? false : _ref$keepValues

  var descriptorMap = [describeObject(object)]
  descriptorMap[0].index = 0

  var describeReferences = function describeReferences (descriptor, currentDetail) {
    var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1
    var returnCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (returnMap) {
      return returnMap
    }
    var index = descriptorMap.length
    var nextRef = currentDetail ? nextReference(descriptor, currentDetail.index) : undefined
    var nextDetail = typeof nextRef !== 'undefined' ? descriptor.details[nextRef] : null

    if (currentDetail) {
      var vals = descriptor.isArray ? currentDetail.value : [currentDetail.value[currentDetail.value.length - 1]]
      vals.forEach(function (val) {
        var tempDescriptor = describeObject(val)
        var existingDescriptorIndex = descriptorMap.findIndex(function (existingDescriptor) {
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
          descriptorMap[index] = descriptorMap[index] ? assignDescriptor(descriptorMap[index], tempDescriptor) : tempDescriptor
        }

        descriptorMap[descriptor.index] = assignDescriptor(descriptorMap[descriptor.index], descriptor)
        currentDetail = descriptorMap[descriptor.index].details.find(function (detail) {
          return detail.key === currentDetail.key
        })

        if (!currentDetail.circular) {
          var newReference = nextReference(tempDescriptor, -1)
          var newDetail = typeof newReference !== 'undefined' ? tempDescriptor.details[newReference] : null
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

  var descriptor = descriptorMap[0]
  var currentReference = nextReference(descriptor, -1)

  if (typeof currentReference === 'undefined') {
    descriptorMap[0] = assignDescriptor(descriptorMap[0], checkDescriptorComplete(descriptor, keepValues))
    descriptorMap[0] = checkClearValues(descriptorMap[0], keepValues)
    return descriptorMap
  }

  return describeReferences(descriptor, descriptor.details[currentReference], depthLimit)
}
/**
 * @typedef {Object.<string, number|Object|Array>} referenceIdentifier
 * @property {number} index
 * @property {Array|Object} object
 * @property {descriptor} descriptor
 * @property {Array.<string|number>} references
 * @property {Array.<string|number>} circular
 */

/**
 * Create a referenceIdentifier for building the object clone.
 * @param {Array|Object} [object=null]
 * @param {number} [index=0]
 * @returns {referenceIdentifier}
 */

exports.describeObjectMap = describeObjectMap

var createReferenceIdentifier = function createReferenceIdentifier () {
  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
  return Object.assign({}, {
    index: index,
    object: object,
    descriptor: describeObject(object || {}),
    references: [],
    circular: []
  })
}
/**
 * Prepare to map over an object and return the callback that will be used for each reference.
 * @function
 * @param {descriptorMap} [descriptorMap=null]
 * @param {Array.<referenceIdentifier>} [newReferenceMap=[]]
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=1000]
 * @param {depthLimit} [options.depthLimit=-1]
 * @returns {mapOriginal}
 */

var mapOriginalObject = function mapOriginalObject () {
  var descriptorMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
  var newReferenceMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : []

  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}
  var _ref2$mapLimit = _ref2.mapLimit
  var mapLimit = _ref2$mapLimit === void 0 ? 1000 : _ref2$mapLimit
  var _ref2$depthLimit = _ref2.depthLimit
  var depthLimit = _ref2$depthLimit === void 0 ? -1 : _ref2$depthLimit

  /**
     * Map over the provided object and generate an array of cloned references.
     * @function
     * @param {Array|Object} focusObject
     * @param {descriptor} descriptor
     * @param {number} index
     * @param {number|null} limit
     * @returns {Array.<referenceIdentifier>}
     */
  var mapOriginal = function mapOriginal (focusObject, descriptor) {
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0
    var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null

    if (limit === null) {
      limit = depthLimit
    }

    if (!newReferenceMap[index]) {
      newReferenceMap[index] = createReferenceIdentifier(focusObject, index)
    }

    var skip = limit === 0

    if (descriptor.isArray && Array.isArray(focusObject)) {
      var detail = descriptor.details[0]
      newReferenceMap[index].object = focusObject.map(function (item, id) {
        if (!detail.isReference) {
          return item
        }

        skip = skip || index + newReferenceMap[index].references.length + 1 >= mapLimit

        if (detail.isReference && !(0, _objects.emptyObject)(item) && !skip) {
          newReferenceMap[index].references.push(id)
          return null
        }

        return Array.isArray(item) ? [] : {}
      }, [])
    } else {
      newReferenceMap[index].object = descriptor.details.reduce(function (newRef, detail) {
        if (!(detail.key in focusObject)) {
          return newRef
        }

        if (_typeof(focusObject[detail.key]) !== 'object' || focusObject[detail.key] === null || detail.isInstance) {
          newRef[detail.key] = focusObject[detail.key]
          return newRef
        }

        skip = skip || index + newReferenceMap[index].references.length + 1 >= mapLimit

        if (detail.isReference && !(0, _objects.emptyObject)(focusObject[detail.key]) && !skip) {
          newReferenceMap[index].references.push(detail.key)
          newRef[detail.key] = null
          return newRef
        }

        newRef[detail.key] = Array.isArray(focusObject[detail.key]) ? [] : {}
        return newRef
      }, {})
    }

    return newReferenceMap[index].references.reduce(function (newRef, key) {
      var detail = descriptor.isArray ? descriptor.details[0] : descriptor.details.find(function (detail) {
        return detail.key === key
      })
      var newRefIndex = newReferenceMap.length
      var objectToRef = focusObject[key]

      if (detail.circular) {
        var tempDescriptor = describeObject(objectToRef)
        var existingIndex = newReferenceMap.findIndex(function (existing) {
          return sameDescriptor(tempDescriptor, existing.descriptor)
        })

        if (existingIndex >= 0) {
          newRef.object[key] = existingIndex
          newRef.circular.push(key)
          return newRef
        }
      }

      if (newRefIndex >= mapLimit) {
        newRef.object[key] = Array.isArray(focusObject[key]) ? [] : {}
        return newRef
      }

      if (limit === 0) {
        return newReferenceMap[index]
      }

      newReferenceMap[newRefIndex] = createReferenceIdentifier(focusObject[key], newRefIndex)
      newRef.object[key] = newRefIndex
      var descriptorRefIndex = Array.isArray(objectToRef) && detail.arrayReference !== null ? detail.arrayReference : detail.objectReference
      newReferenceMap[newRefIndex] = mapOriginal(objectToRef, descriptorMap[descriptorRefIndex], newRef.object[key], --limit)
      return newRef
    }, newReferenceMap[index])
  }

  return mapOriginal
}
/**
 * Take an array for reference identifiers and return a callback to build the final reference
 * @param {Array.<referenceIdentifier>} newReferenceMap
 * @returns {assignReferences}
 */

exports.mapOriginalObject = mapOriginalObject

var assignNewReferences = function assignNewReferences () {
  var newReferenceMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []

  /**
     * Take a reference identifier and return a new reference.
     * @function
     * @param {referenceIdentifier} reference
     * @returns {Array|Object}
     */
  var assignReferences = function assignReferences (reference) {
    return reference.references.reduce(function (newRef, key) {
      return (0, _objects.setValue)(key, reference.circular.includes(key) ? newReferenceMap[newRef[key]].object : assignReferences(newReferenceMap[newRef[key]]), newRef)
    }, reference.object)
  }

  return assignReferences
}

exports.assignNewReferences = assignNewReferences
