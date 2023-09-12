import 'core-js/stable';
import { descriptor } from './samples/descriptor';
/**
 * Make a copy of an object descriptor so that the original will not be mutated.
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} originalMap
 * @returns {module:objectDescriptors~descriptor}
 */
declare const cloneDescriptor: (originalMap: descriptor) => descriptor;
export default cloneDescriptor;
