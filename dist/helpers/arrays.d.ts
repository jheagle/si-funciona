/**
 * Utilities for building, merging, deduplicating and comparing arrays, plus a basic FIFO queue (BasicQueue) for
 * use with functionHelpers' queueManager/queueTimeout.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module arrayHelpers
 * @memberOf module:siFunciona
 */
import 'core-js/stable';
import BasicQueue from './arrays/BasicQueue';
declare const _default: {
    addUniqueToArray: (item: any, array: Array<any>) => Array<any>;
    BasicQueue: typeof BasicQueue;
    buildArray: (item: any, length: number) => Array<any>;
    buildArrayOfReferences: (item: any, length: number) => Array<any>;
    compareArrays: (...arrays: Array<Array<any>>) => import("./arrays/compareArrays").compareArrayResultMap;
    mergeArrays: (...arrays: Array<Array<any>>) => Array<any>;
    uniqueArray: (array: Array<any>) => Array<any>;
};
export default _default;
//# sourceMappingURL=arrays.d.ts.map