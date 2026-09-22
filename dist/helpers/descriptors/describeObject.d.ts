import { descriptor } from './samples/descriptor';
export type describeableObject = Array<any> | {
    [k: number | string]: any;
};
/**
 * Trace a single object or array (not its nested objects/arrays - see
 * {@link module:objectDescriptors.describeObjectMap} for that) and return the descriptor which defines its own
 * structure and attributes.
 * @memberOf module:objectDescriptors
 * @param {Object|Array} object - The object or array to describe.
 * @returns {module:objectDescriptors~descriptor}
 */
declare const describeObject: (object: describeableObject) => descriptor;
export default describeObject;
//# sourceMappingURL=describeObject.d.ts.map