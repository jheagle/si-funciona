import 'core-js/stable';
import { describeableObject } from './describeObject';
import { descriptorMap } from './samples/descriptorMap';
type describeObjectMapOptions = {
    mapLimit?: number;
    depthLimit?: number;
    keepValues?: boolean;
};
/**
 * Trace out the entire object including nested objects.
 * @memberOf module:objectDescriptors
 * @param {Object|Array} object
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=1000000000]
 * @param {number} [options.depthLimit=-1]
 * @param {boolean} [options.keepValues=false]
 * @returns {module:objectDescriptors~descriptorMap}
 */
declare const describeObjectMap: (object: describeableObject, { mapLimit, depthLimit, keepValues }?: describeObjectMapOptions) => descriptorMap;
export default describeObjectMap;
