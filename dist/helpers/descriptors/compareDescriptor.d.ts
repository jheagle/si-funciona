import 'core-js/stable';
import { descriptor } from './samples/descriptor';
/**
 * Check if two descriptors are the same or similar, in that the smaller one's keys are all present in the larger
 * one and their types line up - used to detect when a newly-described value actually matches a descriptor already
 * in the map, so it can be pointed at instead of creating a duplicate.
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor1 - The first descriptor to compare.
 * @param {module:objectDescriptors~descriptor} descriptor2 - The second descriptor to compare.
 * @returns {boolean} True if the descriptors describe a compatible shape.
 */
declare const compareDescriptor: (descriptor1: descriptor, descriptor2: descriptor) => boolean;
export default compareDescriptor;
//# sourceMappingURL=compareDescriptor.d.ts.map