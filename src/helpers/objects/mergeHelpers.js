/**
 * Utility functions used by mergeObjects.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module mergeHelpers
 */

import { compareArrays, mergeArrays, uniqueArray } from '../arrays'
import { pipe } from '../functions'
import { emptyObject, isObject, mapObject, objectKeys, setValue } from '../objects'
import { createReferenceIdentifier, findObjectReferences, findReference, findReferenceIndex, findReferenceKeys, getIdentifierDepth, linkReferences, objectAndReferences, removeFromReferenceMap } from './cloneHelpers'

/**
 * Check if there are still references having a merged status of false.
 * @param {*} referenceMap
 * @returns {boolean}
 */
const hasUnmergedReferences = referenceMap => referenceMap.some(newRef => newRef.merged === false)

export const getSimilarObject = (referenceMap, origin) => {
  if (origin.index === 0) {
    return referenceMap[0]
  }
  const useArray = Array.isArray(origin.original)
  const originKeys = objectKeys(origin.object).filter(key => !origin.references.includes(key) && !isObject(origin.object[key]))
  const originValues = originKeys.map(key => origin.object[key])
  return referenceMap.find(
    existing => {
      if (Array.isArray(existing.original) !== useArray) {
        return false
      }
      if (existing.original === origin.original) {
        return true
      }
      const existingKeys = objectKeys(existing.object).filter(key => !existing.references.includes(key) && !isObject(existing.object[key]))
      if (!originKeys.length && !existingKeys.length) {
        return existing.index === origin.index
      }
      const existingValues = existingKeys.map(key => existing.object[key])
      const compareResults = compareArrays(existingValues, originValues)
      return compareResults.every(compare => compare.result.every(result => result === 0))
    }
  )
}

