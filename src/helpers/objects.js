/**
 * Simplify working with object by providing array-like parsing. Also, provides cloning and merging along with accessors that always have a return value for optimal nesting.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module objectHelpers
 */

import 'core-js/stable'
import { callWithParams } from './functions'

/**
 * Set a value on an item, then return the item.
 * NOTE: Argument order designed for usage with pipe
 * @function
 * @param {string|number} key - The key on the item which will have its value set
 * @param {*} value - Any value to be applied to the key
 * @param {Object|Array} item - An object or array to be updated
 * @returns {Object|Array}
 */
export const setValue = (key, value, item) => {
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
export const setAndReturnValue = (item, key, value) => {
  item[key] = value
  return value
}

export const isObject = object => typeof object === 'object' && object !== null

/**
 * Get an array of keys from any object or array. Will return empty array when invalid or there are no keys.
 * Optional flag will include the inherited keys from prototype chain when set.
 * @param {Object|Array} object
 * @param {boolean} [includeInherited=false]
 * @returns {Array.<string|number>}
 */
export const objectKeys = (object, includeInherited = false) => {
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
export const objectValues = (object, includeInherited = false) => objectKeys(object, includeInherited).map(key => object[key])

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
export const mapObject = (obj, fn, thisArg = undefined) => Array.isArray(obj)
  ? obj.map(fn, thisArg)
  : objectKeys(obj, true).reduce(
    (newObj, curr) => setValue(
      curr,
      callWithParams(fn.bind(thisArg), [obj[curr], curr, obj], 2),
      newObj
    ),
    {}
  )

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
export const filterObject = (obj, fn, thisArg = undefined) => Array.isArray(obj)
  ? obj.filter(fn, thisArg)
  : objectKeys(obj, true).reduce((newObj, curr) => {
    if (callWithParams(fn.bind(thisArg), [obj[curr], curr, obj], 2)) {
      newObj[curr] = obj[curr]
    } else {
      delete newObj[curr]
    }
    return newObj
  }, {})

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
export const reduceObject = (obj, fn, initialValue = obj[objectKeys(obj)[0]] || obj[0]) => Array.isArray(obj)
  ? obj.reduce(fn, initialValue)
  : objectKeys(obj, true).reduce(
    (newObj, curr) => callWithParams(fn, [newObj, obj[curr], curr, obj], 2),
    initialValue
  )

/**
 * Helper function for testing if the item is an Object or Array that does not have any properties
 * @function
 * @param {Object|Array} item - Object or Array to test
 * @returns {boolean}
 */
export const emptyObject = item => (typeof item === 'function' || isObject(item)) && !objectKeys(item).length

/**
 * Check if the current object has inherited properties.
 * @param {Object|Array} object
 * @returns {boolean}
 */
export const isInstanceObject = object => {
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
export const isCloneable = value => typeof value === 'object' && value !== null && !isInstanceObject(value)

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
export const mergeObjectsBase = ({
  mapLimit = 1000,
  depthLimit = -1,
  relevancyRange = 100,
  map = [],
  useClone = false,
} = {}) => {
  const updateMap = map => {
    const minRelevance = map.length - relevancyRange
    return map
      .filter(reference => reference.relevance > minRelevance)
      .map(
        reference => setValue(
          'relevance',
          reference.relevance > map.length ? map.length : reference.relevance,
          reference
        )
      )
  }
  return (...objects) => {
    const firstObject = useClone ? Array.isArray(objects[0]) ? [] : {} : objects.shift()
    if (objects.length < 1) {
      return firstObject
    }
    if (depthLimit === 0) {
      return firstObject;
    }
    return objects.reduce((newObj, arg) => {
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
      return reduceObject(arg, (returnObj, value, key) => {
        if (isCloneable(value)) {
          let objectValue = newObj[key]
          const exists = map.find(existing => existing.source === value)
          if (exists) {
            exists.relevance = map.length + 1
            return setValue(key, exists.object, returnObj)
          }
          if (!isCloneable(objectValue) || !objectValue) {
            objectValue = useClone
              ? Array.isArray(value) ? [] : {}
              : value
          }
          if (isCloneable(objectValue)) {
            return setValue(key, mergeObjectsBase({ mapLimit, depthLimit: depthLimit - 1, relevancyRange, map, useClone })(objectValue, value), returnObj)
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
export const mergeObjects = mergeObjectsBase({ useClone: true })

/**
 * Uses mergeObjectsBase deep merge objects and arrays, merge by reference.
 * @function
 * @see {@link module:objects~mergeObjectsCallback}
 * @param {...Object} objects - Provide a list of objects which will be merged starting from the end up into the first
 * @returns {*}
 */
export const mergeObjectsMutable = mergeObjectsBase()

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
export const cloneObject = (object, { mapLimit = 100, depthLimit = -1, relevancyRange = 100, map = [] } = {}) =>
  mergeObjectsBase({ mapLimit, depthLimit, relevancyRange, map, useClone: true })(object)
