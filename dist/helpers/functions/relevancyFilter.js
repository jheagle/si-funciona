'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.filter.js')
require('core-js/modules/esnext.iterator.map.js')
/**
 * Remove elements out of relevance range and update the max relevance.
 * @param map
 * @param options
 * @param options.mapLimit - Only filter once the map exceeds this many entries.
 * @param options.relevancyRange - How many of the most-recent relevance values to keep.
 */
const relevancyFilter = (map, {
  mapLimit = 1000,
  relevancyRange = 100
} = {}) => {
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
const _default = exports.default = relevancyFilter
