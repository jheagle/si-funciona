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

require('core-js/modules/es.object.keys')

require('core-js/modules/es.object.to-string')

require('core-js/modules/es.regexp.to-string')

require('core-js/modules/es.string.includes')

require('core-js/modules/es.string.iterator')

require('core-js/modules/web.dom-collections.for-each')

require('core-js/modules/web.dom-collections.iterator')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.mergeObjectsMutable = exports.mergeObjects = exports.cloneObject = exports.traceObjectMap = exports.compareTrace = exports.traceObject = exports.assignTraceObject = exports.traceObjectDetail = exports.notEmptyObjectOrArray = exports.reduceObject = exports.filterObject = exports.mapProperty = exports.mapObject = exports.setAndReturnValue = exports.setValue = void 0

require('core-js/stable')

var _functions = require('./functions')

var _arrays = require('./arrays')

function _toConsumableArray (arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread() }

function _nonIterableSpread () { throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.') }

function _unsupportedIterableToArray (o, minLen) { if (!o) return; if (typeof o === 'string') return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) n = o.constructor.name; if (n === 'Map' || n === 'Set') return Array.from(o); if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen) }

function _iterableToArray (iter) { if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(iter)) return Array.from(iter) }

function _arrayWithoutHoles (arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr) }

function _arrayLikeToArray (arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i] } return arr2 }

function _typeof (obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof (obj) { return typeof obj } } else { _typeof = function _typeof (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj } } return _typeof(obj) }

/**
 * Set a value on an item, then return the item
 * @param {string|number} key - The key on the item which will have its value set
 * @param {*} value - Any value to be applied to the key
 * @param {Object|Array} item - An object or array to be updated
 * @returns {Object|Array}
 */
var setValue = function setValue (key, value, item) {
  item[key] = value
  return item
}
/**
 * Set a value on an item, then return the value
 * @param {Object|Array} item - An object or array to be updated
 * @param {string|number} key - The key on the item which will have its value set
 * @param {*} value - Any value to be applied to the key
 * @returns {*}
 */

exports.setValue = setValue

var setAndReturnValue = function setAndReturnValue (item, key, value) {
  item[key] = value
  return value
}
/**
 * Function that produces a property of the new Object, taking three arguments
 * @callback mapCallback
 * @param {*} currentProperty - The current property being processed in the object.
 * @param {string} [currentIndex] - The property name of the current property being processed in the object.
 * @param {Object|Array} [object] - The object map was called upon.
 * @returns {*}
 */

/**
 * This function is intended to replicate behaviour of the Array.map() function but for Objects.
 * If an array is passed in instead then it will perform standard map(). It is recommended to
 * always use the standard map() function when it is known that the object is actually an array.
 * @param {Object|Array} obj - The Object (or Array) to be mapped
 * @param {mapCallback|function} fn - The function to be processed for each mapped property
 * @param {Object|Array} [thisArg] - Optional. Value to use as this when executing callback.
 * @returns {Object|Array}
 */

exports.setAndReturnValue = setAndReturnValue

var mapObject = function mapObject (obj, fn) {
  var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined
  return Array.isArray(obj) ? obj.map(fn, thisArg) : Object.keys(obj).reduce(function (newObj, curr) {
    return setValue(curr, (0, _functions.callWithParams)(fn, [obj[curr], curr, obj], 2), newObj)
  }, thisArg || {})
}
/**
 * Perform map on an array property of an object, then return the object
 * @param {string} property - The string key for the array property to be mapped
 * @param {mapCallback|function} mapFunction - A function suitable to be passed to map
 * @param {Object|Array} obj - An object having an array property
 * @returns {object}
 */

exports.mapObject = mapObject

var mapProperty = function mapProperty (property, mapFunction, obj) {
  obj[property] = mapObject(obj[property] || [], mapFunction)
  return obj
}
/**
 * Function is a predicate, to test each property value of the object. Return true to keep the element, false
 * otherwise, taking three arguments
 * @callback filterCallback
 * @param {*} currentProperty - The current property being processed in the object.
 * @param {string} [currentIndex] - The property name of the current property being processed in the object.
 * @param {Object|Array} [object] - The object filter was called upon.
 * @returns {boolean}
 */

/**
 * This function is intended to replicate behaviour of the Array.filter() function but for Objects.
 * If an array is passed in instead then it will perform standard filter(). It is recommended to
 * always use the standard filter() function when it is known that the object is actually an array.
 * @param {Object|Array} obj - The Object (or Array) to be filtered
 * @param {filterCallback|function} fn - The function to be processed for each filtered property
 * @param {Object|Array} [thisArg] - Optional. Value to use as this when executing callback.
 * @returns {Object|Array}
 */

