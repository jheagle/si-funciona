
/**
 * An object having an integer valued property named 'relevance'.
 * @typedef {Object} relevanceObject
 * @memberOf module:functionHelpers
 * @property {Array|Object} source
 * @property {Array|Object} object
 * @property {number} relevance
 */
export type relevanceObject = {
  source: Array<any> | Object,
  object: Array<any> | Object,
  relevance: number,
}

/**
 * A map of relevanceObjects which can be manipulated to filter results.
 * @typedef {Array.<relevanceObject>} relevanceMap
 * @memberOf module:functionHelpers
 */
export type relevanceMap = Array<relevanceObject>

type relevancyFilterOptions = {
  mapLimit?: number,
  relevancyRange?: number,
}

/**
 * Remove elements out of relevance range and update the max relevance.
 * @memberOf module:functionHelpers
 * @param {relevanceMap} map
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=1000] - Only filter once the map exceeds this many entries.
 * @param {number} [options.relevancyRange=100] - How many of the most-recent relevance values to keep.
 * @returns {relevanceMap}
 */
const relevancyFilter = (map: relevanceMap, { mapLimit = 1000, relevancyRange = 100 }: relevancyFilterOptions = {}): relevanceMap => {
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
