import 'core-js/stable'
import isCloneable from './isCloneable.js'
import reduceObject from './reduceObject.js'
import relevancyFilter from '../functions/relevancyFilter.js'
import setValue from './setValue.js'

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
 * NOTE: Use the mapLimit and relevancyRange to resolve "too much recursion" when the object is large and is known to
 * have circular references. A high mapLimit may lead to heavy memory usage and slow performance.
 * @function
 * @memberOf module:objectHelpers
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=100] - Size of temporary reference array used in memory before assessing relevancy.
 * @param {number} [options.depthLimit=-1] - Control how many nested levels deep will be used, -1 = no limit, >-1 = nth level limited.
 * @param {number} [options.relevancyRange=1000] - Total reference map length subtract this range, any relevancy less than that amount at time of evaluation will be removed.
 * @param {Iterable|array} [options.map=[]] - A predetermined list of references gathered (to be passed to itself during recursion).
 * @param {boolean} [options.useClone=false]
 * @returns {module:objectHelpers~mergeObjectsCallback}
 */
const mergeObjectsBase = ({
  mapLimit = 100,
  depthLimit = -1,
  relevancyRange = 1000,
  map = [],
  useClone = false,
} = {}) => (...objects) => {
  const firstObject = useClone ? Array.isArray(objects[0]) ? [] : {} : objects.shift()
  if (objects.length < 1) {
    return firstObject
  }
  if (depthLimit === 0) {
    return firstObject
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
    map = relevancyFilter(map, { mapLimit, relevancyRange })
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
          return setValue(key, mergeObjectsBase({
            mapLimit,
            depthLimit: depthLimit - 1,
            relevancyRange,
            map,
            useClone
          })(objectValue, value), returnObj)
        }
        map.push({
          source: value,
          object: objectValue,
          relevance: map.length
        })
        map = relevancyFilter(map, { mapLimit, relevancyRange })
      }
      return setValue(key, value, returnObj)
    }, newObj)
  }, firstObject || {})
}

export default mergeObjectsBase