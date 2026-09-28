export type relevanceObject = {
    source: Array<any> | Object;
    object: Array<any> | Object;
    relevance: number;
};
export type relevanceMap = Array<relevanceObject>;
type relevancyFilterOptions = {
    mapLimit?: number;
    relevancyRange?: number;
};
/**
 * Remove elements out of relevance range and update the max relevance.
 * @param map
 * @param options
 * @param options.mapLimit - Only filter once the map exceeds this many entries.
 * @param options.relevancyRange - How many of the most-recent relevance values to keep.
 */
declare const relevancyFilter: (map: relevanceMap, { mapLimit, relevancyRange }?: relevancyFilterOptions) => relevanceMap;
export default relevancyFilter;
//# sourceMappingURL=relevancyFilter.d.ts.map