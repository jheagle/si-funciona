import { relevanceMap } from '../functions/relevancyFilter';
type mergeableItem = Array<any> | {
    [k: number | string]: any;
};
type mergeObjectsCallback = (...objects: Array<Object>) => mergeableItem;
type mergeObjectsBaseOptions = {
    mapLimit?: number;
    depthLimit?: number;
    relevancyRange?: number;
    map?: relevanceMap;
    useClone?: boolean;
};
/**
 * Perform a deep merge of objects. This will return a function that will combine all objects and sub-objects.
 * Objects having the same attributes will overwrite from last object to first.
 * Every call of the returned function keeps its own record of the objects it has already visited (so circular
 * references are followed only once, and an object which is referenced in several places is merged once), and nothing
 * is remembered between calls: the results of separate calls never share state or go stale.
 * @param options
 * @param options.mapLimit - Deprecated and ignored: the record of visited objects is now scoped to a
 * single call, so it does not need trimming.
 * @param options.depthLimit - Control how many nested levels deep will be used, -1 = no limit, >-1 = nth level limited.
 * @param options.relevancyRange - Deprecated and ignored: see mapLimit.
 * @param options.map] - A predetermined list of references (source and the object it should
 * resolve to) which every call starts from. It is only read, never added to.
 * @param options.useClone
 */
declare const mergeObjectsBase: ({ depthLimit, map, useClone, }?: mergeObjectsBaseOptions) => mergeObjectsCallback;
export default mergeObjectsBase;
//# sourceMappingURL=mergeObjectsBase.d.ts.map