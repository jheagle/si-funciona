import type { relevanceMap } from '../objects/relevanceMap'

// Kept here too, so imports of these types from this file keep working until it is removed
export type { relevanceMap, relevanceObject } from '../objects/relevanceMap'

type relevancyFilterOptions = {
  mapLimit?: number,
  relevancyRange?: number,
}

/**
 * Remove elements out of relevance range and update the max relevance.
 * @param map
 * @param options
 * @param options.mapLimit - Only filter once the map exceeds this many entries.
 * @param options.relevancyRange - How many of the most-recent relevance values to keep.
 * @deprecated Nothing uses it any more (cloneObject and mergeObjectsBase ignore relevancyRange). It will be removed in
 * the next major version.
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
