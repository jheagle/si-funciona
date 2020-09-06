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
    type: [type],
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
  copyMap.index = originalMap.index || 0
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
        arrayReference: [existingDetail.arrayReference, newDetail.arrayReference].find(ref => typeof ref === 'number'),
        objectReference: [existingDetail.objectReference, newDetail.objectReference].find(ref => typeof ref === 'number')
      })
      assignedDescriptor.details[existingDetail.index].arrayReference = (typeof assignedDescriptor.details[existingDetail.index].arrayReference === 'undefined')
        ? null
        : assignedDescriptor.details[existingDetail.index].arrayReference
      assignedDescriptor.details[existingDetail.index].objectReference = (typeof assignedDescriptor.details[existingDetail.index].objectReference === 'undefined')
        ? null
        : assignedDescriptor.details[existingDetail.index].objectReference
      return assignedDescriptor
    }
    const useDetail = diff[0] > 0 ? existingDetail : newDetail
    if (!useDetail) {
      assignedDescriptor.details[existingDetail.index].optional = true
      return assignedDescriptor
    }
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
  assignedDescriptor.complete = !assignedDescriptor.references.length || assignedDescriptor.complete || descriptor.complete
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
      index: 0,
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
  descriptor.isArray = Array.isArray(object) && descriptorIsArray(descriptor)
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
  const smallerDescriptor = descriptor1.length <= descriptor2.length ? descriptor1 : descriptor2
  const largerDescriptor = descriptor2.length >= descriptor1.length ? descriptor2 : descriptor1
  return smallerDescriptor.keys.every(key => largerDescriptor.keys.includes(key))
    ? smallerDescriptor.details.every(detail => detail.type.some(type => largerDescriptor.details.find(foundDetail => foundDetail.key === detail.key).type.includes(type)))
    : false
}

export const sameDescriptor = (descriptor1, descriptor2) => descriptor1.details.every((detail, index) => detail.value.some(dVal => descriptor2.details[index].value.includes(dVal)))

const tempDescriptorReference = (descriptor, mapIndex) => ({
  tempDescriptor: descriptor,
  refIndex: mapIndex
})

/**
 * Trace out the entire object including nested objects.
 * @function
 * @param {Object|Array} object
 * @param {number} [mapLimit=1000]
 * @param {number} [depthLimit=-1]
 * @returns {module:descriptorSamples~descriptorMap}
 */
