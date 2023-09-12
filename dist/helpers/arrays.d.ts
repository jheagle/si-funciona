/**
 * Some simple utility functions for generating arrays or performing work on arrays.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module arrayHelpers
 * @memberOf module:siFunciona
 */
import 'core-js/stable';
declare const _default: {
    addUniqueToArray: (item: any, array: any[]) => any[];
    buildArray: (item: any, length: number) => any[];
    buildArrayOfReferences: (item: any, length: number) => any[];
    compareArrays: (...arrays: any[][]) => import("./arrays/compareArrays").compareArrayResultMap;
    mergeArrays: (...arrays: any[][]) => any[];
    uniqueArray: (array: any[]) => any[];
};
export default _default;
