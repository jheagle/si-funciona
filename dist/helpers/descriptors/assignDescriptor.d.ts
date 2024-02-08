import 'core-js/stable';
import { descriptor } from './samples/descriptor';
/**
 * Apply one or more descriptors to an existing descriptor so that they represent a merged version of the descriptors.
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} originalMap
 * @param  {...module:objectDescriptors~descriptor} descriptors
 * @returns {module:objectDescriptors~descriptor}
 */
declare const assignDescriptor: (originalMap: descriptor, ...descriptors: Array<descriptor>) => descriptor;
export default assignDescriptor;