export const createReferenceReplica = (firstMap, secondMap) => (newIndex, origin, referers = []) => {
  const defaultObject = Array.isArray(origin.original) ? [] : {}
  const nextFirstRef = createReferenceIdentifier(defaultObject, newIndex, referers)
  nextFirstRef.complete = origin.complete
  nextFirstRef.merged = origin.merged
  nextFirstRef.object = defaultObject
  nextFirstRef.circular = origin.circular.map(key => key)
  nextFirstRef.original = origin.original
  const refLocation = firstMap.length
  firstMap.push(nextFirstRef)
  nextFirstRef.object = objectKeys(origin.object).reduce((newObj, key) => {
    if (origin.references.includes(key) && !nextFirstRef.references.includes(key)) {
      nextFirstRef.references.push(key)
    }
    if (!origin.circular.includes(key)) {
      return setValue(key, origin.object[key], newObj)
    }
    const nextOrigin = findReference(secondMap, origin.object[key])
    let matchedReference = getSimilarObject(firstMap, nextOrigin)
    const exists = typeof matchedReference !== 'undefined'
    const nextNewIndex = exists ? matchedReference.index : firstMap[firstMap.length - 1].index + 1
    if (!exists) {
      matchedReference = createReferenceReplica(firstMap, secondMap)(nextNewIndex, nextOrigin)
    }
    if (!matchedReference.referers.includes(newIndex)) {
      matchedReference.referers.push(newIndex)
    }
    return setValue(key, nextNewIndex, newObj)
  }, nextFirstRef.object)
  nextFirstRef.object = nextFirstRef.references.reduce((newObj, key) => {
    if (origin.circular.includes(key)) {
      return newObj
    }
    const nextOrigin = findReference(secondMap, origin.object[key])
    let matchedReference = getSimilarObject(firstMap, nextOrigin)
    const exists = typeof matchedReference !== 'undefined'
    const nextNewIndex = exists ? matchedReference.index : firstMap[firstMap.length - 1].index + 1
    if (!exists) {
      matchedReference = createReferenceReplica(firstMap, secondMap)(nextNewIndex, nextOrigin)
    }
    if (!matchedReference.referers.includes(newIndex)) {
      matchedReference.referers.push(newIndex)
    }
    newObj[key] = nextNewIndex
    if (nextNewIndex <= nextFirstRef.index) {
      nextFirstRef.circular.push(key)
    }
    return newObj
  }, nextFirstRef.object)
  if (origin.referers.length !== nextFirstRef.referers.length) {
    const newReferers = origin.referers.map(index => {
      const nextOrigin = findReference(secondMap, index)
      const testMap = nextFirstRef.referers.map(refererIndex => findReference(firstMap, refererIndex))
      let matchedReference = getSimilarObject(testMap, nextOrigin)
      if (typeof matchedReference !== 'undefined') {
        return matchedReference.index
      }
      matchedReference = getSimilarObject(firstMap, nextOrigin)
      const exists = typeof matchedReference !== 'undefined'
      const nextNewIndex = exists ? matchedReference.index : firstMap[firstMap.length - 1].index + 1
      if (!exists) {
        matchedReference = createReferenceReplica(firstMap, secondMap)(nextNewIndex, nextOrigin)
      }
      return matchedReference.index
    })
    const removeFunc = removeFromReferenceMap(firstMap)
    nextFirstRef.referers.forEach(refererIndex => removeFunc(findReference(firstMap, refererIndex)))
    nextFirstRef.referers = newReferers
  }
  nextFirstRef.referers = uniqueArray(nextFirstRef.referers)
  return firstMap[refLocation]
}

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
  const useArray = Array.isArray(firstMap[firstRefIndex].object)
  const keys = useArray
    ? compareArrays(firstMap[firstRefIndex].object, secondMap[secondRefIndex].object)
    : compareArrays(objectKeys(firstMap[firstRefIndex].object), objectKeys(secondMap[secondRefIndex].object))
  firstMap[firstRefIndex].object = keys.reduce((newObject, compareResult, i) => {
    const refIndexFirst = useArray
      ? firstMap[firstRefIndex].references.findIndex(refKey => compareResult.keys[0].includes(refKey))
      : firstMap[firstRefIndex].references.findIndex(refKey => refKey === compareResult.value)
    const nextKey = useArray ? i : compareResult.value
    let nextFirstValue = useArray
      ? firstMap[firstRefIndex].object[compareResult.keys[0][0]]
      : firstMap[firstRefIndex].object[compareResult.value]
    const nextSecondValue = useArray
      ? secondMap[secondRefIndex].object[compareResult.keys[1][0]]
      : secondMap[secondRefIndex].object[compareResult.value]
    if (compareResult.result[0] === 1) {
      if (refIndexFirst >= 0) {
        const refUnchanged = findReferenceIndex(firstMap, nextFirstValue)
        if (firstMap[refUnchanged].merged === false) {
          firstMap[refUnchanged].complete = true
          firstMap[refUnchanged].merged = true
        }
      }
      return setValue(nextKey, nextFirstValue, newObject)
    }
    const refIndexSecond = useArray
      ? secondMap[secondRefIndex].references.findIndex(refKey => compareResult.keys[1].includes(refKey))
      : secondMap[secondRefIndex].references.findIndex(refKey => refKey === compareResult.value)
    let newValue = nextSecondValue
    if (refIndexSecond >= 0 && refIndexFirst < 0) {
      const nextSecondRef = findReference(secondMap, nextSecondValue)
      let matchedReference = getSimilarObject(firstMap, nextSecondRef)
      const exists = typeof matchedReference !== 'undefined'
      newValue = exists ? matchedReference.index : firstMap[firstMap.length - 1].index + 1
      if (!exists) {
        matchedReference = createReferenceReplica(firstMap, secondMap)(newValue, nextSecondRef, [firstIndex])
      }
      if (!useArray && !firstMap[firstRefIndex].references.includes(nextKey)) {
        firstMap[firstRefIndex].references.push(nextKey)
        firstMap[firstRefIndex].object[nextKey] = newValue
      }
      if (useArray && !firstMap[firstRefIndex].object.includes(newValue)) {
        firstMap[firstRefIndex].references.push(firstMap[firstRefIndex].object.length)
        firstMap[firstRefIndex].object.push(newValue)
      }
      if (exists) {
        return newObject
      }
      nextFirstValue = newValue
      nextSecondRef.complete = true
      nextSecondRef.merged = true
    }
    if (compareResult.result[0] === -1) {
      if (useArray) {
        newObject.push(newValue)
        return newObject
      }
      return setValue(nextKey, newValue, newObject)
    }
    if (refIndexFirst < 0) {
      return refIndexSecond < 0
        ? setValue(nextKey, nextSecondValue, newObject)
        : setValue(nextKey, nextFirstValue, newObject)
    }
    if (refIndexSecond >= 0) {
      return setValue(nextKey, nextFirstValue, newObject)
    }
    if (compareResult.result[0] === 0 && refIndexSecond < 0 && emptyObject(nextSecondValue)) {
      return setValue(nextKey, nextFirstValue, newObject)
    }
    const removedRef = findReference(firstMap, nextFirstValue)
    const refererIndex = removedRef.referers.findIndex(referer => referer === firstIndex)
    if (refererIndex >= 0) {
      removedRef.referers.splice(refererIndex, 1)
    }
    remove.push(removedRef)
    firstMap[firstRefIndex].references.splice(refIndexFirst, 1)
    return setValue(nextKey, nextSecondValue, newObject)
  }, useArray ? [] : {})
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
  if (typeof nextSecondRef === 'undefined') {
    return object1
  }
  if (typeof nextSecondRef.merged === 'undefined') {
    return object1
  }
  let nextFirstRef = typeof nextFirstIndex === 'number' ? findReference(firstMap, nextFirstIndex) : null
  if (typeof nextFirstIndex !== 'number') {
    nextFirstRef = getSimilarObject(firstMap, nextSecondRef)
    const exists = typeof nextFirstRef !== 'undefined'
    nextFirstIndex = exists ? nextFirstRef.index : firstMap[firstMap.length - 1].index + 1
    if (!exists) {
      nextFirstRef = createReferenceReplica(firstMap, secondMap)(nextFirstIndex, nextSecondRef, [object1.index])
    }
    if (!object1.references.includes(key) && object1.object[key] === null) {
      object1.references.push(key)
      object1.object[key] = nextFirstIndex
    }
  }
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
  }
  if (secondMap.every(ref => ref.merged)) {
    secondMap = linkReferences(secondMap)
  }
  if (firstMap.every(ref => ref.merged) && firstMap[0].references.length) {
    return mergeReferences(firstMap, secondMap)
  }
  return (hasUnmergedReferences(firstMap) || hasUnmergedReferences(secondMap))
    ? mergeReferences(firstMap, secondMap)
    : firstMap
}

