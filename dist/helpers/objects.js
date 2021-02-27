'use strict'

require('core-js/modules/es.array.from.js')

require('core-js/modules/es.array.slice.js')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.mergeObjects = exports.mergeObjectsSettings = exports.cloneObject = exports.isCloneable = exports.isInstanceObject = exports.emptyObject = exports.reduceObject = exports.filterObject = exports.mapObject = exports.objectValues = exports.objectKeys = exports.isObject = exports.setAndReturnValue = exports.setValue = void 0

require('core-js/modules/es.object.get-own-property-names.js')

require('core-js/modules/es.array.map.js')

require('core-js/modules/es.array.reduce.js')

require('core-js/modules/es.array.filter.js')

require('core-js/modules/es.array.includes.js')

require('core-js/modules/es.function.name.js')

require('core-js/modules/es.symbol.js')

require('core-js/modules/es.symbol.description.js')

require('core-js/modules/es.object.to-string.js')

require('core-js/modules/es.symbol.iterator.js')

require('core-js/modules/es.string.iterator.js')

require('core-js/modules/es.array.iterator.js')

require('core-js/modules/web.dom-collections.iterator.js')

require('core-js/stable')

var _functions = require('./functions')

var _cloneHelpers = require('./objects/cloneHelpers')

var _mergeHelpers = require('./objects/mergeHelpers')

function _toConsumableArray (arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread() }

function _nonIterableSpread () { throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.') }

function _unsupportedIterableToArray (o, minLen) { if (!o) return; if (typeof o === 'string') return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) n = o.constructor.name; if (n === 'Map' || n === 'Set') return Array.from(o); if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen) }

function _iterableToArray (iter) { if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(iter)) return Array.from(iter) }

function _arrayWithoutHoles (arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr) }

function _arrayLikeToArray (arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i] } return arr2 }

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
  return _typeof(value) === 'object' && value !== null && !isInstanceObject(value) && !emptyObject(value)
}
/**
 * Clone objects for manipulation without data corruption, returns a copy of the provided object.
 * @function
 * @param {Object} object - The original object that is being cloned
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=100]
 * @param {depthLimit} [options.depthLimit=-1]
 * @returns {Object}
 */

exports.isCloneable = isCloneable

var cloneObject = function cloneObject (object) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  var _ref$mapLimit = _ref.mapLimit
  var mapLimit = _ref$mapLimit === void 0 ? 100 : _ref$mapLimit
  var _ref$depthLimit = _ref.depthLimit
  var depthLimit = _ref$depthLimit === void 0 ? -1 : _ref$depthLimit

  return (0, _cloneHelpers.linkReferences)((0, _cloneHelpers.processIdentifiers)(object, {
    mapLimit: mapLimit,
    depthLimit: depthLimit
  }))[0].object
}
/**
 * Perform a deep merge of objects. This will combine all objects and sub-objects,
 * objects having the same attributes will overwrite starting from the end of the argument
 * list and bubbling up to return a merged version of the first object.
 * @function
 * @param {...Object} args - Provide a list of objects which will be merged starting from the end up into the first
 * object
 * @returns {Object}
 */

exports.cloneObject = cloneObject

var mergeObjectsSettings = function mergeObjectsSettings () {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
  var _ref2$mapLimit = _ref2.mapLimit
  var mapLimit = _ref2$mapLimit === void 0 ? 100 : _ref2$mapLimit
  var _ref2$depthLimit = _ref2.depthLimit
  var depthLimit = _ref2$depthLimit === void 0 ? -1 : _ref2$depthLimit

  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }

    var base = args.shift()
    return args.reduce(function (newObj, arg) {
      return arg ? _mergeHelpers.mergeReferences.apply(void 0, _toConsumableArray((0, _mergeHelpers.processMergeIdentifiers)(newObj, arg, {
        mapLimit: mapLimit,
        depthLimit: depthLimit
      })))[0].object : newObj
    }, base || {})
  }
}

exports.mergeObjectsSettings = mergeObjectsSettings
var mergeObjects = mergeObjectsSettings()
exports.mergeObjects = mergeObjects
