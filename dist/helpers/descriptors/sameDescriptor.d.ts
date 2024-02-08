import 'core-js/stable';
import { descriptor } from './samples/descriptor';
/**
 * Check if the two descriptors are the same.
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor1
 * @param {module:objectDescriptors~descriptor} descriptor2
 * @returns {boolean}
 */
declare const sameDescriptor: (descriptor1: descriptor, descriptor2: descriptor) => boolean;
export default sameDescriptor;
