import 'core-js/stable'

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
const relevancyFilter = (map, { mapLimit = 1000, relevancyRange = 100 } = {}) => {
  if (map.length <= mapLimit) {
    return map
  }
  const minRelevance = map.length - relevancyRange
  const filtered = map
    .filter(reference => reference.relevance >= minRelevance)
  return filtered.map(reference => {
    reference.relevance = reference.relevance > filtered.length ? filtered.length : reference.relevance
    return reference
  })
}

export default relevancyFilter
