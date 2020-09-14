/**
 * Create a format to standarize every object into a specific template.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module objectDescriptors
 */

import 'core-js/stable'
import { compareArrays, uniqueArray } from '../arrays'
import { notEmptyObjectOrArray, reduceObject, setValue } from '../objects'

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
const descriptorIsArray = descriptor => descriptor.length
  ? descriptor.details.every(detail => (typeof detail.key === 'number'))
  : descriptor.isArray

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
  descriptor.isArray = Array.isArray(object) || descriptorIsArray(descriptor)
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
  if (descriptor1.length === 0) {
    return descriptor2.length === 0
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
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=1000]
 * @param {number} [options.depthLimit=-1]
 * @param {boolean} [options.keepValues=false]
 * @returns {module:descriptorSamples~descriptorMap}
 */
export const describeObjectMap = (object, { mapLimit = 1000, depthLimit = -1, keepValues = false } = {}) => {
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
        if (tempDescriptor.length && sameDescriptor(tempDescriptor, descriptorMap[existingDescriptorIndex])) {
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
        ;({ tempDescriptor, refIndex } = descriptor.details[referenceId].arrayReference)
        descriptor.details[referenceId].arrayReference = refIndex
      }
      if (descriptor.details[referenceId].objectReference !== null) {
        ;({ tempDescriptor, refIndex } = descriptor.details[referenceId].objectReference)
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
    if (descriptor.complete && !keepValues) {
      descriptorMap[descriptor.index].details = descriptorMap[descriptor.index].details.map(
        detail => setValue(detail, 'value', [])
      )
    }
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
 * @param {descriptorMap} [descriptorMap=null]
 * @param {Array.<referenceIdentifier>} [newReferenceMap=[]]
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=1000]
 * @param {depthLimit} [options.depthLimit=-1]
 * @returns {mapOriginal}
 */
export const mapOriginalObject = (descriptorMap = null, newReferenceMap = [], { mapLimit = 1000, depthLimit = -1 } = {}) => {
  /**
     * Map over the provided object and generate an array of cloned references.
     * @function
     * @param {Array|Object} focusObject
     * @param {descriptor} descriptor
     * @param {number} index
     * @param {number|null} limit
     * @returns {Array.<referenceIdentifier>}
     */
  const mapOriginal = (focusObject, descriptor, index = 0, limit = null) => {
    if (limit === null) {
      limit = depthLimit
    }
    if (!newReferenceMap[index]) {
      newReferenceMap[index] = createReferenceIdentifier(focusObject, index)
    }
    let skip = limit === 0
    if (descriptor.isArray && Array.isArray(focusObject)) {
      const detail = descriptor.details[0]
      newReferenceMap[index].object = focusObject.map((item, id) => {
        if (!detail.isReference) {
          return item
        }
        skip = skip || (index + newReferenceMap[index].references.length + 1) >= mapLimit
        if (detail.isReference && notEmptyObjectOrArray(item) && !skip) {
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
        skip = skip || (index + newReferenceMap[index].references.length + 1) >= mapLimit
        if (detail.isReference && notEmptyObjectOrArray(focusObject[detail.key]) && !skip) {
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
  const assignReferences = reference => reference.references.reduce((newRef, key) => setValue(
    newRef, key, reference.circular.includes(key)
      ? newReferenceMap[newRef[key]].object
      : assignReferences(newReferenceMap[newRef[key]])
  ), reference.object)
  return assignReferences
}
