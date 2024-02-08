import 'core-js/stable';
/**
 * Take multiple arrays and then filter all these into one unique array.
 * @memberOf module:arrayHelpers
 * @param {...Array} arrays - Provide multiple arrays to create one unique array
 * @returns {Array}
 */
declare const mergeArrays: (...arrays: Array<Array<any>>) => Array<any>;
export default mergeArrays;
