/**
 * Utility functions used by mergeObjects.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module mergeHelpers
 */

import { compareArrays, mergeArrays } from '../arrays'
import { pipe } from '../functions'
import { mapObject, objectKeys, setValue } from '../objects'
import { createReferenceIdentifier, findObjectReferences, findReference, findReferenceIndex, findReferenceKeys, linkReferences, objectAndReferences, removeFromReferenceMap } from './cloneHelpers'

/**
 * Check if there are still references having a merged status of false.
 * @param {*} referenceMap
 * @returns {boolean}
 */
const hasUnmergedReferences = referenceMap => referenceMap.some(newRef => newRef.merged === false)

/**
 * Take two reference identifiers and merge the non references together, identify overwritten references.
 * @param {module:cloneHelpers~referenceMap} firstMap
 * @param {number} firstIndex
 * @param {module:cloneHelpers~referenceMap} secondMap
 * @param {number} secondIndex
 * @param {Array.<module:cloneHelpers~referenceIdentifier>} remove
 * @returns {module:cloneHelpers~referenceMap}
 */
export const mergeNonReferences = (firstMap, firstIndex, secondMap, secondIndex, remove = []) => {
  const firstRefIndex = findReferenceIndex(firstMap, firstIndex)
  const secondRefIndex = findReferenceIndex(secondMap, secondIndex)
  if (firstRefIndex < 0) {
    secondMap[secondRefIndex].complete = true
    secondMap[secondRefIndex].merged = true
    return mapObject(secondMap[secondRefIndex].object, value => value)
  }
  if (secondRefIndex < 0) {
    firstMap[firstRefIndex].complete = true
    firstMap[firstRefIndex].merged = true
    return firstMap[firstRefIndex].object
  }
  if (firstMap[firstRefIndex].merged && secondMap[secondRefIndex].merged) {
    return firstMap[firstRefIndex].object
  }
  firstMap[firstRefIndex].complete = true
  firstMap[firstRefIndex].merged = true
  secondMap[secondRefIndex].complete = true
  secondMap[secondRefIndex].merged = true
  if (Array.isArray(firstMap[firstRefIndex].object) && Array.isArray(secondMap[secondRefIndex].object)) {
    return mergeArrays(firstMap[firstRefIndex].object, secondMap[secondRefIndex].object)
  }
  const keys = compareArrays(
    objectKeys(firstMap[firstRefIndex].object),
    objectKeys(secondMap[secondRefIndex].object)
  )
  firstMap[firstRefIndex].object = keys.reduce((newObject, compareResult) => {
    const refIndexFirst = firstMap[firstRefIndex].references.findIndex(refKey => refKey === compareResult.value)
    if (compareResult.result[0] === 1) {
      if (refIndexFirst >= 0) {
        const refUnchanged = findReferenceIndex(firstMap, firstMap[firstRefIndex].object[compareResult.value])
        if (firstMap[refUnchanged].merged === false) {
          firstMap[refUnchanged].complete = true
          firstMap[refUnchanged].merged = true
        }
      }
      return setValue(compareResult.value, firstMap[firstRefIndex].object[compareResult.value], newObject)
    }
    const refIndexSecond = secondMap[secondRefIndex].references.findIndex(refKey => refKey === compareResult.value)
    let newValue = secondMap[secondRefIndex].object[compareResult.value]
    if (refIndexSecond >= 0 && refIndexFirst < 0) {
      const nextSecondRef = findReference(secondMap, secondMap[secondRefIndex].object[compareResult.value])
      newValue = firstMap[firstMap.length - 1].index + 1
      const nextFirstRef = createReferenceIdentifier(nextSecondRef.original, newValue, [firstIndex])
      nextFirstRef.complete = false
      nextFirstRef.merged = false
      nextFirstRef.object = Array.isArray(nextSecondRef.original) ? [] : {}
      firstMap.push(nextFirstRef)
      firstMap[firstRefIndex].references.push(compareResult.value)
      firstMap[firstRefIndex].object[compareResult.value] = newValue
    }
    if (compareResult.result[0] === -1) {
      return setValue(compareResult.value, newValue, newObject)
    }
    if (refIndexFirst < 0) {
      return refIndexSecond < 0
        ? setValue(compareResult.value, secondMap[secondRefIndex].object[compareResult.value], newObject)
        : setValue(compareResult.value, firstMap[firstRefIndex].object[compareResult.value], newObject)
    }
    if (refIndexSecond >= 0) {
      return setValue(compareResult.value, firstMap[firstRefIndex].object[compareResult.value], newObject)
    }
    const removedRef = findReference(firstMap, firstMap[firstRefIndex].object[compareResult.value])
    const refererIndex = removedRef.referers.findIndex(referer => referer === firstIndex)
    if (refererIndex >= 0) {
      removedRef.referers.splice(refererIndex, 1)
    }
    remove.push(removedRef)
    firstMap[firstRefIndex].references.splice(refIndexFirst, 1)
    return setValue(compareResult.value, secondMap[secondRefIndex].object[compareResult.value], newObject)
  }, {})
  return firstMap[firstRefIndex].object
}

