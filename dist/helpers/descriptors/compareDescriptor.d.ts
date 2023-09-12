import 'core-js/stable';
import { descriptor } from './samples/descriptor';
/**
 * Check if two descriptors are the same or similar in that they have similar keys and the associated types are the same.
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor1
 * @param {module:objectDescriptors~descriptor} descriptor2
 * @returns {boolean}
 */
declare const compareDescriptor: (descriptor1: descriptor, descriptor2: descriptor) => boolean;
export default compareDescriptor;