exports.mapProperty = mapProperty

var filterObject = function filterObject (obj, fn) {
  var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined
  return Array.isArray(obj) ? obj.filter(fn, thisArg) : Object.keys(obj).reduce(function (newObj, curr) {
    if ((0, _functions.callWithParams)(fn, [obj[curr], curr, obj], 2)) {
      newObj[curr] = obj[curr]
    } else {
      delete newObj[curr]
    }

    return newObj
  }, thisArg || {})
}
/**
 * Function to execute on each property in the object, taking four arguments
 * @callback reduceCallback
 * @param {*} [accumulator={}] - The accumulator accumulates the callback's return values; it is the accumulated
 * value previously returned in the last invocation of the callback, or initialValue, if supplied (see below).
 * @param {*} [currentProperty={}] - The current property being processed in the object.
 * @param {string} [currentIndex=0] - The index of the current element being processed in the array. Starts at index
 * 0, if an initialValue is provided, and at index 1 otherwise.
 * @param {Object|Array} [object={}] - The object reduce was called upon.
 * @returns {*}
 */

/**
 * This function is intended to replicate behaviour of the Array.reduce() function but for Objects.
 * If an array is passed in instead then it will perform standard reduce(). It is recommended to
 * always use the standard reduce() function when it is known that the object is actually an array.
 * @param {Object|Array} obj - The Object (or Array) to be filtered
 * @param {reduceCallback|function} fn - The function to be processed for each filtered property
 * @param {Object|Array} [initialValue] - Optional. Value to use as the first argument to the first call of the
 * callback. If no initial value is supplied, the first element in the array will be used. Calling reduce on an empty
 * array without an initial value is an error.
 * @returns {Object|Array}
 */

exports.filterObject = filterObject

var reduceObject = function reduceObject (obj, fn) {
  var initialValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : obj[Object.keys(obj)[0]] || obj[0]
  return Array.isArray(obj) ? obj.reduce(fn, initialValue) : Object.keys(obj).reduce(function (newObj, curr) {
    return (0, _functions.callWithParams)(fn, [newObj, obj[curr], curr, obj], 2)
  }, initialValue)
}
/**
 * Helper function for testing if the item is an Object or Array that contains properties or elements
 * @param {Object|Array} item - Object or Array to test
 * @returns {boolean}
 */

exports.reduceObject = reduceObject

var notEmptyObjectOrArray = function notEmptyObjectOrArray (item) {
  return !!(_typeof(item) === 'object' && Object.keys(item).length || Array.isArray(item) && item.length)
}
/**
 * Trace an object's attribute and provide details about it.
 * @param {*} value
 * @param {string|number} [key=0]
 * @param {number} [index=0]
 * @returns {objectMapDetail}
 */

exports.notEmptyObjectOrArray = notEmptyObjectOrArray

var traceObjectDetail = function traceObjectDetail (value) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0

  var type = _typeof(value)

  var isReference = type === 'object' && value !== null
  return {
    index: index,
    key: key,
    type: value === null ? [] : [type],
    value: [value],
    nullable: value === null,
    optional: false,
    circular: false,
    isReference: isReference,
    reference: null
  }
}
/**
 * Build an array of all keys from the details of this trace.
 * @param {objectMap} trace
 * @returns {Array.<string>}
 */

exports.traceObjectDetail = traceObjectDetail

var traceObjectKeys = function traceObjectKeys (trace) {
  return (0, _arrays.uniqueArray)(trace.details.map(function (detail) {
    return detail.key
  }))
}
/**
 * Create an array of the indexes in the details that contain references.
 * @param {objectMap} trace
 * @returns {Array.<number>}
 */

var traceObjectReferences = function traceObjectReferences (trace) {
  return (0, _arrays.uniqueArray)(trace.details.filter(function (detail) {
    return detail.isReference
  }).map(function (detail) {
    return detail.index
  }))
}
/**
 * Check based on the detail keys if this trace represents an array.
 * @param {objectMap} trace
 * @returns {boolean}
 */

var traceObjectIsArray = function traceObjectIsArray (trace) {
  return trace.details.every(function (detail) {
    return typeof detail.key === 'number'
  })
}
/**
 * Make a copy of an object trace so that the original will not be mutated.
 * @param {objectMap} originalMap
 * @returns {objectMap}
 */

