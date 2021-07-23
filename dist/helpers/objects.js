'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.cloneObject = exports.mergeObjectsMutable = exports.mergeObjects = exports.mergeObjectsBase = exports.isCloneable = exports.isInstanceObject = exports.emptyObject = exports.reduceObject = exports.filterObject = exports.mapObject = exports.objectValues = exports.objectKeys = exports.isObject = exports.setAndReturnValue = exports.setValue = void 0

require('core-js/modules/es.object.get-own-property-names.js')

require('core-js/modules/es.parse-int.js')

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

require('core-js/modules/es.array.iterator.js')

require('core-js/modules/es.string.iterator.js')

require('core-js/modules/web.dom-collections.iterator.js')

require('core-js/stable')

const _functions = require('./functions')

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
const setValue = function setValue (key, value, item) {
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

const setAndReturnValue = function setAndReturnValue (item, key, value) {
  item[key] = value
  return value
}

exports.setAndReturnValue = setAndReturnValue

const isObject = function isObject (object) {
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

const objectKeys = function objectKeys (object) {
  const includeInherited = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false

  if (typeof object !== 'function' && !isObject(object)) {
    return []
  }

  if (includeInherited) {
    const propNames = Object.getOwnPropertyNames(object)

    if (propNames.length) {
      return propNames
    }
  }

  const keys = []

  for (const key in object) {
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

const objectValues = function objectValues (object) {
  const includeInherited = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false
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

const mapObject = function mapObject (obj, fn) {
  const thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined
  return Array.isArray(obj)
    ? obj.map(fn, thisArg)
    : objectKeys(obj, true).reduce(function (newObj, curr) {
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

const filterObject = function filterObject (obj, fn) {
  const thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined
  return Array.isArray(obj)
    ? obj.filter(fn, thisArg)
    : objectKeys(obj, true).reduce(function (newObj, curr) {
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

const reduceObject = function reduceObject (obj, fn) {
  const initialValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : obj[objectKeys(obj)[0]] || obj[0]
  return Array.isArray(obj)
    ? obj.reduce(fn, initialValue)
    : objectKeys(obj, true).reduce(function (newObj, curr) {
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

const emptyObject = function emptyObject (item) {
  return (typeof item === 'function' || isObject(item)) && !objectKeys(item).length
}
/**
 * Check if the current object has inherited properties.
 * @param {Object|Array} object
 * @returns {boolean}
 */

exports.emptyObject = emptyObject

const isInstanceObject = function isInstanceObject (object) {
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

const isCloneable = function isCloneable (value) {
  return _typeof(value) === 'object' && value !== null && !isInstanceObject(value)
}
/**
 * Function that takes one or more objects and combines them into one.
 * @typedef {Function} module:objects~mergeObjectsCallback
 * @param {...Object} objects - Provide a list of objects which will be merged starting from the end up into the first
 * @returns {*}
 */

/**
 * Perform a deep merge of objects. This will return a function that will combine all objects and sub-objects.
 * Objects having the same attributes will overwrite from last object to first.
 * @function
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=1000]
 * @param {number} [options.depthLimit=-1]
 * @param {number} [options.relevancyRange=100]
 * @param {Iterable} [options.map=[]]
 * @param {boolean} [options.useClone=false]
 * @returns {module:objects~mergeObjectsCallback}
 */

exports.isCloneable = isCloneable

const mergeObjectsBase = function mergeObjectsBase () {
  const _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
  const _ref$mapLimit = _ref.mapLimit
  const mapLimit = _ref$mapLimit === void 0 ? 1000 : _ref$mapLimit
  const _ref$depthLimit = _ref.depthLimit
  const depthLimit = _ref$depthLimit === void 0 ? -1 : _ref$depthLimit
  const _ref$relevancyRange = _ref.relevancyRange
  const relevancyRange = _ref$relevancyRange === void 0 ? 100 : _ref$relevancyRange
  const _ref$map = _ref.map
  let map = _ref$map === void 0 ? [] : _ref$map
  const _ref$useClone = _ref.useClone
  const useClone = _ref$useClone === void 0 ? false : _ref$useClone

  const updateMap = function updateMap (map) {
    const minRelevance = map.length - relevancyRange
    return map.filter(function (reference) {
      return reference.relevance > minRelevance
    }).map(function (reference) {
      return setValue('relevance', reference.relevance > map.length ? map.length : reference.relevance, reference)
    })
  }

  return function () {
    for (var _len = arguments.length, objects = new Array(_len), _key = 0; _key < _len; _key++) {
      objects[_key] = arguments[_key]
    }

    const firstObject = useClone ? Array.isArray(objects[0]) ? [] : {} : objects.shift()

    if (objects.length < 1) {
      return firstObject
    }

    if (depthLimit === 0) {
      return firstObject
    }

    return objects.reduce(function (newObj, arg) {
      if (!arg) {
        return newObj
      }

      map.push({
        source: arg,
        object: newObj,
        relevance: map.length
      })

      if (map.length > mapLimit) {
        map = updateMap(map)
      }

      return reduceObject(arg, function (returnObj, value, key) {
        if (isCloneable(value)) {
          let objectValue = newObj[key]
          const exists = map.find(function (existing) {
            return existing.source === value
          })

          if (exists) {
            exists.relevance = map.length + 1
            return setValue(key, exists.object, returnObj)
          }

          if (!isCloneable(objectValue) || !objectValue) {
            objectValue = useClone ? Array.isArray(value) ? [] : {} : value
          }

          if (isCloneable(objectValue)) {
            return setValue(key, mergeObjectsBase({
              mapLimit: mapLimit,
              depthLimit: depthLimit - 1,
              relevancyRange: relevancyRange,
              map: map,
              useClone: useClone
            })(objectValue, value), returnObj)
          }

          map.push({
            source: value,
            object: objectValue,
            relevance: map.length
          })

          if (map.length > mapLimit) {
            map = updateMap(map)
          }
        }

        return setValue(key, value, returnObj)
      }, newObj)
    }, firstObject || {})
  }
}
/**
 * Uses mergeObjectsBase deep merge objects and arrays, merge by value.
 * @function
 * @see {@link module:objects~mergeObjectsCallback}
 * @param {...Object} objects - Provide a list of objects which will be merged starting from the end up into the first
 * @returns {*}
 */

exports.mergeObjectsBase = mergeObjectsBase
const mergeObjects = mergeObjectsBase({
  useClone: true
})
/**
 * Uses mergeObjectsBase deep merge objects and arrays, merge by reference.
 * @function
 * @see {@link module:objects~mergeObjectsCallback}
 * @param {...Object} objects - Provide a list of objects which will be merged starting from the end up into the first
 * @returns {*}
 */

exports.mergeObjects = mergeObjects
const mergeObjectsMutable = mergeObjectsBase()
/**
 * Clone objects for manipulation without data corruption, returns a copy of the provided object.
 * @function
 * @param {Object} object - The original object that is being cloned
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=1000]
 * @param {number} [options.depthLimit=-1]
 * @param {number} [options.relevancyRange=100]
 * @param {Iterable} [options.map=[]]
 * @returns {Object}
 */

exports.mergeObjectsMutable = mergeObjectsMutable

const cloneObject = function cloneObject (object) {
  const _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  const _ref2$mapLimit = _ref2.mapLimit
  const mapLimit = _ref2$mapLimit === void 0 ? 100 : _ref2$mapLimit
  const _ref2$depthLimit = _ref2.depthLimit
  const depthLimit = _ref2$depthLimit === void 0 ? -1 : _ref2$depthLimit
  const _ref2$relevancyRange = _ref2.relevancyRange
  const relevancyRange = _ref2$relevancyRange === void 0 ? 100 : _ref2$relevancyRange
  const _ref2$map = _ref2.map
  const map = _ref2$map === void 0 ? [] : _ref2$map

  return mergeObjectsBase({
    mapLimit: mapLimit,
    depthLimit: depthLimit,
    relevancyRange: relevancyRange,
    map: map,
    useClone: true
  })(object)
}

exports.cloneObject = cloneObject
