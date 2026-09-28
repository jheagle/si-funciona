/**
 * Uses mergeObjectsBase deep merge objects and arrays, merge by reference.
 * @see {@link module:objectHelpers~mergeObjectsCallback}
 * @param objects - Provide a list of objects which will be merged starting from the end up into the first
 */
declare const mergeObjectsMutable: (...objects: Array<Object>) => any[] | {
    [k: string]: any;
    [k: number]: any;
};
export default mergeObjectsMutable;
//# sourceMappingURL=mergeObjectsMutable.d.ts.map