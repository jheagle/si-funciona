import { descriptor } from './samples/descriptor';
/**
 * Once a descriptor is complete (all its references have been resolved), its details' actual `value` arrays are no
 * longer needed to build the descriptor further - clear them to save memory, unless `keepValues` says otherwise.
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor - The descriptor to check.
 * @param {boolean} [keepValues=false] - Set true to keep the values even once the descriptor is complete.
 * @returns {module:objectDescriptors~descriptor} The same descriptor, with `details[].value` cleared if applicable.
 */
declare const checkClearValues: (descriptor: descriptor, keepValues?: boolean) => descriptor;
export default checkClearValues;
//# sourceMappingURL=checkClearValues.d.ts.map