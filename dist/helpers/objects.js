'use strict'

require('core-js/modules/es.symbol')

require('core-js/modules/es.symbol.description')

require('core-js/modules/es.symbol.iterator')

require('core-js/modules/es.array.filter')

require('core-js/modules/es.array.find-index')

require('core-js/modules/es.array.includes')

require('core-js/modules/es.array.iterator')

require('core-js/modules/es.array.map')

require('core-js/modules/es.array.reduce')

require('core-js/modules/es.function.name')

require('core-js/modules/es.object.assign')

require('core-js/modules/es.object.get-own-property-names')

require('core-js/modules/es.object.to-string')

require('core-js/modules/es.string.includes')

require('core-js/modules/es.string.iterator')

require('core-js/modules/web.dom-collections.iterator')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.mergeObjectsMutable = exports.mergeObjects = exports.cloneObject = exports.assignNewReferences = exports.mapOriginalObject = exports.isReferenceObject = exports.emptyObject = exports.reduceObject = exports.filterObject = exports.mapProperty = exports.mapObject = exports.isInstanceObject = exports.objectValues = exports.objectKeys = exports.setAndReturnValue = exports.setValue = void 0

require('core-js/stable')

var _functions = require('./functions')

function _typeof (obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof (obj) { return typeof obj } } else { _typeof = function _typeof (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj } } return _typeof(obj) }

/**
 * Set a value on an item, then return the item.
 * NOTE: Argument order designed for usage with pipe
 * @function
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
 * @function
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
 * Get an array of keys from any object or array. Will return empty array when invalid or there are no keys.
 * Optional flag will include the inherited keys from prototype chain when set.
 * @param {Object|Array} object
 * @param {boolean} [includeInherited=false]
 * @returns {Array.<string|number>}
 */

exports.setAndReturnValue = setAndReturnValue

var objectKeys = function objectKeys (object) {
  var includeInherited = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false

  if (typeof object !== 'function' && (_typeof(object) !== 'object' || object === null)) {
    return []
  }

  if (includeInherited) {
    var propNames = Object.getOwnPropertyNames(object)

    if (propNames.length) {
      return propNames
    }
  }

  var keys = []

  for (var key in object) {
    if (includeInherited || Object.prototype.hasOwnProperty.call(object, key)) {
      if (Array.isArray(object)) {
        keys.push(parseInt(key))
        continue
      }

      keys.push(key)
    }
  }

  return keys
}
/**
 * Get an array of values from any object or array. Will return empty array when invalid or there are no values.
 * Optional flag will include the inherited values from prototype chain when set.
 * @param {Object|Array} object
 * @param {boolean} [includeInherited=false]
 * @returns {Array}
 */

exports.objectKeys = objectKeys

var objectValues = function objectValues (object) {
  var includeInherited = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false
  return objectKeys(object, includeInherited).map(function (key) {
    return object[key]
  })
}
/**
 * Check if the current object has inherited properties.
 * @param {Object|Array} object
 */

exports.objectValues = objectValues

