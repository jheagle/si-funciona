import { descriptor } from './samples/descriptor';
/**
 * Check if two descriptors describe the exact same underlying values (not just compatible types, like
 * {@link module:objectDescriptors.compareDescriptor} does) - used to detect genuine circular references, where a
 * nested value's descriptor turns out to be identical to one of its own ancestors.
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor1 - The first descriptor to compare.
 * @param {module:objectDescriptors~descriptor} descriptor2 - The second descriptor to compare.
 * @returns {boolean} True if every detail's values match at the same position.
 */
declare const sameDescriptor: (descriptor1: descriptor, descriptor2: descriptor) => boolean;
export default sameDescriptor;
//# sourceMappingURL=sameDescriptor.d.ts.map