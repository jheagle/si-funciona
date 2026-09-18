import 'core-js/stable';
import { descriptor } from './samples/descriptor';
/**
 * Make a copy of an object descriptor so that the original will not be mutated.
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} originalMap - The descriptor to copy.
 * @returns {module:objectDescriptors~descriptor} A new, independent copy.
 */
declare const cloneDescriptor: (originalMap: descriptor) => descriptor;
export default cloneDescriptor;
//# sourceMappingURL=cloneDescriptor.d.ts.map