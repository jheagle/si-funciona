import { descriptor } from './samples/descriptor';
/**
 * Find the index (within `descriptor.details`) of the next referenced property - after `currentReference` - whose
 * own nested object/array still needs its descriptor built. Used to walk through a descriptor's references one at
 * a time while building out a descriptorMap.
 * @param descriptor - The descriptor whose references to search.
 * @param currentReference - The `details` index already processed - search continues after this one.
 * @returns The next detail index to process, or `undefined` if none remain.
 */
declare const nextReference: (descriptor: descriptor, currentReference: number) => number | undefined;
export default nextReference;
//# sourceMappingURL=nextReference.d.ts.map