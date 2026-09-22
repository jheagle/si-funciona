import { descriptorDetail } from './samples/descriptorDetail';
/**
 * Assign properties from other details onto an existing detail, widening it (e.g. combining `type`/`value` arrays,
 * OR-ing boolean flags like `nullable`/`optional`) rather than overwriting it - the per-property counterpart to
 * {@link module:objectDescriptors.assignDescriptor}.
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptorDetail} originalDetail - The base detail to merge onto (not mutated -
 * a clone is merged and returned).
 * @param  {...module:objectDescriptors~descriptorDetail} details - One or more further details to merge in.
 * @returns {module:objectDescriptors~descriptorDetail} A new detail representing the merge of all of the above.
 */
declare const assignDescriptorDetail: (originalDetail: descriptorDetail, ...details: Array<descriptorDetail>) => descriptorDetail;
export default assignDescriptorDetail;
//# sourceMappingURL=assignDescriptorDetail.d.ts.map