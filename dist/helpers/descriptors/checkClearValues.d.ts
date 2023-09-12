import 'core-js/stable';
import { descriptor } from './samples/descriptor';
/**
 * Check if we should clear the values on this descriptor
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor
 * @param {boolean} [keepValues=false]
 * @returns {module:objectDescriptors~descriptor}
 */
declare const checkClearValues: (descriptor: descriptor, keepValues?: boolean) => descriptor;
export default checkClearValues;
