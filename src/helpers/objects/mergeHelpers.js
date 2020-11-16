/**
 * Utility functions used by mergeObjects.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module mergeHelpers
 */

import { mergeArrays } from '../arrays'
import { pipe } from '../functions'
import { mapObject, objectKeys, setValue } from '../objects'
import { createReferenceIdentifier, findObjectReferences, findReference, findReferenceIndex, findReferenceKeys, linkReferences, objectAndReferences, removeFromReferenceMap } from './cloneHelpers'

export const hasUnmergedReferences = referenceMap => referenceMap.some(newRef => newRef.merged === false)

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
  const keys = mergeArrays(
    objectKeys(firstMap[firstRefIndex].object),
    objectKeys(secondMap[secondRefIndex].object)
  )
  firstMap[firstRefIndex].object = keys.reduce((newObject, key) => {
    if (secondMap[secondRefIndex].references.includes(key)) {
      let nextFirstIndex = firstMap[firstRefIndex].object[key]
      if (typeof nextFirstIndex !== 'number') {
        const mapIndex = findReferenceIndex(secondMap, secondMap[secondRefIndex].object[key])
        if (secondMap[mapIndex].merged === false) {
          secondMap[mapIndex].complete = true
          secondMap[mapIndex].merged = true
        }
        nextFirstIndex = firstMap[firstMap.length - 1].index + 1
        const nextSecondRef = findReference(secondMap, secondMap[secondRefIndex].object[key])
        const nextFirstRef = createReferenceIdentifier(nextSecondRef.original, nextFirstIndex, [firstRefIndex])
        nextFirstRef.circular = nextSecondRef.circular
        nextFirstRef.complete = nextSecondRef.complete
        nextFirstRef.merged = nextSecondRef.merged
        nextFirstRef.object = mapObject(nextSecondRef.object, value => value)
        nextFirstRef.references = nextSecondRef.references.map(value => value)
        firstMap.push(nextFirstRef)
        firstMap[firstRefIndex].references.push(key)
        return setValue(key, nextFirstIndex, newObject)
      }
      return setValue(key, nextFirstIndex, newObject)
    }
    const refIndex = firstMap[firstRefIndex].references.findIndex(refKey => refKey === key)
    if (refIndex >= 0) {
      const refUnchanged = findReferenceIndex(firstMap, firstMap[firstRefIndex].object[key])
      if (firstMap[refUnchanged].merged === false) {
        firstMap[refUnchanged].complete = true
        firstMap[refUnchanged].merged = true
      }
    }
    if (typeof secondMap[secondRefIndex].object[key] === 'undefined') {
      return setValue(key, firstMap[firstRefIndex].object[key], newObject)
    }
    if (refIndex >= 0) {
      const removedRef = findReference(firstMap, newObject[key])
      const refererIndex = removedRef.referers.findIndex(referer => referer === firstIndex)
      if (refererIndex >= 0) {
        removedRef.referers.splice(refererIndex, 1)
      }
      remove.push(removedRef)
      firstMap[firstRefIndex].references.splice(refIndex, 1)
    }
    return setValue(key, secondMap[secondRefIndex].object[key], newObject)
  }, {})
  return firstMap[firstRefIndex].object
}

export const mergeReferenceArrays = (newRefs, ref) => {
  if (!Array.isArray(ref)) {
    const existingRefKey = newRefs.findIndex(r => {
      if (Array.isArray(r)) {
        return r[0] === ref
      }
      return false
    })
    if (existingRefKey < 0) {
      newRefs.push(ref)
    }
    return newRefs
  }
  const existingRefKey = newRefs.findIndex(r => {
    if (Array.isArray(r)) {
      return r[0] === ref[0]
    }
    return r === ref[0]
  })
  if (Array.isArray(ref[1])) {
    ref[1] = ref[1].reduce(mergeReferenceArrays, [])
  }
  if (existingRefKey < 0) {
    newRefs.push(ref)
    return newRefs
  }
  if (!Array.isArray(newRefs[existingRefKey])) {
    newRefs[existingRefKey] = ref
    return newRefs
  }
  let newPart = newRefs[existingRefKey][1]
  if (!Array.isArray(newPart)) {
    newRefs[existingRefKey] = [ref[0], newPart]
    return newRefs
  }
  if (Array.isArray(ref[1])) {
    newPart = mergeArrays(newPart, ref[1])
  }
  if (!Array.isArray(ref[1]) && Array.isArray(newPart)) {
    newPart.push(ref[1])
  }
  newPart = newPart.reduce(mergeReferenceArrays, [])
  newRefs[existingRefKey] = [ref[0], newPart]
  return newRefs
}

export const mergeReferenceObject = (firstMap, secondMap) => (object1, object2, key, i) => {
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
    let newObj1 = objectAndReferences(nextFirstObject, firstRefs, object1.index)
    const newObj2 = objectAndReferences(nextSecondObject, secondRefs, object2.index)
    for (const j in references) {
      const nextKey = references[j]
      const position = keyArray[1].findIndex(ref => ref === nextKey)
      newObj1 = mergeReferenceObject(firstMap, secondMap)(newObj1, newObj2, nextKey, position)
      key[1] = newObj1.references
    }
    object1.remove = [...object1.remove, ...newObj1.remove]
    return object1
  }
  let nextFirstIndex = object1.object[key]
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
  let nextFirstRef = findReference(firstMap, nextFirstIndex)
  nextSecondRef.complete = true
  nextSecondRef.merged = true
  if (typeof nextFirstIndex !== 'number') {
    nextFirstIndex = firstMap[firstMap.length - 1].index + 1
    nextFirstRef = createReferenceIdentifier(nextSecondRef.original, nextFirstIndex, [object1.index])
    nextFirstRef.circular = nextSecondRef.circular
    nextFirstRef.complete = nextSecondRef.complete
    nextFirstRef.merged = nextSecondRef.merged
    nextFirstRef.object = mapObject(nextSecondRef.object, value => value)
    nextFirstRef.references = nextSecondRef.references.map(value => value)
    firstMap.push(nextFirstRef)
  }
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
  let object1 = objectAndReferences(firstMap[0].object, objRefs, 0)
  const object2 = objectAndReferences(secondMap[0].object, secondMap[0].references, 0)
  const references = objRefs.map(ref => ref)
  for (const i in references) {
    const key = references[i]
    const position = firstMap[0].references.findIndex(ref => ref === key)
    object1 = mergeReferenceObject(firstMap, secondMap)(object1, object2, key, position)
    firstMap[0].object = object1.object
    firstMap[0].references = object1.references
    secondMap[0].object = object2.object
    secondMap[0].references = object2.references
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
