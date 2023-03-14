'use strict'

require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/es.array.map.js')
require('core-js/modules/esnext.async-iterator.map.js')
require('core-js/modules/esnext.iterator.map.js')
require('core-js/modules/es.array.reduce.js')
require('core-js/modules/es.object.to-string.js')
require('core-js/modules/esnext.async-iterator.reduce.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.reduce.js')
require('core-js/modules/es.array.find.js')
require('core-js/modules/esnext.async-iterator.find.js')
require('core-js/modules/esnext.iterator.find.js')
require('core-js/stable')
var _isCloneable = _interopRequireDefault(require('./isCloneable.js'))
var _reduceObject = _interopRequireDefault(require('./reduceObject.js'))
var _relevancyFilter = _interopRequireDefault(require('../functions/relevancyFilter.js'))
var _setValue = _interopRequireDefault(require('./setValue.js'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
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
var mergeObjectsBase = function mergeObjectsBase () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
  var _ref$mapLimit = _ref.mapLimit
  var mapLimit = _ref$mapLimit === void 0 ? 100 : _ref$mapLimit
  var _ref$depthLimit = _ref.depthLimit
  var depthLimit = _ref$depthLimit === void 0 ? -1 : _ref$depthLimit
  var _ref$relevancyRange = _ref.relevancyRange
  var relevancyRange = _ref$relevancyRange === void 0 ? 1000 : _ref$relevancyRange
  var _ref$map = _ref.map
  var map = _ref$map === void 0 ? [] : _ref$map
  var _ref$useClone = _ref.useClone
  var useClone = _ref$useClone === void 0 ? false : _ref$useClone
  return function () {
    for (var _len = arguments.length, objects = new Array(_len), _key = 0; _key < _len; _key++) {
      objects[_key] = arguments[_key]
    }
    var firstObject = useClone ? Array.isArray(objects[0]) ? [] : {} : objects.shift()
    if (objects.length < 1) {
      return firstObject
    }
    if (depthLimit === 0) {
      return firstObject
    }
    return objects.reduce(function (newObj, arg) {
      if (!arg) {
        return newObj
      }
      map.push({
        source: arg,
        object: newObj,
        relevance: map.length
      })
      map = (0, _relevancyFilter.default)(map, {
        mapLimit: mapLimit,
        relevancyRange: relevancyRange
      })
      return (0, _reduceObject.default)(arg, function (returnObj, value, key) {
        if ((0, _isCloneable.default)(value)) {
          var objectValue = newObj[key]
          var exists = map.find(function (existing) {
            return existing.source === value
          })
          if (exists) {
            exists.relevance = map.length + 1
            return (0, _setValue.default)(key, exists.object, returnObj)
          }
          if (!(0, _isCloneable.default)(objectValue) || !objectValue) {
            objectValue = useClone ? Array.isArray(value) ? [] : {} : value
          }
          if ((0, _isCloneable.default)(objectValue)) {
            return (0, _setValue.default)(key, mergeObjectsBase({
              mapLimit: mapLimit,
              depthLimit: depthLimit - 1,
              relevancyRange: relevancyRange,
              map: map,
              useClone: useClone
            })(objectValue, value), returnObj)
          }
          map.push({
            source: value,
            object: objectValue,
            relevance: map.length
          })
          map = (0, _relevancyFilter.default)(map, {
            mapLimit: mapLimit,
            relevancyRange: relevancyRange
          })
        }
        return (0, _setValue.default)(key, value, returnObj)
      }, newObj)
    }, firstObject || {})
  }
}
var _default = mergeObjectsBase
exports.default = _default
