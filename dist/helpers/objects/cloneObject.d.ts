type cloneObjectOptions = {
    mapLimit?: number;
    depthLimit?: number;
    relevancyRange?: number;
};
/**
 * Clone objects for manipulation without data corruption, returns a copy of the provided object.
 * @memberOf module:objectHelpers
 * @param {Object} object - The original object that is being cloned
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=100] - Deprecated and ignored (circular references are handled without trimming).
 * @param {number} [options.depthLimit=-1] - Control how many nested levels deep will be used, -1 = no limit, >-1 = nth level limited.
 * @param {number} [options.relevancyRange=1000] - Deprecated and ignored: see mapLimit.
 * @returns {Object}
 */
declare const cloneObject: (object: object, { mapLimit, depthLimit, relevancyRange }?: cloneObjectOptions) => object;
export default cloneObject;
//# sourceMappingURL=cloneObject.d.ts.map