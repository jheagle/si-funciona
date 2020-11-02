/**
 * Utility functions used by cloneObject.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module cloneHelpers
 */

import { mapObject, isCloneable, setValue } from '../objects'
/**
 * Check if this value represents an object that needs to be used as a reference.
 * @param {*} value
 * @returns {boolean}
 */
const nonReference = value => !isCloneable(value)

/**
 * Store information about a reference, including pointing to linked references and storing original reference.
 * @typedef {Object.<string, number|Object|Array>} referenceIdentifier
 * @property {Array.<string|number>} circular
 * @property {boolean} complete
 * @property {number} index
 * @property {Array|Object} clone
 * @property {Array|Object} object
 * @property {Array|Object} original
 * @property {Array.<string|number>} references
 * @property {Array.<number>} referers
 */

/**
 * Create a referenceIdentifier for building the object clone.
 * @function
 * @param {Array|Object} [object=null]
 * @param {number} [index=0]
 * @param {Array.<number>} [referers=[]]
 * @returns {module:objectHelpers~referenceIdentifier}
 */
export const createReferenceIdentifier = (object = null, index = 0, referers = []) => Object.assign({}, {
  circular: [],
  complete: false,
  index: index,
  object: null,
  original: object,
  references: [],
  referers: referers
})

/**
 * Update the object of this reference identifier by cloning the object or array and setting child references to null.
 * Every reference that is found has it's key added to the array array of references.
 * @function
 * @param {module:objectHelpers~referenceIdentifier} referenceIdentifier
 * @returns {module:objectHelpers~referenceIdentifier}
 */
export const findObjectReferences = referenceIdentifier => setValue(
  'object',
  mapObject(
    referenceIdentifier.original,
    (item, key) => {
      if (nonReference(item)) {
        return item
      }
      referenceIdentifier.references.push(key)
      return null
    }
  ),
  referenceIdentifier
)

/**
 * An array of reference identifiers linked together.
 * @typedef {Array.<module:objectHelpers~referenceMap>} referenceMap
 */

/**
 * For all of the identified references, find the index of the corresponding referenceIdentifier
 * or create a new one and set the index instead of null.
 * @function
 * @param {module:objectHelpers~referenceMap} [referenceMap=[]]
 * @param {number} [index=0]
 * @param {boolean} [maxDepth=false]
 * @returns {module:objectHelpers~referenceIdentifier}
 */
export const findReferenceKeys = (referenceMap = [], index = 0, maxDepth = false) => referenceMap[index].references.reduce(
  (newRef, key, i) => {
    const objectToRef = newRef.original[key]
    const existingIndex = referenceMap.findIndex(existing => objectToRef === existing.original)
    if (existingIndex >= 0) {
      newRef.object[key] = existingIndex
      newRef.circular.push(key)
      referenceMap[existingIndex].referers.push(index)
      return newRef
    }
    if (maxDepth) {
      newRef.object[key] = Array.isArray(newRef.original[key]) ? [] : {}
      return newRef
    }
    const newRefIndex = referenceMap[referenceMap.length - 1].index + 1
    newRef.object[key] = referenceMap[referenceMap.length - 1].index + 1
    referenceMap[newRefIndex] = createReferenceIdentifier(objectToRef, newRef.object[key], [index])
    return newRef
  },
  referenceMap[index]
)

/**
 * Find the array index of the provided reference identifier within the reference map.
 * @function
 * @param {module:objectHelpers~referenceMap} referenceMap
 * @param {number} [index=0]
 * @returns {number}
 */
export const findReferenceIndex = (referenceMap, index = 0) => {
  const nextReference = referenceMap[index]
  if (nextReference && nextReference.index === index) {
    return index
  }
  if (nextReference && nextReference.index > index) {
    let tryIndex = index
    while (--tryIndex >= 0) {
      if (referenceMap[tryIndex] && referenceMap[tryIndex].index === index) {
        return tryIndex
      }
    }
  }
  return referenceMap.findIndex(ref => (typeof ref !== 'undefined' && ref.index === index))
}

/**
 * Find a referenced identifier by index form the reference map.
 * @function
 * @param {module:objectHelpers~referenceMap} referenceMap
 * @param {number} [index=0]
 * @returns {module:objectHelpers~referenceIdentifier}
 */
export const findReference = (referenceMap, index = 0) => referenceMap[findReferenceIndex(referenceMap, index)]

export const getIdentifierDepth = (referenceMap, identifier) => {
  if (!identifier.referers.length) {
    return 0
  }
  const lowestReferer = Math.min(...identifier.referers)
  if (lowestReferer >= identifier.index) {
    return 0
  }
  if (lowestReferer === 0) {
    return 1
  }
  const refererReference = findReference(referenceMap, lowestReferer)
  if (!refererReference) {
    return lowestReferer
  }
  return 1 + getIdentifierDepth(referenceMap, refererReference)
}

