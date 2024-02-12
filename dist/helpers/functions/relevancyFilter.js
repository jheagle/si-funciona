'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.async-iterator.filter.js')
require('core-js/modules/esnext.async-iterator.map.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.filter.js')
require('core-js/modules/esnext.iterator.map.js')
require('core-js/stable')
/**
 * Remove elements out of relevance range and update the max relevance.
 * @memberOf module:functionHelpers
 * @param {relevanceMap} map
 * @param {Object} [options={}]
 * @param {int} [options.mapLimit=1000]
 * @param {int} [options.relevancyRange=100]
 * @returns {relevanceMap}
 */
const relevancyFilter = function (map) {
  const {
    mapLimit = 1000,
    relevancyRange = 100
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  if (map.length <= mapLimit) {
    return map
  }
  const minRelevance = map.length - relevancyRange
  const filtered = map.filter(reference => reference.relevance >= minRelevance)
  return filtered.map(reference => {
    reference.relevance = reference.relevance > filtered.length ? filtered.length : reference.relevance
    return reference
  })
}
var _default = exports.default = relevancyFilter
