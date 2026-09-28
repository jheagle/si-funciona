type cloneObjectOptions = {
    mapLimit?: number;
    depthLimit?: number;
    relevancyRange?: number;
};
/**
 * Clone objects for manipulation without data corruption, returns a copy of the provided object.
 * @param object - The original object that is being cloned
 * @param options
 * @param options.mapLimit - Deprecated and ignored (circular references are handled without trimming).
 * @param options.depthLimit - Control how many nested levels deep will be used, -1 = no limit, >-1 = nth level limited.
 * @param options.relevancyRange - Deprecated and ignored: see mapLimit.
 */
declare const cloneObject: (object: object, { mapLimit, depthLimit, relevancyRange }?: cloneObjectOptions) => object;
export default cloneObject;
//# sourceMappingURL=cloneObject.d.ts.map