export const describeObjectMap = (object, { mapLimit = 1000, depthLimit = -1 } = {}) => {
  const descriptorMap = [describeObject(object)]
  descriptorMap[0].index = 0
  const describeReferences = (descriptor, limit) => {
    descriptor.references = descriptor.references.map(referenceId => {
      let index = descriptorMap.length
      const val = descriptor.details[referenceId].value[descriptor.details[referenceId].value.length - 1]
      if (typeof val !== 'object' || val === null || typeof val === 'undefined' || descriptor.details[referenceId].circular) {
        return referenceId
      }
      const tempDescriptor = describeObject(val)
      const existingDescriptorIndex = descriptorMap.findIndex(existingDescriptor => compareDescriptor(tempDescriptor, existingDescriptor))
      if (existingDescriptorIndex >= 0) {
        index = existingDescriptorIndex
        if (sameDescriptor(tempDescriptor, descriptorMap[existingDescriptorIndex])) {
          descriptor = descriptorMap[existingDescriptorIndex]
          descriptor.details[referenceId].circular = true
        }
      }
      if (index >= mapLimit) {
        return referenceId
      }
      if (limit === 0) {
        return referenceId
      }
      if (tempDescriptor.isArray) {
        index = descriptor.details[referenceId].arrayReference ?? index
        descriptor.details[referenceId].arrayReference = tempDescriptorReference(tempDescriptor, index)
      } else {
        index = descriptor.details[referenceId].objectReference ?? index
        descriptor.details[referenceId].objectReference = tempDescriptorReference(tempDescriptor, index)
      }
      tempDescriptor.index = index
      if (existingDescriptorIndex < 0) {
        descriptorMap[index] = descriptorMap[index]
          ? assignDescriptor(descriptorMap[index], tempDescriptor)
          : tempDescriptor
      }
      return referenceId
    })
    descriptor.references = descriptor.references.map(referenceId => {
      let tempDescriptor = null
      let refIndex = -1
      if (descriptor.details[referenceId].arrayReference !== null) {
        ; ({ tempDescriptor, refIndex } = descriptor.details[referenceId].arrayReference)
        descriptor.details[referenceId].arrayReference = refIndex
      }
      if (descriptor.details[referenceId].objectReference !== null) {
        ; ({ tempDescriptor, refIndex } = descriptor.details[referenceId].objectReference)
        descriptor.details[referenceId].objectReference = refIndex
      }
      if (tempDescriptor === null) {
        return referenceId
      }
      if (!descriptorMap[refIndex]) {
        return referenceId
      }
      descriptorMap[refIndex] = assignDescriptor(descriptorMap[refIndex], tempDescriptor)
      if (!descriptor.details[referenceId].circular) {
        describeReferences(tempDescriptor, --limit)
      }
      return referenceId
    })
    descriptor.complete = descriptor.references
      .every(
        refId => [
          descriptor.details[refId].arrayReference,
          descriptor.details[refId].objectReference
        ].some(ref => typeof ref === 'number')
      )
    descriptorMap[descriptor.index] = assignDescriptor(descriptorMap[descriptor.index], descriptor)
    return descriptorMap
  }
  return describeReferences(descriptorMap[0], depthLimit)
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
const createReferenceIdentifier = (object = null, index = 0) => Object.assign({}, {
  index: index,
  object: object,
  descriptor: describeObject(object || {}),
  references: [],
  circular: []
})

/**
 * Prepare to map over an object and return the callback that will be used for each reference.
 * @function
 * @param {descriptorMap} descriptorMap
 * @param {Array.<referenceIdentifier>} newReferenceMap
 * @returns {mapOriginal}
 */
export const mapOriginalObject = (descriptorMap = null, newReferenceMap = [], { mapLimit = 1000, depthLimit = -1 } = {}) => {
  /**
   * Map over the provided object and generate an array of cloned references.
   * @function
   * @param {Array|Object} focusObject
   * @param {descriptor} descriptor
   * @returns {Array.<referenceIdentifier>}
   */
  const mapOriginal = (focusObject, descriptor, index = 0, limit = null) => {
    if (limit === null) {
      limit = depthLimit
    }
    if (!newReferenceMap[index]) {
      newReferenceMap[index] = createReferenceIdentifier(focusObject, index)
    }
    if (descriptor.isArray && Array.isArray(focusObject)) {
      const detail = descriptor.details[0]
      newReferenceMap[index].object = focusObject.map((item, id) => {
        if (!detail.isReference) {
          return item
        }
        if (detail.isReference && notEmptyObjectOrArray(item)) {
          newReferenceMap[index].references.push(id)
          return null
        }
        return Array.isArray(item) ? [] : {}
      }, [])
    } else {
      newReferenceMap[index].object = descriptor.details.reduce((newRef, detail) => {
        if (!(detail.key in focusObject)) {
          return newRef
        }
        if (typeof focusObject[detail.key] !== 'object' || focusObject[detail.key] === null) {
          newRef[detail.key] = focusObject[detail.key]
          return newRef
        }
        if (detail.isReference && notEmptyObjectOrArray(focusObject[detail.key])) {
          newReferenceMap[index].references.push(detail.key)
          newRef[detail.key] = null
          return newRef
        }
        newRef[detail.key] = Array.isArray(focusObject[detail.key]) ? [] : {}
        return newRef
      }, {})
    }
    newReferenceMap[index] = newReferenceMap[index].references.reduce((newRef, key) => {
      const detail = descriptor.isArray
        ? descriptor.details[0]
        : descriptor.details.find(detail => detail.key === key)
      const newRefIndex = newReferenceMap.length
      const objectToRef = focusObject[key]
      if (detail.circular) {
        const tempDescriptor = describeObject(objectToRef)
        const existingIndex = newReferenceMap.findIndex(existing => sameDescriptor(tempDescriptor, existing.descriptor))
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
      newReferenceMap[newRefIndex] = createReferenceIdentifier(focusObject[key], newRefIndex)
      newRef.object[key] = newRefIndex
      return newRef
    }, newReferenceMap[index])

    return newReferenceMap[index].references.reduce((newRef, key) => {
      if (typeof newRef.object[key] !== 'number') {
        return newRef
      }
      const detail = descriptor.isArray
        ? descriptor.details[0]
        : descriptor.details.find(detail => detail.key === key)
      if (detail.circular) {
        return newRef
      }
      const objectToRef = focusObject[key]
      const descriptorRefIndex = (Array.isArray(objectToRef) && detail.arrayReference)
        ? detail.arrayReference
        : detail.objectReference
      newReferenceMap[newRef.object[key]] = mapOriginal(objectToRef, descriptorMap[descriptorRefIndex], newRef.object[key], --limit)
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
export const assignNewReferences = (newReferenceMap = []) => {
  /**
   * Take a reference identifier and return a new reference.
   * @function
   * @param {referenceIdentifier} reference
   * @returns {Array|Object}
   */
  const assignReferences = reference => reference.references.reduce((newRef, key) => {
    newRef[key] = reference.circular.includes(key)
      ? newReferenceMap[newRef[key]].object
      : assignReferences(newReferenceMap[newRef[key]])
    return newRef
  }, reference.object)
  return assignReferences
}

/**
 * Clone objects for manipulation without data corruption, returns a copy of the provided object.
 * @function
 * @param {Object} object - The original object that is being cloned
 * @param {module:descriptorSamples~descriptorMap} descriptorMap - The map of the object
 * @returns {Object}
 */
export const cloneObject = (object, descriptorMap = []) => {
  if (!descriptorMap.length) {
    descriptorMap = describeObjectMap(object)
  }
  const newReferenceMap = []
  newReferenceMap[0] = mapOriginalObject(descriptorMap, newReferenceMap)(object, descriptorMap[0])
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