/**
 * Remove duplicate references from and array of references
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
 * Used as callback for reduce-like for-loop, this function will find each reference identifier
 * in object1 and merge object2 similar reference onto object1. object1 will then be returned.
 * @typedef {Function} mergeReferencesReduce
 * @param {module:cloneHelpers~objectReferencesRemove} object1
 * @param {number|string} key
 * @param {number} i
 * @returns {module:cloneHelpers~objectReferencesRemove}
 */

/**
 * Return the mergeReferencesReduce callback.
 * @function
 * @param {module:cloneHelpers~referenceMap} firstMap
 * @param {module:cloneHelpers~referenceMap} secondMap
 * @param {module:cloneHelpers~objectReferencesRemove} object2
 * @returns {module:mergeHelpers~mergeReferencesReduce}
 */
export const mergeReferenceObject = (firstMap, secondMap, object2) => (object1, key, i) => {
  let isCircular = false
  let keyArray = key
  if (Array.isArray(key)) {
    keyArray = Array.isArray(key[0]) ? key[0] : key
    if (keyArray[1] === null) {
      key = keyArray[0]
      isCircular = true
    }
  }
  if (Array.isArray(key)) {
    let nextFirstObject = object1.object[keyArray[0]]
    let nextSecondObject = object2.object[keyArray[0]]
    if (typeof nextFirstObject === 'number') {
      object1.index = nextFirstObject
      nextFirstObject = findReference(firstMap, nextFirstObject).object
    }
    if (typeof nextSecondObject === 'number') {
      object2.index = nextSecondObject
      nextSecondObject = findReference(secondMap, nextSecondObject).object
    }
    const references = keyArray[1].map(ref => ref)
    const firstRefs = keyArray[1]
    const secondRefs = keyArray[1].map(ref => ref)
    const newObj1 = objectAndReferences(nextFirstObject, firstRefs, object1.index)
    const newObj2 = objectAndReferences(nextSecondObject, secondRefs, object2.index)
    for (const j in references) {
      const nextKey = references[j]
      const position = keyArray[1].findIndex(ref => ref === nextKey)
      mergeReferenceObject(firstMap, secondMap, newObj2)(newObj1, nextKey, position)
      key[1] = newObj1.references
    }
    object1.remove = [...object1.remove, ...newObj1.remove]
    return object1
  }
  const nextFirstIndex = object1.object[key]
  const nextSecondIndex = object2.object[key]
  if (typeof nextSecondIndex !== 'number') {
    if (typeof nextFirstIndex === 'number') {
      const nextFirstRefIndex = findReferenceIndex(firstMap, nextFirstIndex)
      firstMap[nextFirstRefIndex].complete = true
      firstMap[nextFirstRefIndex].merged = true
    }
    return object1
  }
  const nextSecondRef = findReference(secondMap, nextSecondIndex)
  if (typeof nextSecondRef.merged === 'undefined') {
    return object1
  }
  const nextFirstRef = findReference(firstMap, nextFirstIndex)
  nextSecondRef.complete = true
  nextSecondRef.merged = true
  if (typeof nextFirstRef.merged === 'undefined') {
    return object1
  }
  object1.object[key] = mergeNonReferences(firstMap, nextFirstRef.index, secondMap, nextSecondRef.index, object1.remove)
  const removeFirstReferer = nextFirstRef.referers.findIndex(i => i === object1.index)
  nextFirstRef.referers.splice(removeFirstReferer, 1)
  const nextFirstReferences = nextFirstRef.references.map(ref => nextFirstRef.circular.includes(ref) ? [ref, null] : ref)
  object1.remove.push(nextFirstRef)
  const firstTrueIndex = findReferenceIndex(firstMap, nextFirstIndex)
  firstMap[firstTrueIndex] = nextFirstRef
  if (nextFirstReferences.length && !isCircular) {
    object1.references[i] = [key, nextFirstReferences]
    object1.references = object1.references.reduce(mergeReferenceArrays, [])
    return object1
  }
  object1.references.splice(i, 1)
  return object1
}

