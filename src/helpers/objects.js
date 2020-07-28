/**
 * Simplify working with object by providing array-like parsing. Also, provides cloning and merging along with accessors that always have a return value for optimal nesting.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module objectHelpers
 */

import 'core-js/stable'
import { curry, callWithParams } from './functions'
import { compareArrays, uniqueArray } from './arrays'

/**
 * Set a value on an item, then return the item
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
 * @function
 * @param {string} property - The string key for the array property to be mapped
 * @param {module:objectHelpers~mapCallback|Function} mapFunction - A function suitable to be passed to map
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
 * @function
 * @param {Object|Array} obj - The Object (or Array) to be filtered
 * @param {module:objectHelpers~filterCallback|Function} fn - The function to be processed for each filtered property
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
 * @function
 * @param {Object|Array} obj - The Object (or Array) to be filtered
 * @param {module:objectHelpers~reduceCallback|Function} fn - The function to be processed for each filtered property
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
 * @function
 * @param {Object|Array} item - Object or Array to test
 * @returns {boolean}
 */
export const notEmptyObjectOrArray = item => !!(
  (typeof item === 'object' && Object.keys(item).length) || (Array.isArray(item) && item.length)
)

/**
 * Trace an object's attribute and provide details about it.
 * @function
 * @param {*} value
 * @param {string|number} [key=0]
 * @param {number} [index=0]
 * @returns {module:descriptorSamples~descriptorDetail}
 */
