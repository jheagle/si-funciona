import 'core-js/stable';
import { descriptor } from './samples/descriptor';
/**
 * Check if the descriptors references have all been built and set complete to true if they have.
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor
 * @returns {module:objectDescriptors~descriptor}
 */
declare const checkDescriptorComplete: (descriptor: descriptor) => descriptor;
export default checkDescriptorComplete;