/**
 * Check if there are any remaining reference identifiers which are complete, excluded first in map.
 * @param {module:objectHelpers~referenceMap} referenceMap
 * @returns {boolean}
 */
const hasCompletedReferences = referenceMap => referenceMap.some(newRef => newRef.index > 0 && newRef.complete)

/**
 * Store a bundle containing an object, references array, and remove array.
 * @typedef {Object} objectReferencesRemove
 * @property {Array|Object} object
 * @property {Array.<string|number>} references
 * @property {module:objectHelpers~referenceMap} remove
 */

/**
 * Create a return type package containing an object, references to find, and array of items to remove.
 * @function
 * @param {Array|Object} object
 * @param {Array.<string|number>} [references=[]]
 * @returns {module:objectHelpers~objectReferencesRemove}
 */
export const objectAndReferences = (object, references = []) => Object.assign({}, {
  object: object || {},
  references: references || [],
  remove: []
})

/**
 * Used as callback for reduce, this function will find reference identifier associated with a number
 * then link the key on the object with the object of the reference identifier. The return is a bundle
 * containing the linked object, updated references array, and an array of identifiers to be deleted
 * since these are no longer required in the reference map.
 * @typedef {Function} referencesReduce
 * @param {module:objectHelpers~objectReferencesRemove} results
 * @param {number|string} key
 * @param {number} i
 * @returns {module:objectHelpers~objectReferencesRemove}
 */

/**
 * Return the referencesReduce callback.
 * @function
 * @param {module:objectHelpers~referenceMap} referenceMap
 * @returns {module:objectHelpers~referencesReduce}
 */
export const linkReferenceObject = referenceMap => (results, key, i) => {
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
    let remove = []
            ; (
      { object: results.object[keyArray[0]], remove } = keyArray[1].reduce(
        linkReferenceObject(referenceMap),
        objectAndReferences(results.object[keyArray[0]], keyArray[1])
      )
    )
    results.remove = [...results.remove, ...remove]
    return results
  }
  const nextRef = findReference(referenceMap, results.object[key])
  if (!nextRef.complete) {
    return results
  }
  results.object[key] = nextRef.object
  const nextReferences = nextRef.references.map(ref => nextRef.circular.includes(ref) ? [ref, null] : ref)
  results.remove.push(nextRef)
  if (nextReferences.length && !isCircular) {
    results.references[i] = [key, nextReferences]
    return results
  }
  results.references.splice(i, 1)
  return results
}

/**
 * Given a referenceIdentifier, find it in the referenceMap and remove it, return true. If unable
 * to remove then return false.
 * @typedef {Function} removeReferenceIdentifier
 * @param {module:objectHelpers~referenceIdentifier} results
 * @returns {boolean}
 */

/**
 * Return the remove reference identifier callback.
 * @function
 * @param {module:objectHelpers~referenceMap} referenceMap
 * @returns {module:objectHelpers~removeReferenceIdentifier}
 */
export const removeFromReferenceMap = referenceMap => referenceIdentifier => {
  const withoutReferer = referenceIdentifier.referers.every(referer => {
    if (referer >= referenceIdentifier.index) {
      return findReferenceIndex(referenceMap, referer) < 0
    }
    return true
  })
  const removeIndex = findReferenceIndex(referenceMap, referenceIdentifier.index)
  if (removeIndex <= 0 || !withoutReferer) {
    return false
  }
  referenceMap.splice(removeIndex, 1)
  const removeReferer = referenceMap[0].referers.indexOf(referenceIdentifier.index)
  if (removeReferer >= 0) {
    referenceMap[0].referers.splice(removeReferer, 1)
  }
  return true
}

/**
 * Find each of the unlinked references and assign the newly cloned reference for each.
 * @function
 * @param {module:objectHelpers~referenceMap} referenceMap
 * @returns {module:objectHelpers~referenceMap}
 */
export const linkReferences = referenceMap => {
  if (!referenceMap[0].complete) {
    return referenceMap
  }
  let remove = []
        ; (
    { object: referenceMap[0].object, references: referenceMap[0].references, remove } = referenceMap[0]
      .references
      .reduce(
        linkReferenceObject(referenceMap),
        objectAndReferences(referenceMap[0].object, referenceMap[0].references)
      )
  )
  remove.forEach(removeFromReferenceMap(referenceMap))
  return hasCompletedReferences(referenceMap) ? linkReferences(referenceMap) : referenceMap
}
