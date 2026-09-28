import { descriptorDetail } from './samples/descriptorDetail';
/**
 * Trace a single property's value and produce the descriptorDetail describing it (type, nullability, whether it
 * references a nested object/array, etc.) - the per-property building block used by
 * {@link module:objectDescriptors.describeObject}.
 * @param value - The property's value to describe.
 * @param key - The property name (or array index) this value belongs to.
 * @param index - This detail's intended position within its parent descriptor's `details` array.
 */
declare const describeObjectDetail: (value: any, key?: number | string, index?: number) => descriptorDetail;
export default describeObjectDetail;
//# sourceMappingURL=describeObjectDetail.d.ts.map