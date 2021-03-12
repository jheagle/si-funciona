'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.cloneObject = exports.mergeObjects = exports.mergeObjectsBase = exports.isCloneable = exports.isInstanceObject = exports.emptyObject = exports.reduceObject = exports.filterObject = exports.mapObject = exports.objectValues = exports.objectKeys = exports.isObject = exports.setAndReturnValue = exports.setValue = void 0

require('core-js/modules/es.object.get-own-property-names.js')

require('core-js/modules/es.array.map.js')

require('core-js/modules/es.array.reduce.js')

require('core-js/modules/es.array.filter.js')

require('core-js/modules/es.array.includes.js')

require('core-js/modules/es.function.name.js')

require('core-js/modules/es.array.find.js')

require('core-js/modules/es.symbol.js')

require('core-js/modules/es.symbol.description.js')

require('core-js/modules/es.object.to-string.js')

require('core-js/modules/es.symbol.iterator.js')

require('core-js/modules/es.string.iterator.js')

require('core-js/modules/es.array.iterator.js')

require('core-js/modules/web.dom-collections.iterator.js')

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

exports.setAndReturnValue = setAndReturnValue

var isObject = function isObject (object) {
  return _typeof(object) === 'object' && object !== null
}
/**
 * Get an array of keys from any object or array. Will return empty array when invalid or there are no keys.
 * Optional flag will include the inherited keys from prototype chain when set.
 * @param {Object|Array} object
 * @param {boolean} [includeInherited=false]
 * @returns {Array.<string|number>}
 */

exports.isObject = isObject

var objectKeys = function objectKeys (object) {
  var includeInherited = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false

  if (typeof object !== 'function' && !isObject(object)) {
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

exports.objectValues = objectValues

var mapObject = function mapObject (obj, fn) {
  var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined
  return Array.isArray(obj) ? obj.map(fn, thisArg) : objectKeys(obj, true).reduce(function (newObj, curr) {
    return setValue(curr, (0, _functions.callWithParams)(fn.bind(thisArg), [obj[curr], curr, obj], 2), newObj)
  }, {})
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

exports.mapObject = mapObject

var filterObject = function filterObject (obj, fn) {
  var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined
  return Array.isArray(obj) ? obj.filter(fn, thisArg) : objectKeys(obj, true).reduce(function (newObj, curr) {
    if ((0, _functions.callWithParams)(fn.bind(thisArg), [obj[curr], curr, obj], 2)) {
      newObj[curr] = obj[curr]
    } else {
      delete newObj[curr]
    }

    return newObj
  }, {})
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
  return (typeof item === 'function' || isObject(item)) && !objectKeys(item).length
}
/**
 * Check if the current object has inherited properties.
 * @param {Object|Array} object
 * @returns {boolean}
 */

exports.emptyObject = emptyObject

var isInstanceObject = function isInstanceObject (object) {
  if (typeof object !== 'function' && !isObject(object)) {
    return false
  }

  if (!['Array', 'Function', 'Object'].includes(object.constructor.name)) {
    return true
  }

  return object.constructor.name !== 'Array' && objectKeys(object, true).length > objectKeys(object).length
}
/**
 * Determine if the value is a reference instance
 * @function
 * @param {Array|Object|*} value
 * @returns {boolean}
 */

exports.isInstanceObject = isInstanceObject

var isCloneable = function isCloneable (value) {
  return _typeof(value) === 'object' && value !== null && !isInstanceObject(value)
}
/**
 * Function that takes one or more objects and combines them into one.
 * @typedef {Function} mergeObjectsCallback
 * @param {...Object} objects - Provide a list of objects which will be merged starting from the end up into the first
 * @returns {*}
 */

/**
 * Perform a deep merge of objects. This will return a function that will combine all objects and sub-objects.
 * Objects having the same attributes will overwrite from last object to first.
 * @function
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=100]
 * @param {Iterable} [options.map=[]]
 * @param {bool} [options.useClone=false]
 * @returns {module:objects~mergeObjectsCallback}
 */

exports.isCloneable = isCloneable

var mergeObjectsBase = function mergeObjectsBase () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
  var _ref$mapLimit = _ref.mapLimit
  var mapLimit = _ref$mapLimit === void 0 ? 100 : _ref$mapLimit
  var _ref$map = _ref.map
  var map = _ref$map === void 0 ? [] : _ref$map
  var _ref$useClone = _ref.useClone
  var useClone = _ref$useClone === void 0 ? false : _ref$useClone

  return function () {
    for (var _len = arguments.length, objects = new Array(_len), _key = 0; _key < _len; _key++) {
      objects[_key] = arguments[_key]
    }

    var firstObject = objects.shift()

    if (objects.length < 1) {
      return firstObject
    }

    return objects.reduce(function (newObj, arg) {
      if (!arg) {
        return newObj
      }

      map.push({
        source: arg,
        object: newObj
      })

      if (map.length > mapLimit) {
        map.shift()
      }

      return reduceObject(arg, function (returnObj, value, key) {
        if (isCloneable(value)) {
          var objectValue = newObj[key]
          var exists = map.find(function (existing) {
            return existing.source === value
          })

          if (exists) {
            return setValue(key, exists.object, returnObj)
          }

          if (!isCloneable(objectValue) || !objectValue) {
            objectValue = useClone ? Array.isArray(value) ? [] : {} : value
          }

          if (isCloneable(objectValue)) {
            return setValue(key, mergeObjectsBase({
              mapLimit: mapLimit,
              map: map,
              useClone: useClone
            })(objectValue, value), returnObj)
          }

          map.push({
            source: value,
            object: objectValue
          })

          if (map.length > mapLimit) {
            map.shift()
          }
        }

        return setValue(key, value, returnObj)
      }, newObj)
    }, firstObject || {})
  }
}
/**
 * Uses mergeObjectsBase deep merge objects and arrays
 * @function
 * @see {@link module:objects~mergeObjectsCallback}
 * @param {...Object} objects - Provide a list of objects which will be merged starting from the end up into the first
 * @returns {*}
 */

exports.mergeObjectsBase = mergeObjectsBase
var mergeObjects = mergeObjectsBase()
/**
 * Clone objects for manipulation without data corruption, returns a copy of the provided object.
 * @function
 * @param {Object} object - The original object that is being cloned
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=100]
 * @param {Iterable} [options.map=[]]
 * @returns {Object}
 */

exports.mergeObjects = mergeObjects

var cloneObject = function cloneObject (object) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  var _ref2$mapLimit = _ref2.mapLimit
  var mapLimit = _ref2$mapLimit === void 0 ? 100 : _ref2$mapLimit
  var _ref2$map = _ref2.map
  var map = _ref2$map === void 0 ? [] : _ref2$map

  return mergeObjectsBase({
    mapLimit: mapLimit,
    map: map,
    useClone: true
  })(Array.isArray(object) ? [] : {}, object)
}

exports.cloneObject = cloneObject
