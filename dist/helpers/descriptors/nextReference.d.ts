import 'core-js/stable';
import { descriptor } from './samples/descriptor';
/**
 * Find the index of the next module:objectDescriptors.descriptorDetail to build a resource for.
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor
 * @param {number} currentReference
 * @returns {number|undefined}
 */
declare const nextReference: (descriptor: descriptor, currentReference: number) => number | undefined;
export default nextReference;
