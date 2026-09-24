'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.map.js')
require('core-js/modules/esnext.iterator.reduce.js')
require('core-js/modules/esnext.map.delete-all.js')
require('core-js/modules/esnext.map.every.js')
require('core-js/modules/esnext.map.filter.js')
require('core-js/modules/esnext.map.find.js')
require('core-js/modules/esnext.map.find-key.js')
require('core-js/modules/esnext.map.includes.js')
require('core-js/modules/esnext.map.key-of.js')
require('core-js/modules/esnext.map.map-keys.js')
require('core-js/modules/esnext.map.map-values.js')
require('core-js/modules/esnext.map.merge.js')
require('core-js/modules/esnext.map.reduce.js')
require('core-js/modules/esnext.map.some.js')
require('core-js/modules/esnext.map.update.js')
const _isCloneable = _interopRequireDefault(require('./isCloneable'))
const _reduceObject = _interopRequireDefault(require('./reduceObject'))
const _setValue = _interopRequireDefault(require('./setValue'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
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
  useClone = false
} = {}) => {
  const merge = (visited, depth, objects) => {
    const firstObject = useClone ? Array.isArray(objects[0]) ? [] : {} : objects.shift()
    if (objects.length < 1) {
      return firstObject
    }
    if (depth === 0) {
      return firstObject
    }
    return objects.reduce((newObj, arg) => {
      if (!arg) {
        return newObj
      }
      if (!visited.has(arg)) {
        visited.set(arg, newObj)
      }
      return (0, _reduceObject.default)(arg, (returnObj, value, key) => {
        if ((0, _isCloneable.default)(value)) {
          if (visited.has(value)) {
            return (0, _setValue.default)(key, visited.get(value), returnObj)
          }
          let objectValue = newObj[key]
          if (!(0, _isCloneable.default)(objectValue) || !objectValue) {
            if (!useClone) {
              // Merging by reference: the source object is used as it is, there is nothing to merge it into.
              visited.set(value, value)
              return (0, _setValue.default)(key, value, returnObj)
            }
            objectValue = Array.isArray(value) ? [] : {}
          }
          return (0, _setValue.default)(key, merge(visited, depth - 1, [objectValue, value]), returnObj)
        }
        return (0, _setValue.default)(key, value, returnObj)
      }, newObj)
    }, firstObject || {})
  }
  return (...objects) => merge(new Map(map.map(({
    source,
    object
  }) => [source, object])), depthLimit, objects)
}
const _default = exports.default = mergeObjectsBase