/**
 * Find each of the unlinked references and assign the newly cloned reference for each.
 * @function
 * @param {module:cloneHelpers~referenceMap} firstMap
 * @param {module:cloneHelpers~referenceMap} secondMap
 * @returns {module:cloneHelpers~referenceMap}
 */
export const mergeReferences = (firstMap, secondMap) => {
  if (typeof firstMap[0].merged === 'undefined' || typeof secondMap[0].merged === 'undefined') {
    return firstMap
  }
  let remove = []
  firstMap[0].object = mergeNonReferences(firstMap, 0, secondMap, 0, remove)
  let objRefs = mergeArrays(firstMap[0].references, secondMap[0].references)
  objRefs = objRefs.reduce(mergeReferenceArrays, [])
  const object1 = objectAndReferences(firstMap[0].object, objRefs, 0)
  const object2 = objectAndReferences(secondMap[0].object, secondMap[0].references, 0)
  const references = objRefs.map(ref => ref)
  for (const i in references) {
    const key = references[i]
    const position = firstMap[0].references.findIndex(ref => ref === key)
    mergeReferenceObject(firstMap, secondMap, object2)(object1, key, position)
    firstMap[0].references = object1.references
  }
  remove = [...remove, ...object1.remove]
  const removeFunc = removeFromReferenceMap(firstMap)
  const removeStatus = remove.reduce((status, ref) => {
    const result = removeFunc(ref)
    return status ? result : status
  }, true)
  if (removeStatus) {
    firstMap = linkReferences(firstMap)
  }
  if (removeStatus) {
    if (firstMap.length === 1) {
      secondMap.map(ref => {
        ref.complete = true
        ref.merged = true
        return ref
      })
    }
    secondMap = linkReferences(secondMap)
  }
  return hasUnmergedReferences(firstMap) && hasUnmergedReferences(secondMap)
    ? mergeReferences(firstMap, secondMap)
    : firstMap
}

/**
 * Bundle all of the functions needed for processing an identifier in the reference map
 * @function
 * @param {module:cloneHelpers~referenceMap} referenceMap
 * @param {Array.<module:cloneHelpers~referenceIdentifier>} moreReferences
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=100]
 * @param {depthLimit} [options.depthLimit=-1]
 * @returns {Array.<module:cloneHelpers~referenceIdentifier>}
 */
export const processMergeIdentifer = (referenceMap, moreReferences, { mapLimit = 100, depthLimit = -1 } = {}) => {
  let currentIndex = 0
  referenceMap = pipe(
    identifier => findReferenceIndex(referenceMap, identifier.index),
    index => {
      currentIndex = index
      return findObjectReferences(referenceMap[currentIndex])
    },
    identifier => {
      return findReferenceKeys(referenceMap, currentIndex)
    },
    identifier => {
      referenceMap[currentIndex].merged = false
      const references = referenceMap[currentIndex].references.filter(refKey => !identifier.circular.includes(refKey))
      moreReferences = [...moreReferences, ...references.map(key => referenceMap[identifier.object[key]])]
      return referenceMap.length >= mapLimit
    }
  )(moreReferences.shift())
  return moreReferences
}

/**
 * Loop over every identifier and process, then return the reference map.
 * @param {Array|Object} object
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=100]
 * @param {depthLimit} [options.depthLimit=-1]
 * @returns {module:cloneHelpers~referenceMap}
 */
export const processMergeIdentifiers = (object, { mapLimit = 100, depthLimit = -1 } = {}) => {
  const referenceMap = [createReferenceIdentifier(object, 0)]
  let moreReferences = [referenceMap[0]]
  do {
    moreReferences = processMergeIdentifer(referenceMap, moreReferences, { mapLimit, depthLimit })
  } while (moreReferences.length > 0)
  return referenceMap
}
