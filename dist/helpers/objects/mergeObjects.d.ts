import 'core-js/stable';
/**
 * Uses mergeObjectsBase deep merge objects and arrays, merge by value.
 * @memberOf module:objectHelpers
 * @see {@link module:objectHelpers~mergeObjectsCallback}
 * @param {...Object} objects - Provide a list of objects which will be merged starting from the end up into the first
 * @returns {*}
 */
declare const mergeObjects: (...objects: Object[]) => any[] | {
    [k: string]: any;
    [k: number]: any;
};
export default mergeObjects;
