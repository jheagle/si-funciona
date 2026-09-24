import isCloneable from './isCloneable'
import reduceObject from './reduceObject'
import { relevanceMap } from '../functions/relevancyFilter'
import setValue from './setValue'

type mergeableItem =  Array<any> | {
  [k: number | string] : any
}

/**
 * Function that takes one or more objects and combines them into one.
 * @typedef {Function} module:objectHelpers~mergeObjectsCallback
 * @memberOf module:objectHelpers
 * @param {...Object} objects - Provide a list of objects which will be merged starting from the end up into the first
 * @returns {*}
 */
type mergeObjectsCallback = (...objects: Array<Object>) => mergeableItem

type mergeObjectsBaseOptions = { mapLimit?: number, depthLimit?: number, relevancyRange?: number, map?: relevanceMap, useClone?: boolean }

/**
 * Perform a deep merge of objects. This will return a function that will combine all objects and sub-objects.
 * Objects having the same attributes will overwrite from last object to first.
 * Every call of the returned function keeps its own record of the objects it has already visited (so circular
 * references are followed only once, and an object which is referenced in several places is merged once), and nothing
 * is remembered between calls: the results of separate calls never share state or go stale.
 * @memberOf module:objectHelpers
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=100] - Deprecated and ignored: the record of visited objects is now scoped to a
 * single call, so it does not need trimming.
 * @param {number} [options.depthLimit=-1] - Control how many nested levels deep will be used, -1 = no limit, >-1 = nth level limited.
 * @param {number} [options.relevancyRange=1000] - Deprecated and ignored: see mapLimit.
 * @param {Iterable|array} [options.map=[]] - A predetermined list of references (source and the object it should
 * resolve to) which every call starts from. It is only read, never added to.
 * @param {boolean} [options.useClone=false]
 * @returns {module:objectHelpers~mergeObjectsCallback|mergeObjectsCallback}
 */
const mergeObjectsBase = ({
  depthLimit = -1,
  map = [],
  useClone = false,
}: mergeObjectsBaseOptions = {}): mergeObjectsCallback => {
  const merge = (visited: Map<any, any>, depth: number, objects: Array<mergeableItem>): mergeableItem => {
    const firstObject = useClone ? Array.isArray(objects[0]) ? [] : {} : objects.shift()
    if (objects.length < 1) {
      return firstObject
    }
    if (depth === 0) {
      return firstObject
    }
    return objects.reduce((newObj: mergeableItem, arg: mergeableItem) => {
      if (!arg) {
        return newObj
      }
      if (!visited.has(arg)) {
        visited.set(arg, newObj)
      }
      return reduceObject(arg, (returnObj: mergeableItem, value: any, key: any): mergeableItem => {
        if (isCloneable(value)) {
          if (visited.has(value)) {
            return setValue(key, visited.get(value), returnObj)
          }
          let objectValue = newObj[key]
          if (!isCloneable(objectValue) || !objectValue) {
            if (!useClone) {
              // Merging by reference: the source object is used as it is, there is nothing to merge it into.
              visited.set(value, value)
              return setValue(key, value, returnObj)
            }
            objectValue = Array.isArray(value) ? [] : {}
          }
          return setValue(key, merge(visited, depth - 1, [objectValue, value]), returnObj)
        }
        return setValue(key, value, returnObj)
      }, newObj)
    }, firstObject || {})
  }
  return (...objects: Array<mergeableItem>): mergeableItem => merge(
    new Map(map.map(({ source, object }) => [source, object])),
    depthLimit,
    objects
  )
}

export default mergeObjectsBase