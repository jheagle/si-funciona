/**
 * Simplify working with object by providing array-like parsing. Also, provides cloning and merging along with accessors that always have a return value for optimal nesting.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module objectHelpers
 */

import 'core-js/stable'
import { curry, callWithParams } from './functions'
import { uniqueArray } from './arrays'

/**
 * Set a value on an item, then return the item
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
 * @param {Object|Array} item - An object or array to be updated
 * @param {string|number} key - The key on the item which will have its value set
 * @param {*} value - Any value to be applied to the key
 * @returns {*}
 */
export const setAndReturnValue = (item, key, value) => {
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
export const mapObject = (obj, fn, thisArg = undefined) => Array.isArray(obj)
  ? obj.map(fn, thisArg)
  : Object.keys(obj).reduce(
    (newObj, curr) => setValue(
      curr,
      callWithParams(fn, [obj[curr], curr, obj], 2),
      newObj
    ),
    thisArg || {}
  )

/**
 * Perform map on an array property of an object, then return the object
 * @param {string} property - The string key for the array property to be mapped
 * @param {mapCallback|function} mapFunction - A function suitable to be passed to map
 * @param {Object|Array} obj - An object having an array property
 * @returns {object}
 */
export const mapProperty = (property, mapFunction, obj) => {
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
export const filterObject = (obj, fn, thisArg = undefined) => Array.isArray(obj)
  ? obj.filter(fn, thisArg)
  : Object.keys(obj).reduce((newObj, curr) => {
    if (callWithParams(fn, [obj[curr], curr, obj], 2)) {
      newObj[curr] = obj[curr]
    } else {
      delete newObj[curr]
    }
    return newObj
  }, thisArg || {})

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
export const reduceObject = (obj, fn, initialValue = obj[Object.keys(obj)[0]] || obj[0]) => Array.isArray(obj)
  ? obj.reduce(fn, initialValue)
  : Object.keys(obj).reduce(
    (newObj, curr) => callWithParams(fn, [newObj, obj[curr], curr, obj], 2),
    initialValue
  )

/**
 * Helper function for testing if the item is an Object or Array that contains properties or elements
 * @param {Object|Array} item - Object or Array to test
 * @returns {boolean}
 */
export const notEmptyObjectOrArray = item => !!(
  (typeof item === 'object' && Object.keys(item).length) || (Array.isArray(item) && item.length)
)

/**
 * Trace an object's attribute and provide details about it.
 * @param {*} value
 * @param {string|number} [key=0]
 * @param {number} [index=0]
 * @returns {objectMapDetail}
 */
export const traceObjectDetail = (value, key = 0, index = 0) => {
  const type = (typeof value)
  const isReference = (type === 'object' && value !== null)
  return {
    index: index,
    key: key,
    type: value === null ? [] : [type],
    value: [value],
    nullable: value === null,
    isReference: isReference,
    reference: null
  }
}

/**
 * Trace an object and return the trace which defines the object's structure and attributes.
 * @param {Object} object
 * @returns {objectMap}
 */
export const traceObject = object => {
  const objectMap = reduceObject(
    object,
    (objectMap, value, key) => {
      if (typeof key === 'number' && objectMap.details.length) {
        const type = (typeof value)
        const isReference = (type === 'object' && value !== null)
        if (value !== null) {
          objectMap.details[0].type = uniqueArray([...objectMap.details[0].type, type])
        }
        objectMap.details[0].value = uniqueArray([...objectMap.details[0].value, value])
        objectMap.details[0].nullable = objectMap.details[0].nullable || value === null
        objectMap.details[0].isReference = objectMap.details[0].isReference || isReference
        ++objectMap.length
        return objectMap
      }
      objectMap.details = [...objectMap.details, traceObjectDetail(value, key, objectMap.length++)]
      return objectMap
    },
    {
      details: [],
      length: 0,
      keys: [],
      types: [],
      references: [],
      isArray: false,
      complete: false
    }
  )
  objectMap.keys = uniqueArray(objectMap.details.map(detail => detail.key))
  objectMap.types = uniqueArray(objectMap.details.map(detail => detail.type))
  objectMap.references = uniqueArray(objectMap.details.filter(detail => detail.isReference).map(detail => detail.index))
  objectMap.complete = !objectMap.references.length
  objectMap.isArray = objectMap.keys.every(key => (typeof key === 'number'))
  return objectMap
}

/**
 * Clone objects for manipulation without data corruption, returns a copy of the provided object.
 * @param {Object} object - The original object that is being cloned
 * @returns {Object}
 */
export const cloneObject = object => JSON.parse(JSON.stringify(object))

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
const mergeObjectsBase = (isMutable, fn, obj1, obj2) => notEmptyObjectOrArray(obj2)
  ? mapObject(
    obj2,
    (prop, key) => (obj1[key])
      ? fn(obj1[key], prop)
      : prop,
    isMutable ? obj1 : cloneObject(obj1)
  )
  : obj2

/**
 * Perform a deep merge of objects. This will combine all objects and sub-objects,
 * objects having the same attributes will overwrite starting from the end of the argument
 * list and bubbling up to return a merged version of the first object.
 * WARNING: This is a recursive function.
 * @param {...Object} args - Provide a list of objects which will be merged starting from the end up into the first
 * object
 * @returns {Object}
 */
export const mergeObjects = (...args) => args.length === 2
  ? mergeObjectsBase(false, mergeObjects, args[0], args[1])
  : args.length === 1
    ? cloneObject(args[0])
    : args.reduce(curry(mergeObjectsBase)(false, mergeObjects), {})

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
export const mergeObjectsMutable = (...args) => args.length === 2
  ? mergeObjectsBase(true, mergeObjectsMutable, args[0], args[1])
  : args.length === 1
    ? args[0]
    : args.reduce(curry(mergeObjectsBase)(true, mergeObjectsMutable), {})
