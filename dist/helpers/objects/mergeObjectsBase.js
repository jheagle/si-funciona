'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.array.map.js')

require('core-js/modules/es.array.filter.js')

require('core-js/modules/es.array.find.js')

require('core-js/stable')

const _isCloneable = _interopRequireDefault(require('./isCloneable'))

const _reduceObject = _interopRequireDefault(require('./reduceObject'))

const _setValue = _interopRequireDefault(require('./setValue'))

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
const mergeObjectsBase = function mergeObjectsBase () {
  const _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
  const _ref$mapLimit = _ref.mapLimit
  const mapLimit = _ref$mapLimit === void 0 ? 1000 : _ref$mapLimit
  const _ref$depthLimit = _ref.depthLimit
  const depthLimit = _ref$depthLimit === void 0 ? -1 : _ref$depthLimit
  const _ref$relevancyRange = _ref.relevancyRange
  const relevancyRange = _ref$relevancyRange === void 0 ? 100 : _ref$relevancyRange
  const _ref$map = _ref.map
  let map = _ref$map === void 0 ? [] : _ref$map
  const _ref$useClone = _ref.useClone
  const useClone = _ref$useClone === void 0 ? false : _ref$useClone

  /**
   * Remove elements out of relevance range and update the max relevance.
   * @param {array} map
   * @returns {array}
   */
  const updateMap = function updateMap (map) {
    const minRelevance = map.length - relevancyRange
    return map.filter(function (reference) {
      return reference.relevance > minRelevance
    }).map(function (reference) {
      return (0, _setValue.default)('relevance', reference.relevance > map.length ? map.length : reference.relevance, reference)
    })
  }

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

    return objects.reduce(function (newObj, arg) {
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

      return (0, _reduceObject.default)(arg, function (returnObj, value, key) {
        if ((0, _isCloneable.default)(value)) {
          let objectValue = newObj[key]
          const exists = map.find(function (existing) {
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

          if (map.length > mapLimit) {
            map = updateMap(map)
          }
        }

        return (0, _setValue.default)(key, value, returnObj)
      }, newObj)
    }, firstObject || {})
  }
}

const _default = mergeObjectsBase
exports.default = _default
