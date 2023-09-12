import 'core-js/stable';
/**
 * Uses mergeObjectsBase deep merge objects and arrays, merge by reference.
 * @function
 * @memberOf module:objectHelpers
 * @see {@link module:objectHelpers~mergeObjectsCallback}
 * @param {...Object} objects - Provide a list of objects which will be merged starting from the end up into the first
 * @returns {*}
 */
declare const mergeObjectsMutable: (...objects: Object[]) => any[] | {
    [k: string]: any;
    [k: number]: any;
};
export default mergeObjectsMutable;
