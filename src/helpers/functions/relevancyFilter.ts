
export type relevanceObject = {
  source: Array<any> | Object,
  object: Array<any> | Object,
  relevance: number,
}

export type relevanceMap = Array<relevanceObject>

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
