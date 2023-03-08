'use strict'

require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/es.array.filter.js')
require('core-js/modules/es.object.to-string.js')
require('core-js/modules/esnext.async-iterator.filter.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.filter.js')
require('core-js/modules/es.array.map.js')
require('core-js/modules/esnext.async-iterator.map.js')
require('core-js/modules/esnext.iterator.map.js')
require('core-js/stable')
/**
 * An object having an integer valued property named 'relevance'.
 * @typedef {Object} relevanceObject
 * @memberOf module:functionHelpers
 * @property {int} relevance
 */

/**
 * A map of relevanceObjects which can be manipulated to filter results.
 * @typedef {Array.<relevanceObject>} relevanceMap
 * @memberOf module:functionHelpers
 */

/**
 * Remove elements out of relevance range and update the max relevance.
 * @function
 * @memberOf module:functionHelpers
 * @param {relevanceMap} map
 * @param {Object} [options={}]
 * @param {int} [options.mapLimit=1000]
 * @param {int} [options.relevancyRange=100]
 * @returns {relevanceMap}
 */
var relevancyFilter = function relevancyFilter (map) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  var _ref$mapLimit = _ref.mapLimit
  var mapLimit = _ref$mapLimit === void 0 ? 1000 : _ref$mapLimit
  var _ref$relevancyRange = _ref.relevancyRange
  var relevancyRange = _ref$relevancyRange === void 0 ? 100 : _ref$relevancyRange
  if (map.length <= mapLimit) {
    return map
  }
  var minRelevance = map.length - relevancyRange
  var filtered = map.filter(function (reference) {
    return reference.relevance >= minRelevance
  })
  return filtered.map(function (reference) {
    reference.relevance = reference.relevance > filtered.length ? filtered.length : reference.relevance
    return reference
  })
}
var _default = relevancyFilter
exports.default = _default