export const describeObjectDetail = (value, key = 0, index = 0) => {
  const type = (typeof value)
  const isReference = (type === 'object' && value !== null)
  return {
    index: index,
    key: key,
    type: value === null ? [] : [type],
    value: [value],
    nullable: value === null,
    optional: false,
    circular: false,
    isReference: isReference,
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
const descriptorKeys = descriptor => uniqueArray(descriptor.details.map(detail => detail.key))
/**
 * Create an array of the indexes in the details that contain references.
 * @function
 * @param {module:descriptorSamples~descriptor} descriptor
 * @returns {Array.<number>}
 */
const descriptorReferences = descriptor => uniqueArray(descriptor.details.filter(detail => detail.isReference).map(detail => detail.index))
/**
 * Check based on the detail keys if this descriptor represents an array.
 * @function
 * @param {module:descriptorSamples~descriptor} descriptor
 * @returns {boolean}
 */
const descriptorIsArray = descriptor => descriptor.details.every(detail => (typeof detail.key === 'number'))

/**
 * Make a copy of an object descriptor so that the original will not be mutated.
 * @function
 * @param {module:descriptorSamples~descriptor} originalMap
 * @returns {module:descriptorSamples~descriptor}
 */
const cloneDescriptor = originalMap => {
  const copyMap = {}
  copyMap.details = originalMap.details.map(detail => {
    const copyDetail = {}
    Object.keys(detail).forEach(key => {
      copyDetail[key] = Array.isArray(detail[key])
        ? detail[key].map(value => value)
        : detail[key]
    })
    return copyDetail
  })
  copyMap.length = originalMap.length
  copyMap.keys = originalMap.keys.map(key => key)
  copyMap.references = originalMap.references.map(reference => reference)
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
export const assignDescriptor = (originalMap, ...descriptors) => descriptors.reduce((assignedDescriptor, descriptor) => {
  const detailsDiff = compareArrays(assignedDescriptor.keys, descriptor.keys)
  detailsDiff.forEach(diff => {
    const existingDetail = assignedDescriptor.details.find(detail => detail.key === diff.value)
    const newDetail = descriptor.details.find(detail => detail.key === diff.value)
    if (diff.result.every(result => result === 0)) {
      assignedDescriptor.details[existingDetail.index] = Object.assign({}, existingDetail, {
        type: uniqueArray([...existingDetail.type, ...newDetail.type]),
        value: uniqueArray([...existingDetail.value, ...newDetail.value]),
        nullable: existingDetail.nullable || newDetail.nullable,
        isReference: existingDetail.isReference || newDetail.isReference,
        arrayReference: existingDetail.arrayReference || newDetail.arrayReference,
        objectReference: existingDetail.objectReference || newDetail.objectReference
      })
      return assignedDescriptor
    }
    const useDetail = diff[0] > 0 ? existingDetail : newDetail
    const useIndex = diff[0] > 0 ? useDetail.index : assignedDescriptor.length
    assignedDescriptor.details[useIndex] = Object.assign({}, useDetail, {
      index: useIndex,
      optional: true
    })
    assignedDescriptor.length = assignedDescriptor.length < assignedDescriptor.details.length
      ? assignedDescriptor.details.length
      : assignedDescriptor.length
    return assignedDescriptor
  })
  assignedDescriptor.keys = descriptorKeys(assignedDescriptor)
  assignedDescriptor.references = descriptorReferences(assignedDescriptor)
  assignedDescriptor.isArray = descriptorIsArray(assignedDescriptor)
  assignedDescriptor.complete = !assignedDescriptor.references.length
  return assignedDescriptor
}, cloneDescriptor(originalMap))

/**
 * Trace an object and return the descriptor which defines the object's structure and attributes.
 * @function
 * @param {Object} object
 * @returns {module:descriptorSamples~descriptor}
 */
export const describeObject = object => {
  const descriptor = reduceObject(
    object,
    (descriptor, value, key) => {
      if (typeof key === 'number' && descriptor.details.length) {
        const type = (typeof value)
        const isReference = (type === 'object' && value !== null)
        if (value !== null) {
          descriptor.details[0].type = uniqueArray([...descriptor.details[0].type, type])
        }
        descriptor.details[0].value = uniqueArray([...descriptor.details[0].value, value])
        descriptor.details[0].nullable = descriptor.details[0].nullable || value === null
        descriptor.details[0].isReference = descriptor.details[0].isReference || isReference
        ++descriptor.length
        return descriptor
      }
      descriptor.details = [...descriptor.details, describeObjectDetail(value, key, descriptor.length++)]
      return descriptor
    },
    {
      details: [],
      length: 0,
      keys: [],
      references: [],
      isArray: false,
      complete: false
    }
  )
  descriptor.keys = descriptorKeys(descriptor)
  descriptor.references = descriptorReferences(descriptor)
  descriptor.isArray = descriptorIsArray(descriptor)
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
export const compareDescriptor = (descriptor1, descriptor2) => {
  if (descriptor1.isArray !== descriptor2.isArray) {
    return false
  }
  if (descriptor1.isArray && descriptor1.length !== descriptor2.length) {
    return false
  }
  return descriptor1.keys.every(key => descriptor2.keys.includes(key))
    ? descriptor1.details.every(detail => detail.type.some(type => descriptor2.details.find(foundDetail => foundDetail.key === detail.key).type.includes(type)))
    : false
}

/**
 * Trace out the entire object including nested objects.
 * @function
 * @param {Object|Array} object
 * @param {number} [mapLimit=1000]
 * @param {number} [depthLimit=-1]
 * @returns {module:descriptorSamples~descriptorMap}
 */
export const describeObjectMap = (object, { mapLimit = 1000, depthLimit = -1 } = {}) => {
  const descriptorMap = []
  const doDescribe = descriptor => {
    descriptor.references = descriptor.references.map(referenceId => {
      let index = descriptorMap.length
      const referenceDetail = descriptor.details[referenceId]
      referenceDetail.value = referenceDetail.value.reduce((values, val) => {
        if (typeof val !== 'object') {
          return [...values, val]
        }
        const tempDescriptor = describeObject(val)
        if (descriptorMap[index]) {
          descriptorMap[index] = assignDescriptor(descriptorMap[index], tempDescriptor)
          return [...values, val]
        }
        const existingDescriptorIndex = descriptorMap.findIndex(map => compareDescriptor(tempDescriptor, map))
        if (existingDescriptorIndex >= 0) {
          index = existingDescriptorIndex
          if (descriptorMap[existingDescriptorIndex].isArray) {
            referenceDetail.arrayReference = existingDescriptorIndex
          } else {
            referenceDetail.objectReference = existingDescriptorIndex
          }
          referenceDetail.circular = true
          return [...values, val]
        }
        descriptorMap[index] = tempDescriptor
        return [...values, val]
      }, [])
      if (descriptorMap[index].isArray) {
        referenceDetail.arrayReference = index
      } else {
        referenceDetail.objectReference = index
      }
      return referenceId
    })
    descriptor.references = descriptor.references.map(referenceId => {
      if (!descriptor.details[referenceId].circular) {
        if (descriptor.details[referenceId].arrayReference !== null) {
          doDescribe(descriptorMap[descriptor.details[referenceId].arrayReference])
        }
        if (descriptor.details[referenceId].objectReference !== null) {
          doDescribe(descriptorMap[descriptor.details[referenceId].objectReference])
        }
      }
      return referenceId
    })
    return descriptorMap
  }
  return doDescribe(describeObject([object]))
}

/**
 * Clone objects for manipulation without data corruption, returns a copy of the provided object.
 * @function
 * @param {Object} object - The original object that is being cloned
 * @returns {Object}
 */
export const cloneObject = object => JSON.parse(JSON.stringify(object))

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
 * @function
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
 * @function
 * @param {...Object} args - Provide a list of objects which will be merged starting from the end up into the first
 * object
 * @returns {Object}
 */
export const mergeObjectsMutable = (...args) => args.length === 2
  ? mergeObjectsBase(true, mergeObjectsMutable, args[0], args[1])
  : args.length === 1
    ? args[0]
    : args.reduce(curry(mergeObjectsBase)(true, mergeObjectsMutable), {})
