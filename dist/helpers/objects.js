;(function () {
  'use strict'

  require('core-js/modules/es.symbol')

  require('core-js/modules/es.symbol.description')

  require('core-js/modules/es.symbol.iterator')

  require('core-js/modules/es.array.filter')

  require('core-js/modules/es.array.iterator')

  require('core-js/modules/es.array.map')

  require('core-js/modules/es.array.reduce')

  require('core-js/modules/es.object.keys')

  require('core-js/modules/es.object.to-string')

  require('core-js/modules/es.string.iterator')

  require('core-js/modules/web.dom-collections.iterator')

  Object.defineProperty(exports, '__esModule', {
    value: true
  })
  exports.default = exports.mergeObjectsMutable = exports.mergeObjects = exports.cloneObject = exports.notEmptyObjectOrArray = exports.reduceObject = exports.filterObject = exports.mapProperty = exports.mapObject = exports.setAndReturnValue = exports.setValue = void 0

  require('core-js/stable')

  var _functions = require('./functions')

  function _typeof (obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof (obj) { return typeof obj } } else { _typeof = function _typeof (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj } } return _typeof(obj) }

  /**
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 */

  /**
 * Simplify working with object by providing array-like parsing. Also, provides cloning and merging along with accessors that always have a return value for optimal nesting.
 * @module objectHelpers
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 */
  var objectHelpers = {}
  /**
 * Set a value on an item, then return the item
 * @function setValue
 * @param {string|number} key - The key on the item which will have its value set
 * @param {*} value - Any value to be applied to the key
 * @param {Object|Array} item - An object or array to be updated
 * @returns {Object|Array}
 */

  var setValue = function setValue (key, value, item) {
    item[key] = value
    return item
  }

  exports.setValue = setValue
  objectHelpers.setValue = setValue
  /**
 * Set a value on an item, then return the value
 * @function setAndReturnValue
 * @param {Object|Array} item - An object or array to be updated
 * @param {string|number} key - The key on the item which will have its value set
 * @param {*} value - Any value to be applied to the key
 * @returns {*}
 */

  var setAndReturnValue = function setAndReturnValue (item, key, value) {
    item[key] = value
    return value
  }

  exports.setAndReturnValue = setAndReturnValue
  objectHelpers.setAndReturnValue = setAndReturnValue
  /**
 * Function that produces a property of the new Object, taking three arguments
 * @callback module:objectHelpers~mapCallback
 * @param {*} currentProperty - The current property being processed in the object.
 * @param {string} [currentIndex] - The property name of the current property being processed in the object.
 * @param {Object|Array} [object] - The object map was called upon.
 * @returns {*}
 */

  /**
 * This function is intended to replicate behaviour of the Array.map() function but for Objects.
 * If an array is passed in instead then it will perform standard map(). It is recommended to
 * always use the standard map() function when it is known that the object is actually an array.
 * @function mapObject
 * @param {Object|Array} obj - The Object (or Array) to be mapped
 * @param {module:objectHelpers~mapCallback|function} fn - The function to be processed for each mapped property
 * @param {Object|Array} [thisArg] - Optional. Value to use as this when executing callback.
 * @returns {Object|Array}
 */

  var mapObject = function mapObject (obj, fn) {
    var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined
    return Array.isArray(obj) ? obj.map(fn, thisArg) : Object.keys(obj).reduce(function (newObj, curr) {
      return setValue(curr, (0, _functions.callWithParams)(fn, [obj[curr], curr, obj], 2), newObj)
    }, thisArg || {})
  }

  exports.mapObject = mapObject
  objectHelpers.mapObject = mapObject
  /**
 * Perform map on an array property of an object, then return the object
 * @function mapArrayProperty
 * @param {string} property - The string key for the array property to be mapped
 * @param {module:objectHelpers~mapCallback|function} mapFunction - A function suitable to be passed to map
 * @param {Object|Array} obj - An object having an array property
 * @returns {object}
 */

  var mapProperty = function mapProperty (property, mapFunction, obj) {
    obj[property] = mapObject(obj[property] || [], mapFunction)
    return obj
  }

  exports.mapProperty = mapProperty
  objectHelpers.mapProperty = mapProperty
  /**
 * Function is a predicate, to test each property value of the object. Return true to keep the element, false
 * otherwise, taking three arguments
 * @callback module:objectHelpers~filterCallback
 * @param {*} currentProperty - The current property being processed in the object.
 * @param {string} [currentIndex] - The property name of the current property being processed in the object.
 * @param {Object|Array} [object] - The object filter was called upon.
 * @returns {boolean}
 */

  /**
 * This function is intended to replicate behaviour of the Array.filter() function but for Objects.
 * If an array is passed in instead then it will perform standard filter(). It is recommended to
 * always use the standard filter() function when it is known that the object is actually an array.
 * @function filterObject
 * @param {Object|Array} obj - The Object (or Array) to be filtered
 * @param {module:objectHelpers~filterCallback|function} fn - The function to be processed for each filtered property
 * @param {Object|Array} [thisArg] - Optional. Value to use as this when executing callback.
 * @returns {Object|Array}
 */

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

  exports.filterObject = filterObject
  objectHelpers.filterObject = filterObject
  /**
 * Function to execute on each property in the object, taking four arguments
 * @callback module:objectHelpers~reduceCallback
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
 * @function reduceObject
 * @param {Object|Array} obj - The Object (or Array) to be filtered
 * @param {module:objectHelpers~reduceCallback|function} fn - The function to be processed for each filtered property
 * @param {Object|Array} [initialValue] - Optional. Value to use as the first argument to the first call of the
 * callback. If no initial value is supplied, the first element in the array will be used. Calling reduce on an empty
 * array without an initial value is an error.
 * @returns {Object|Array}
 */

  var reduceObject = function reduceObject (obj, fn) {
    var initialValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : obj[Object.keys(obj)[0]] || obj[0]
    return Array.isArray(obj) ? obj.reduce(fn, initialValue) : Object.keys(obj).reduce(function (newObj, curr) {
      return (0, _functions.callWithParams)(fn, [newObj, obj[curr], curr, obj], 2)
    }, initialValue)
  }

  exports.reduceObject = reduceObject
  objectHelpers.reduceObject = reduceObject
  /**
 * Helper function for testing if the item is an Object or Array that contains properties or elements
 * @function notEmptyObjectOrArray
 * @param {Object|Array} item - Object or Array to test
 * @returns {boolean}
 */

  var notEmptyObjectOrArray = function notEmptyObjectOrArray (item) {
    return !!(_typeof(item) === 'object' && Object.keys(item).length || Array.isArray(item) && item.length)
  }

  exports.notEmptyObjectOrArray = notEmptyObjectOrArray
  objectHelpers.notEmptyObjectOrArray = notEmptyObjectOrArray
  /**
 * Re-add the Object Properties which cannot be cloned and must be directly copied to the new cloned object
 * WARNING: This is a recursive function.
 * @param {Object} cloned - A value-only copy of the original object
 * @param {Object} object - The original object that is being cloned
 * @returns {Object|Array}
 */

  var cloneCopy = function cloneCopy (object, cloned) {
    return notEmptyObjectOrArray(object) ? reduceObject(object, function (start, prop, key) {
      start[key] = cloned[key] && !/^(parentItem|listenerArgs|element)$/.test(key) ? cloneCopy(prop, cloned[key]) : prop
      return start
    }, cloned) : cloned
  }
  /**
 * Clone objects for manipulation without data corruption, returns a copy of the provided object.
 * @function cloneObject
 * @param {Object} object - The original object that is being cloned
 * @returns {Object}
 */

  var cloneObject = function cloneObject (object) {
    return cloneCopy(object, JSON.parse(JSON.stringify(object, function (key, val) {
      return !/^(parentItem|listenerArgs|element)$/.test(key) ? val : undefined
    })))
  }

  exports.cloneObject = cloneObject
  objectHelpers.cloneObject = cloneObject
  /**
 * Merge two objects and provide clone or original on the provided function.
 * The passed function should accept a minimum of two objects to be merged.
 * If the desire is to mutate the input objects, then the function name should
 * have the word 'mutable' in the name (case-insensitive).
 * @param {module:objectHelpers.mergeObjects|module:objectHelpers.mergeObjectsMutable|Function} fn - Pass one of
 * the mergeObjects functions to be used
 * @param {Object} obj1 - The receiving object; this is the object which will have it's properties overridden
 * @param {Object} obj2 - The contributing object; this is the object which will contribute new properties and
 * override existing ones
 * @param {boolean} [isMutable=false] - An optional flag which indicates whether we will clone objects or directly
 * modify them
 * @returns {Object}
 */

  var mergeObjectsBase = function mergeObjectsBase (fn, obj1, obj2) {
    var isMutable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false
    return notEmptyObjectOrArray(obj2) ? mapObject(obj2, function (prop, key) {
      return obj1[key] && !/^(parentItem|listenerArgs|element)$/.test(key) ? fn(obj1[key], prop) : prop
    }, isMutable ? obj1 : cloneObject(obj1)) : obj2
  }
  /**
 * Perform a deep merge of objects. This will combine all objects and sub-objects,
 * objects having the same attributes will overwrite starting from the end of the argument
 * list and bubbling up to return a merged version of the first object.
 * WARNING: This is a recursive function.
 * @function mergeObjects
 * @param {...Object} args - Provide a list of objects which will be merged starting from the end up into the first
 * object
 * @returns {Object}
 */

  var mergeObjects = function mergeObjects () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }

    return args.length === 2 ? mergeObjectsBase(mergeObjects, args[0], args[1]) : args.length === 1 ? cloneObject(args[0]) : args.reduce((0, _functions.curry)(mergeObjectsBase)(mergeObjects), {})
  }

  exports.mergeObjects = mergeObjects
  objectHelpers.mergeObjects = mergeObjects
  /**
 * Perform a deep merge of objects. This will combine all objects and sub-objects,
 * objects having the same attributes will overwrite starting from the end of the argument
 * list and bubbling up to return the overwritten first object.
 * WARNING: This is a recursive function.
 * WARNING: This will mutate the first object passed in as input
 * @function mergeObjectsMutable
 * @param {...Object} args - Provide a list of objects which will be merged starting from the end up into the first
 * object
 * @returns {Object}
 */

  var mergeObjectsMutable = function mergeObjectsMutable () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2]
    }

    return args.length === 2 ? mergeObjectsBase(mergeObjectsMutable, args[0], args[1], true) : args.length === 1 ? args[0] : args.reduce((0, _functions.curry)(mergeObjectsBase)(mergeObjectsMutable), {})
  }

  exports.mergeObjectsMutable = mergeObjectsMutable
  objectHelpers.mergeObjectsMutable = mergeObjectsMutable
  var _default = objectHelpers
  exports.default = _default
  this.objectHelpers = objectHelpers
}).call(this || window || {})
