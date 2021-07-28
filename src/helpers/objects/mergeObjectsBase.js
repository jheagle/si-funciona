import 'core-js/stable'
import isCloneable from './isCloneable'
import reduceObject from './reduceObject'
import setValue from './setValue'

/**
 * Function that takes one or more objects and combines them into one.
 * @typedef {Function} module:objectHelpers~mergeObjectsCallback
 * @memberOf module:objectHelpers
 * @param {...Object} objects - Provide a list of objects which will be merged starting from the end up into the first
 * @returns {*}
 */

/**
 * Perform a deep merge of objects. This will return a function that will combine all objects and sub-objects.
 * Objects having the same attributes will overwrite from last object to first.
 * @function
 * @memberOf module:objectHelpers
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=1000]
 * @param {number} [options.depthLimit=-1]
 * @param {number} [options.relevancyRange=100]
 * @param {Iterable|array} [options.map=[]]
 * @param {boolean} [options.useClone=false]
 * @returns {module:objectHelpers~mergeObjectsCallback}
 */
const mergeObjectsBase = ({
  mapLimit = 1000,
  depthLimit = -1,
  relevancyRange = 100,
  map = [],
  useClone = false,
} = {}) => {
  /**
   * Remove elements out of relevance range and update the max relevance.
   * @param {array} map
   * @returns {array}
   */
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

export default mergeObjectsBase