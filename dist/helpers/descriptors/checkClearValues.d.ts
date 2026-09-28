import { descriptor } from './samples/descriptor';
/**
 * Once a descriptor is complete (all its references have been resolved), its details' actual `value` arrays are no
 * longer needed to build the descriptor further - clear them to save memory, unless `keepValues` says otherwise.
 * @param descriptor - The descriptor to check.
 * @param keepValues - Set true to keep the values even once the descriptor is complete.
 * @returns The same descriptor, with `details[].value` cleared if applicable.
 */
declare const checkClearValues: (descriptor: descriptor, keepValues?: boolean) => descriptor;
export default checkClearValues;
//# sourceMappingURL=checkClearValues.d.ts.map