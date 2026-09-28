/**
 * Uses mergeObjectsBase deep merge objects and arrays, merge by value.
 * @see {@link module:objectHelpers~mergeObjectsCallback}
 * @param objects - Provide a list of objects which will be merged starting from the end up into the first
 */
declare const mergeObjects: (...objects: Array<Object>) => any[] | {
    [k: string]: any;
    [k: number]: any;
};
export default mergeObjects;
//# sourceMappingURL=mergeObjects.d.ts.map