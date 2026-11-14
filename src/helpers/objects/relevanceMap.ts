/** One object already visited by a deep clone or merge, and the copy made of it. */
export type relevanceObject = {
  source: Array<any> | Object,
  object: Array<any> | Object,
  relevance: number,
}

/** The objects a deep clone or merge has already visited, so a reference seen twice is copied only once. */
export type relevanceMap = Array<relevanceObject>
