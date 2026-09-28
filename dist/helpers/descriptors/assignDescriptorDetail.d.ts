import { descriptorDetail } from './samples/descriptorDetail';
/**
 * Assign properties from other details onto an existing detail, widening it (e.g. combining `type`/`value` arrays,
 * OR-ing boolean flags like `nullable`/`optional`) rather than overwriting it - the per-property counterpart to
 * {@link module:objectDescriptors.assignDescriptor}.
 * @param originalDetail - The base detail to merge onto (not mutated -
 * a clone is merged and returned).
 * @param  details - One or more further details to merge in.
 * @returns A new detail representing the merge of all of the above.
 */
declare const assignDescriptorDetail: (originalDetail: descriptorDetail, ...details: Array<descriptorDetail>) => descriptorDetail;
export default assignDescriptorDetail;
//# sourceMappingURL=assignDescriptorDetail.d.ts.map