'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.async-iterator.map.js')
require('core-js/modules/esnext.iterator.map.js')
require('core-js/modules/esnext.async-iterator.reduce.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.reduce.js')
require('core-js/modules/esnext.async-iterator.find.js')
require('core-js/modules/esnext.iterator.find.js')
require('core-js/stable')
var _isCloneable = _interopRequireDefault(require('./isCloneable'))
var _reduceObject = _interopRequireDefault(require('./reduceObject'))
var _relevancyFilter = _interopRequireDefault(require('../functions/relevancyFilter'))
var _setValue = _interopRequireDefault(require('./setValue'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Perform a deep merge of objects. This will return a function that will combine all objects and sub-objects.
 * Objects having the same attributes will overwrite from last object to first.
 * NOTE: Use the mapLimit and relevancyRange to resolve "too much recursion" when the object is large and is known to
 * have circular references. A high mapLimit may lead to heavy memory usage and slow performance.
 * @memberOf module:objectHelpers
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=100] - Size of temporary reference array used in memory before assessing relevancy.
 * @param {number} [options.depthLimit=-1] - Control how many nested levels deep will be used, -1 = no limit, >-1 = nth level limited.
 * @param {number} [options.relevancyRange=1000] - Total reference map length subtract this range, any relevancy less than that amount at time of evaluation will be removed.
 * @param {Iterable|array} [options.map=[]] - A predetermined list of references gathered (to be passed to itself during recursion).
 * @param {boolean} [options.useClone=false]
 * @returns {module:objectHelpers~mergeObjectsCallback|mergeObjectsCallback}
 */
const mergeObjectsBase = function () {
  let {
    mapLimit = 100,
    depthLimit = -1,
    relevancyRange = 1000,
    map = [],
    useClone = false
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
  return function () {
    for (var _len = arguments.length, objects = new Array(_len), _key = 0; _key < _len; _key++) {
      objects[_key] = arguments[_key]
    }
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
      map = (0, _relevancyFilter.default)(map, {
        mapLimit,
        relevancyRange
      })
      return (0, _reduceObject.default)(arg, (returnObj, value, key) => {
        if ((0, _isCloneable.default)(value)) {
          let objectValue = newObj[key]
          const exists = map.find(existing => existing.source === value)
          if (exists) {
            exists.relevance = map.length + 1
            return (0, _setValue.default)(key, exists.object, returnObj)
          }
          if (!(0, _isCloneable.default)(objectValue) || !objectValue) {
            objectValue = useClone ? Array.isArray(value) ? [] : {} : value
          }
          if ((0, _isCloneable.default)(objectValue)) {
            return (0, _setValue.default)(key, mergeObjectsBase({
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
          map = (0, _relevancyFilter.default)(map, {
            mapLimit,
            relevancyRange
          })
        }
        return (0, _setValue.default)(key, value, returnObj)
      }, newObj)
    }, firstObject || {})
  }
}
var _default = exports.default = mergeObjectsBase