var isInstanceObject = function isInstanceObject (object) {
  if (typeof object !== 'function' && (_typeof(object) !== 'object' || object === null)) {
    return false
  }

  if (!['Array', 'Function', 'Object'].includes(object.constructor.name)) {
    return true
  }

  return object.constructor.name !== 'Array' && objectKeys(object, true).length > objectKeys(object).length
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
 * @function
 * @param {Object|Array} obj - The Object (or Array) to be mapped
 * @param {module:objectHelpers~mapCallback|Function} fn - The function to be processed for each mapped property
 * @param {Object|Array} [thisArg] - Optional. Value to use as this when executing callback.
 * @returns {Object|Array}
 */

exports.isInstanceObject = isInstanceObject

var mapObject = function mapObject (obj, fn) {
  var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined
  return Array.isArray(obj) ? obj.map(fn, thisArg) : objectKeys(obj, true).reduce(function (newObj, curr) {
    return setValue(curr, (0, _functions.callWithParams)(fn, [obj[curr], curr, obj], 2), newObj)
  }, thisArg || {})
}
/**
 * Perform map on an array property of an object, then return the object
 * @function
 * @param {string} property - The string key for the array property to be mapped
 * @param {module:objectHelpers~mapCallback|Function} mapFunction - A function suitable to be passed to map
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
 * @function
 * @param {Object|Array} obj - The Object (or Array) to be filtered
 * @param {module:objectHelpers~filterCallback|Function} fn - The function to be processed for each filtered property
 * @param {Object|Array} [thisArg] - Optional. Value to use as this when executing callback.
 * @returns {Object|Array}
 */

exports.mapProperty = mapProperty

var filterObject = function filterObject (obj, fn) {
  var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined
  return Array.isArray(obj) ? obj.filter(fn, thisArg) : objectKeys(obj, true).reduce(function (newObj, curr) {
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
 * @function
 * @param {Object|Array} obj - The Object (or Array) to be filtered
 * @param {module:objectHelpers~reduceCallback|Function} fn - The function to be processed for each filtered property
 * @param {Object|Array} [initialValue] - Optional. Value to use as the first argument to the first call of the
 * callback. If no initial value is supplied, the first element in the array will be used. Calling reduce on an empty
 * array without an initial value is an error.
 * @returns {Object|Array}
 */

exports.filterObject = filterObject

var reduceObject = function reduceObject (obj, fn) {
  var initialValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : obj[objectKeys(obj)[0]] || obj[0]
  return Array.isArray(obj) ? obj.reduce(fn, initialValue) : objectKeys(obj, true).reduce(function (newObj, curr) {
    return (0, _functions.callWithParams)(fn, [newObj, obj[curr], curr, obj], 2)
  }, initialValue)
}
/**
 * Helper function for testing if the item is an Object or Array that does not have any properties
 * @function
 * @param {Object|Array} item - Object or Array to test
 * @returns {boolean}
 */

exports.reduceObject = reduceObject

var emptyObject = function emptyObject (item) {
  return !objectKeys(item).length
}
/**
 * Determine if the value is a reference instance
 * @param {Array|Object|*} value
 * @returns {boolean}
 */

exports.emptyObject = emptyObject

var isReferenceObject = function isReferenceObject (value) {
  return _typeof(value) === 'object' && value !== null && !isInstanceObject(value) && !emptyObject(value)
}
/**
 * Check if this value represents an object that needs to be used as a reference.
 * @param {*} value
 * @returns {boolean}
 */

exports.isReferenceObject = isReferenceObject

var nonReference = function nonReference (value) {
  return _typeof(value) !== 'object' || !isReferenceObject(value) || emptyObject(value) || isInstanceObject(value)
}
/**
 * @typedef {Object.<string, number|Object|Array>} referenceIdentifier
 * @property {number} index
 * @property {Array|Object} object
 * @property {Array|Object} original
 * @property {Array.<string|number>} references
 * @property {Array.<string|number>} circular
 */

/**
 * Create a referenceIdentifier for building the object clone.
 * @param {Array|Object} [object=null]
 * @param {number} [index=0]
 * @returns {referenceIdentifier}
 */

var createReferenceIdentifier = function createReferenceIdentifier () {
  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
  return Object.assign({}, {
    index: index,
    object: object,
    original: object,
    references: [],
    circular: []
  })
}
/**
 * Prepare to map over an object and return the callback that will be used for each reference.
 * @function
 * @param {Array.<referenceIdentifier>} [newReferenceMap=[]]
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=1000000000]
 * @param {depthLimit} [options.depthLimit=-1]
 * @returns {mapOriginal}
 */

var mapOriginalObject = function mapOriginalObject () {
  var newReferenceMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  var _ref$mapLimit = _ref.mapLimit
  var mapLimit = _ref$mapLimit === void 0 ? 1000000000 : _ref$mapLimit
  var _ref$depthLimit = _ref.depthLimit
  var depthLimit = _ref$depthLimit === void 0 ? -1 : _ref$depthLimit

  /**
     * Map over the provided object and generate an array of cloned references.
     * @function
     * @param {Array|Object} focusObject
     * @param {number} index
     * @param {number|null} limit
     * @returns {Array.<referenceIdentifier>}
     */
  var mapOriginal = function mapOriginal (focusObject) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
    var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null

    if (limit === null) {
      limit = depthLimit
    }

    if (!newReferenceMap[index]) {
      newReferenceMap[index] = createReferenceIdentifier(focusObject, index)
    }

    var skip = limit === 0

    if (Array.isArray(focusObject)) {
      newReferenceMap[index].object = focusObject.map(function (item, id) {
        if (nonReference(item)) {
          return item
        }

        skip = skip || index + newReferenceMap[index].references.length + 1 >= mapLimit

        if (!skip) {
          newReferenceMap[index].references.push(id)
          return null
        }

        return Array.isArray(item) ? [] : {}
      }, [])
    } else {
      newReferenceMap[index].object = objectKeys(focusObject).reduce(function (newRef, key) {
        if (nonReference(focusObject[key])) {
          return setValue(key, focusObject[key], newRef)
        }

        skip = skip || index + newReferenceMap[index].references.length + 1 >= mapLimit

        if (!skip) {
          newReferenceMap[index].references.push(key)
          newRef[key] = null
          return setValue(key, null, newRef)
        }

        return setValue(key, Array.isArray(focusObject[key]) ? [] : {}, newRef)
      }, {})
    }

    return newReferenceMap[index].references.reduce(function (newRef, key) {
      var newRefIndex = newReferenceMap.length
      var objectToRef = focusObject[key]
      var existingIndex = newReferenceMap.findIndex(function (existing) {
        return objectToRef === existing.original
      })

      if (existingIndex >= 0) {
        newRef.object[key] = existingIndex
        newRef.circular.push(key)
        return newRef
      }

      if (newRefIndex >= mapLimit) {
        newRef.object[key] = Array.isArray(focusObject[key]) ? [] : {}
        return newRef
      }

      if (limit === 0) {
        return newReferenceMap[index]
      }

      newRef.object[key] = newRefIndex
      newReferenceMap[newRefIndex] = mapOriginal(objectToRef, newRef.object[key], --limit)
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
      return setValue(key, reference.circular.includes(key) ? newReferenceMap[newRef[key]].object : assignReferences(newReferenceMap[newRef[key]]), newRef)
    }, reference.object)
  }

  return assignReferences
}
/**
 * Clone objects for manipulation without data corruption, returns a copy of the provided object.
 * @function
 * @param {Object} object - The original object that is being cloned
 * @param {Object} [options={}]
 * @param {module:descriptorSamples~descriptorMap} options.descriptorMap - The map of the object
 * @param {number} [options.mapLimit=1000000000]
 * @param {depthLimit} [options.depthLimit=-1]
 * @returns {Object}
 */

exports.assignNewReferences = assignNewReferences

var cloneObject = function cloneObject (object) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  var _ref2$mapLimit = _ref2.mapLimit
  var mapLimit = _ref2$mapLimit === void 0 ? 1000000000 : _ref2$mapLimit
  var _ref2$depthLimit = _ref2.depthLimit
  var depthLimit = _ref2$depthLimit === void 0 ? -1 : _ref2$depthLimit

  var newReferenceMap = []
  newReferenceMap[0] = mapOriginalObject(newReferenceMap, {
    mapLimit: mapLimit,
    depthLimit: depthLimit
  })(object)
  return assignNewReferences(newReferenceMap)(newReferenceMap[0])
}
/**
 * Merge two objects and provide clone or original on the provided function.
 * The passed function should accept a minimum of two objects to be merged.
 * If the desire is to mutate the input objects, then the function name should
 * have the word 'mutable' in the name (case-insensitive).
 * @function
 * @param {boolean} isMutable - An optional flag which indicates whether we will clone objects or directly
 * @param {module:objectHelpers.mergeObjects|module:objectHelpers.mergeObjectsMutable|Function} fn - Pass one of
 * the mergeObjects functions to be used
 * @param {Object} obj1 - The receiving object; this is the object which will have it's properties overridden
 * @param {Object} obj2 - The contributing object; this is the object which will contribute new properties and
 * override existing ones
 * modify them
 * @returns {Object}
 */

exports.cloneObject = cloneObject

var mergeObjectsBase = function mergeObjectsBase (isMutable, fn, obj1, obj2) {
  return !emptyObject(obj2) ? mapObject(obj2, function (prop, key) {
    return obj1[key] ? fn(obj1[key], prop) : prop
  }, isMutable ? obj1 : cloneObject(obj1)) : obj2
}
/**
 * Perform a deep merge of objects. This will combine all objects and sub-objects,
 * objects having the same attributes will overwrite starting from the end of the argument
 * list and bubbling up to return a merged version of the first object.
 * WARNING: This is a recursive function.
 * @function
 * @param {...Object} args - Provide a list of objects which will be merged starting from the end up into the first
 * object
 * @returns {Object}
 */

var mergeObjects = function mergeObjects () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key]
  }

  return args.length === 2 ? mergeObjectsBase(false, mergeObjects, args[0], args[1]) : args.length === 1 ? cloneObject(args[0]) : args.reduce((0, _functions.curry)(mergeObjectsBase)(false, mergeObjects), {})
}
/**
 * Perform a deep merge of objects. This will combine all objects and sub-objects,
 * objects having the same attributes will overwrite starting from the end of the argument
 * list and bubbling up to return the overwritten first object.
 * WARNING: This is a recursive function.
 * WARNING: This will mutate the first object passed in as input
 * @function
 * @param {...Object} args - Provide a list of objects which will be merged starting from the end up into the first
 * object
 * @returns {Object}
 */

exports.mergeObjects = mergeObjects

var mergeObjectsMutable = function mergeObjectsMutable () {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2]
  }

  return args.length === 2 ? mergeObjectsBase(true, mergeObjectsMutable, args[0], args[1]) : args.length === 1 ? args[0] : args.reduce((0, _functions.curry)(mergeObjectsBase)(true, mergeObjectsMutable), {})
}

exports.mergeObjectsMutable = mergeObjectsMutable
