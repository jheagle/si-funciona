import { descriptor } from './samples/descriptor';
/**
 * Apply one or more descriptors to an existing descriptor so that they represent a merged version of the descriptors.
 * Used to widen a descriptor as more differently-shaped objects are described into it (e.g. array elements of
 * different types), rather than replacing it outright.
 * @param originalMap - The base descriptor to merge onto (not mutated - a
 * clone is merged and returned).
 * @param  descriptors - One or more further descriptors to merge in.
 * @returns A new descriptor representing the merge of all of the above.
 */
declare const assignDescriptor: (originalMap: descriptor, ...descriptors: Array<descriptor>) => descriptor;
export default assignDescriptor;
//# sourceMappingURL=assignDescriptor.d.ts.map