/**
 * Bundle all of the functions needed for processing an identifier in the reference map
 * @function
 * @param {module:cloneHelpers~referenceMap} firstMap
 * @param {module:cloneHelpers~referenceMap} secondMap
 * @param {Array.<module:cloneHelpers~referenceIdentifier>} moreReferences
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=100]
 * @param {depthLimit} [options.depthLimit=-1]
 * @returns {Array.<module:cloneHelpers~referenceIdentifier>}
 */
export const processMergeIdentifer = (mapDetails) => (focusId, { mapLimit = 100, depthLimit = -1 } = {}) => {
  if (!mapDetails[focusId].moreReferences.length) {
    return mapDetails[focusId].moreReferences
  }
  let currentIndex = 0
  let isMaxDepth = false
  mapDetails[focusId].referenceMap = pipe(
    identifier => findReferenceIndex(mapDetails[focusId].referenceMap, identifier.index),
    index => {
      currentIndex = index
      return findObjectReferences(mapDetails[focusId].referenceMap[currentIndex])
    },
    identifier => getIdentifierDepth(mapDetails[focusId].referenceMap, identifier),
    currentDepth => currentDepth === depthLimit,
    maxDepth => {
      isMaxDepth = maxDepth
      return findReferenceKeys(mapDetails[focusId].referenceMap, currentIndex, isMaxDepth)
    },
    identifier => {
      if (isMaxDepth) {
        mapDetails[focusId].referenceMap[currentIndex].references = identifier.circular
      }
      mapDetails[focusId].referenceMap[currentIndex].merged = false
      const references = mapDetails[focusId].referenceMap[currentIndex].references.filter(refKey => !identifier.circular.includes(refKey))
      mapDetails[focusId].moreReferences = [...mapDetails[focusId].moreReferences, ...references.map(key => mapDetails[focusId].referenceMap[identifier.object[key]])]
      return mapDetails[focusId].referenceMap.length >= mapLimit
    },
    maxLimit => maxLimit ? mergeReferences(mapDetails[0].referenceMap, mapDetails[1].referenceMap) : mapDetails[focusId].referenceMap
  )(mapDetails[focusId].moreReferences.shift())
  return mapDetails[focusId].moreReferences
}

/**
 * Loop over every identifier and process, then return the reference map.
 * @param {Array|Object} object
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=100]
 * @param {depthLimit} [options.depthLimit=-1]
 * @returns {module:cloneHelpers~referenceMap}
 */
export const processMergeIdentifiers = (firstObject, secondObject, { mapLimit = 100, depthLimit = -1 } = {}) => {
  const firstMap = [createReferenceIdentifier(firstObject, 0)]
  const secondMap = [createReferenceIdentifier(secondObject, 0)]
  const mapDetails = [
    {
      referenceMap: firstMap,
      moreReferences: [firstMap[0]]
    },
    {
      referenceMap: secondMap,
      moreReferences: [secondMap[0]]
    }
  ]
  do {
    mapDetails[0].moreReferences = processMergeIdentifer(mapDetails)(0, { mapLimit, depthLimit })
    mapDetails[1].moreReferences = processMergeIdentifer(mapDetails)(1, { mapLimit, depthLimit })
  } while (mapDetails[0].moreReferences.length > 0 || mapDetails[1].moreReferences.length > 0)
  return [firstMap, secondMap]
}