var cloneTraceObject = function cloneTraceObject (originalMap) {
  var copyMap = {}
  copyMap.details = originalMap.details.map(function (detail) {
    var copyDetail = {}
    Object.keys(detail).forEach(function (key) {
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
 * Apply one or more objectMaps to an existing objectMap so that they represent a merged version of the objectMaps.
 * @param {objectMap} originalMap
 * @param  {...objectMap} objectMaps
 * @returns {objectMap}
 */

var assignTraceObject = function assignTraceObject (originalMap) {
  for (var _len = arguments.length, objectMaps = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    objectMaps[_key - 1] = arguments[_key]
  }

  return objectMaps.reduce(function (objectMap, trace) {
    var detailsDiff = (0, _arrays.compareArrays)(objectMap.keys, trace.keys)
    detailsDiff.forEach(function (diff) {
      var existingDetail = objectMap.details.find(function (detail) {
        return detail.key === diff.value
      })
      var newDetail = trace.details.find(function (detail) {
        return detail.key === diff.value
      })

      if (diff.result.every(function (result) {
        return result === 0
      })) {
        objectMap.details[existingDetail.index] = Object.assign({}, existingDetail, {
          type: (0, _arrays.uniqueArray)([].concat(_toConsumableArray(existingDetail.type), _toConsumableArray(newDetail.type))),
          value: (0, _arrays.uniqueArray)([].concat(_toConsumableArray(existingDetail.value), _toConsumableArray(newDetail.value))),
          nullable: existingDetail.nullable || newDetail.nullable,
          isReference: existingDetail.isReference || newDetail.isReference,
          reference: existingDetail.reference || newDetail.reference
        })
        return objectMap
      }

      var useDetail = diff[0] > 0 ? existingDetail : newDetail
      var useIndex = diff[0] > 0 ? useDetail.index : objectMap.length
      objectMap.details[useIndex] = Object.assign({}, useDetail, {
        index: useIndex,
        optional: true
      })
      objectMap.length = objectMap.length < objectMap.details.length ? objectMap.details.length : objectMap.length
      return objectMap
    })
    objectMap.keys = traceObjectKeys(objectMap)
    objectMap.references = traceObjectReferences(objectMap)
    objectMap.isArray = traceObjectIsArray(objectMap)
    objectMap.complete = !objectMap.references.length
    return objectMap
  }, cloneTraceObject(originalMap))
}
/**
 * Trace an object and return the trace which defines the object's structure and attributes.
 * @param {Object} object
 * @returns {objectMap}
 */

exports.assignTraceObject = assignTraceObject

var traceObject = function traceObject (object) {
  var objectMap = reduceObject(object, function (objectMap, value, key) {
    if (typeof key === 'number' && objectMap.details.length) {
      var type = _typeof(value)

      var isReference = type === 'object' && value !== null

      if (value !== null) {
        objectMap.details[0].type = (0, _arrays.uniqueArray)([].concat(_toConsumableArray(objectMap.details[0].type), [type]))
      }

      objectMap.details[0].value = (0, _arrays.uniqueArray)([].concat(_toConsumableArray(objectMap.details[0].value), [value]))
      objectMap.details[0].nullable = objectMap.details[0].nullable || value === null
      objectMap.details[0].isReference = objectMap.details[0].isReference || isReference
      ++objectMap.length
      return objectMap
    }

    objectMap.details = [].concat(_toConsumableArray(objectMap.details), [traceObjectDetail(value, key, objectMap.length++)])
    return objectMap
  }, {
    details: [],
    length: 0,
    keys: [],
    references: [],
    isArray: false,
    complete: false
  })
  objectMap.keys = traceObjectKeys(objectMap)
  objectMap.references = traceObjectReferences(objectMap)
  objectMap.isArray = traceObjectIsArray(objectMap)
  objectMap.complete = !objectMap.references.length
  return objectMap
}
/**
 * Check if two traces are the same or similar in that they have similar keys and the associated types are the same.
 * @param {objectMap} trace1
 * @param {objectMap} trace2
 * @returns {boolean}
 */

exports.traceObject = traceObject

var compareTrace = function compareTrace (trace1, trace2) {
  return trace1.keys.every(function (key) {
    return trace2.keys.includes(key)
  }) ? trace1.details.every(function (detail) {
      detail.type.some(function (type) {
        return trace2.details.find(function (foundDetail) {
          return foundDetail.key === detail.key
        }).type.includes(type)
      })
    }) : false
}
/**
 * Trace out the entire object including nested objects.
 * @param {Object|Array} object
 * @param {number} [mapLimit=1000]
 * @param {number} [depthLimit=-1]
 * @returns {objectTraceMap}
 */

exports.compareTrace = compareTrace

var traceObjectMap = function traceObjectMap (object) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  var _ref$mapLimit = _ref.mapLimit
  var mapLimit = _ref$mapLimit === void 0 ? 1000 : _ref$mapLimit
  var _ref$depthLimit = _ref.depthLimit
  var depthLimit = _ref$depthLimit === void 0 ? -1 : _ref$depthLimit

  var traceMap = []

  var doTrace = function doTrace (trace) {
    trace.references.forEach(function (referenceId) {
      var index = traceMap.length
      var referenceDetail = trace.details[referenceId]
      referenceDetail.value.forEach(function (val) {
        if (_typeof(val) === 'object') {
          var tempTrace = traceObject(val)

          if (traceMap[index]) {
            traceMap[index] = assignTraceObject(traceMap[index], tempTrace)
          }

          var existingTraceIndex = traceMap.findIndex(function (map) {
            return compareTrace(tempTrace, map)
          })

          if (existingTraceIndex >= 0) {
            index = existingTraceIndex
            referenceDetail.reference = existingTraceIndex
            referenceDetail.circular = true
            return referenceDetail
          }

          traceMap[index] = tempTrace
        }
      })
      referenceDetail.reference = index
    })
    trace.references.forEach(function (referenceId) {
      var referenceDetail = trace.details[referenceId]
      return !referenceDetail.circular ? doTrace(traceMap[referenceDetail.reference]) : true
    })
    return traceMap
  }

  return doTrace(traceObject([object]))
}
/**
 * Clone objects for manipulation without data corruption, returns a copy of the provided object.
 * @param {Object} object - The original object that is being cloned
 * @returns {Object}
 */

exports.traceObjectMap = traceObjectMap

var cloneObject = function cloneObject (object) {
  return JSON.parse(JSON.stringify(object))
}
/**
 * Merge two objects and provide clone or original on the provided function.
 * The passed function should accept a minimum of two objects to be merged.
 * If the desire is to mutate the input objects, then the function name should
 * have the word 'mutable' in the name (case-insensitive).
 * @param {boolean} isMutable - An optional flag which indicates whether we will clone objects or directly
 * @param {mergeObjects|mergeObjectsMutable|Function} fn - Pass one of
 * the mergeObjects functions to be used
 * @param {Object} obj1 - The receiving object; this is the object which will have it's properties overridden
 * @param {Object} obj2 - The contributing object; this is the object which will contribute new properties and
 * override existing ones
 * modify them
 * @returns {Object}
 */

exports.cloneObject = cloneObject

var mergeObjectsBase = function mergeObjectsBase (isMutable, fn, obj1, obj2) {
  return notEmptyObjectOrArray(obj2) ? mapObject(obj2, function (prop, key) {
    return obj1[key] ? fn(obj1[key], prop) : prop
  }, isMutable ? obj1 : cloneObject(obj1)) : obj2
}
/**
 * Perform a deep merge of objects. This will combine all objects and sub-objects,
 * objects having the same attributes will overwrite starting from the end of the argument
 * list and bubbling up to return a merged version of the first object.
 * WARNING: This is a recursive function.
 * @param {...Object} args - Provide a list of objects which will be merged starting from the end up into the first
 * object
 * @returns {Object}
 */

var mergeObjects = function mergeObjects () {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2]
  }

  return args.length === 2 ? mergeObjectsBase(false, mergeObjects, args[0], args[1]) : args.length === 1 ? cloneObject(args[0]) : args.reduce((0, _functions.curry)(mergeObjectsBase)(false, mergeObjects), {})
}
/**
 * Perform a deep merge of objects. This will combine all objects and sub-objects,
 * objects having the same attributes will overwrite starting from the end of the argument
 * list and bubbling up to return the overwritten first object.
 * WARNING: This is a recursive function.
 * WARNING: This will mutate the first object passed in as input
 * @param {...Object} args - Provide a list of objects which will be merged starting from the end up into the first
 * object
 * @returns {Object}
 */

exports.mergeObjects = mergeObjects

var mergeObjectsMutable = function mergeObjectsMutable () {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3]
  }

  return args.length === 2 ? mergeObjectsBase(true, mergeObjectsMutable, args[0], args[1]) : args.length === 1 ? args[0] : args.reduce((0, _functions.curry)(mergeObjectsBase)(true, mergeObjectsMutable), {})
}

exports.mergeObjectsMutable = mergeObjectsMutable
