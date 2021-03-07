/**
 * Utility functions used by mergeObjects.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module mergeHelpers
 */

import { compareArrays, mergeArrays } from '../arrays'
import { pipe } from '../functions'
import { emptyObject, objectKeys, setValue } from '../objects'
import { createReferenceIdentifier, findObjectReferences, findReferenceIndex, getIdentifierDepth, linkReferences, nonReference } from './cloneHelpers'

/**
 * Store information about a reference, including pointing to linked references and storing original reference.
 * @typedef {Object.<string, number|Object|Array>} mergeReferenceIdentifier
 * @property {Array.<string|number>} circular
 * @property {boolean} complete
 * @property {number} index
 * @property {Array|Object} clone
 * @property {Array|Object} object
 * @property {Array|Object} original
 * @property {Array.<string|number>} references
 * @property {Array.<number>} referers
 * @property {Array.<module:cloneHelpers~referenceIdentifier>} identifiers
 */

/**
 * Create a mergeReferenceIdentifier for building the object clone.
 * @function
 * @param {Array.<Array|Object>} [objects=[]]
 * @param {number} [index=0]
 * @param {Array.<number>} [referers=[]]
 * @returns {module:mergeHelpers~mergeReferenceIdentifier}
 */
export const createMergeReferenceIdentifier = (objects = [], index = 0, referers = []) => {
  const identifiers = objects.map(identifier => createReferenceIdentifier(identifier, index, referers))
  const newIdentifier = createReferenceIdentifier(objects[0], index, referers)
  newIdentifier.object = Array.isArray(newIdentifier.original) ? [] : {}
  newIdentifier.identifiers = identifiers
  return newIdentifier
}

/**
 * Remove duplicate references from an array of references
 * @param {Array.<string|number|Array>} newRefs
 * @param {string|number|Array} ref
 * @returns {Array.<string|number|Array>}
 */
export const mergeReferenceArrays = (newRefs, ref) => {
  if (!Array.isArray(ref)) {
    const existingRefKey = newRefs.findIndex(r => Array.isArray(r) ? r[0] === ref : r === ref)
    if (existingRefKey < 0) {
      newRefs.push(ref)
    }
    return newRefs
  }
  const existingRefKey = newRefs.findIndex(r => Array.isArray(r) ? r[0] === ref[0] : r === ref[0])
  if (Array.isArray(ref[1])) {
    ref[1] = ref[1].reduce(mergeReferenceArrays, [])
  }
  if (existingRefKey < 0) {
    return [...newRefs, ref]
  }
  if (!Array.isArray(newRefs[existingRefKey])) {
    return setValue(existingRefKey, ref, newRefs)
  }
  if (newRefs[existingRefKey].length === 1) {
    return setValue(existingRefKey, ref, newRefs)
  }
  let newPart = newRefs[existingRefKey][1]
  if (!Array.isArray(newPart)) {
    return setValue(existingRefKey, [ref[0], newPart], newRefs)
  }
  if (Array.isArray(ref[1])) {
    newPart = mergeArrays(newPart, ref[1])
  }
  if (!Array.isArray(ref[1]) && Array.isArray(newPart)) {
    newPart.push(ref[1])
  }
  return setValue(existingRefKey, [ref[0], newPart.reduce(mergeReferenceArrays, [])], newRefs)
}

/**
 * An array of reference identifiers linked together.
 * @typedef {Array.<module:mergeHelpers~mergeReferenceIdentifier>} mergeReferenceMap
 */

/**
 * For all of the identified references, find the index of the corresponding referenceIdentifier
 * or create a new one and set the index instead of null.
 * @function
 * @param {module:mergeHelpers~mergeReferenceMap} [referenceMap=[]]
 * @param {number} [index=0]
 * @param {boolean} [maxDepth=false]
 * @returns {module:mergeHelpers~mergeReferenceIdentifier}
 */
export const findMergeReferenceKeys = (referenceMap = [], index = 0, maxDepth = false) => referenceMap[index].references.reduce(
  (newRef, key, i) => {
    const objectsToRef = newRef.identifiers.reduce((objects, identifier) => {
      const obj = identifier.original[key]
      if (typeof obj === 'undefined' || nonReference(obj)) {
        return objects
      }
      return [...objects, obj]
    }, [])
    const existingIndex = referenceMap.findIndex(existing => existing && existing.identifiers.some(identifier => objectsToRef.includes(identifier.original)))
    if (existingIndex >= 0) {
      newRef.object[key] = existingIndex
      newRef.circular.push(key)
      referenceMap[existingIndex].referers.push(index)
      return newRef
    }
    if (maxDepth) {
      newRef.object[key] = Array.isArray(objectsToRef[0]) ? [] : {}
      return newRef
    }
    const newRefIndex = referenceMap[referenceMap.length - 1].index + 1
    newRef.object[key] = newRefIndex
    referenceMap[newRefIndex] = createMergeReferenceIdentifier(objectsToRef, newRefIndex, [index])
    return newRef
  },
  referenceMap[index]
)

