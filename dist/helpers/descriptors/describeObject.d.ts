import 'core-js/stable';
import { descriptor } from './samples/descriptor';
export type describeableObject = Array<any> | {
    [k: number | string]: any;
};
/**
 * Trace an object and return the descriptor which defines the object's structure and attributes.
 * @memberOf module:objectDescriptors
 * @param {Object} object
 * @returns {module:objectDescriptors~descriptor}
 */
declare const describeObject: (object: describeableObject) => descriptor;
export default describeObject;