/**
 * Use the mergeReferenceIdentifiers identifiers list to zip objects together
 * @function
 * @param {module:mergeHelpers~mergeReferenceIdentifier} referenceIdentifier
 * @returns {module:mergeHelpers~mergeReferenceIdentifier}
 */
export const zipper = referenceIdentifier => {
  referenceIdentifier.identifiers = referenceIdentifier.identifiers.map(identifier => findObjectReferences(identifier))
  let objRefs = mergeArrays(...referenceIdentifier.identifiers.map(identifier => identifier.references))
  objRefs = objRefs.reduce(mergeReferenceArrays, [])
  const useArray = Array.isArray(referenceIdentifier.object)
  const keys = useArray
    ? compareArrays(...referenceIdentifier.identifiers.map(identifier => identifier.object))
    : compareArrays(...referenceIdentifier.identifiers.map(identifier => objectKeys(identifier.object)))
  return keys.reduce((newIdentifier, compare) => {
    let newKey = compare.value
    let newValue = null
    let storedValue = null
    for (let i = compare.result.length - 1; i >= 0; --i) {
      if (compare.result[i] < 0) {
        continue
      }
      if (useArray) {
        newKey = compare.keys[i][0]
      }
      newValue = referenceIdentifier.identifiers[i].object[newKey]
      if (storedValue === null && emptyObject(newValue)) {
        storedValue = newValue
        continue
      }
      break
    }
    if (storedValue !== null && newValue !== null) {
      newValue = storedValue
    }
    if (newValue !== null) {
      const refIndex = objRefs.findIndex(ref => {
        if (Array.isArray(ref)) {
          if (Array.isArray(ref[0])) {
            return ref[0][0] === newKey
          }
          return ref[0] === newKey
        }
        return ref === newKey
      })
      if (refIndex >= 0) {
        objRefs.splice(refIndex, 1)
      }
    }
    newIdentifier.references = objRefs
    if (useArray) {
      newIdentifier.object.push(newValue)
      return newIdentifier
    }
    newIdentifier.object[newKey] = newValue
    return newIdentifier
  }, referenceIdentifier)
}

/**
 * Bundle all of the functions needed for processing an identifier in the reference map
 * @function
 * @param {module:mergeHelpers~mergeReferenceMap} referenceMap
 * @param {Array.<module:mergeHelpers~mergeReferenceIdentifier>} moreReferences
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=100]
 * @param {depthLimit} [options.depthLimit=-1]
 * @returns {Array.<{module:mergeHelpers~mergeReferenceIdentifier}>}
 */
export const processMergeIdentifier = (referenceMap, moreReferences, { mapLimit = 100, depthLimit = -1 } = {}) => {
  let currentIndex = 0
  let isMaxDepth = false
  referenceMap = pipe(
    identifier => findReferenceIndex(referenceMap, identifier.index),
    index => {
      currentIndex = index
      return zipper(referenceMap[currentIndex])
    },
    identifier => getIdentifierDepth(referenceMap, identifier),
    currentDepth => currentDepth === depthLimit,
    maxDepth => {
      isMaxDepth = maxDepth
      return findMergeReferenceKeys(referenceMap, currentIndex, isMaxDepth)
    },
    identifier => {
      if (isMaxDepth) {
        referenceMap[currentIndex].references = identifier.circular
      }
      referenceMap[currentIndex].complete = true
      const references = referenceMap[currentIndex].references.filter(refKey => !identifier.circular.includes(refKey))
      moreReferences = [...moreReferences, ...references.map(key => referenceMap[identifier.object[key]])]
      return referenceMap.length >= mapLimit
    },
    maxLimit => maxLimit ? linkReferences(referenceMap) : referenceMap
  )(moreReferences.shift())
  return moreReferences
}

/**
 * Loop over every identifier and process, then return the reference map.
 * @param {Array|Object} object
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=100]
 * @param {depthLimit} [options.depthLimit=-1]
 * @returns {module:mergeHelpers~mergeReferenceMap}
 */
export const processMergeIdentifiers = (objects, { mapLimit = 100, depthLimit = -1 } = {}) => {
  const referenceMap = [createMergeReferenceIdentifier(objects, 0)]
  let moreReferences = [referenceMap[0]]
  do {
    moreReferences = processMergeIdentifier(referenceMap, moreReferences, { mapLimit, depthLimit })
  } while (moreReferences.length > 0)
  return referenceMap
}
