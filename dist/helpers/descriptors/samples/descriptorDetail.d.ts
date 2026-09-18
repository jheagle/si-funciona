/**
 * A description of one single property/element within a {@link module:objectDescriptors~descriptor}.
 * @typedef {Object} module:objectDescriptors~descriptorDetail
 * @memberOf module:objectDescriptors
 * @property {number} index - This detail's own position within its parent descriptor's `details` array.
 * @property {string|number} key - The property name (or array index) this detail describes.
 * @property {Array.<string>} type - The `typeof` result(s) seen for this property's value - more than one entry
 * means the same key held different types across multiple objects that were merged/compared into this descriptor.
 * @property {Array} value - The actual value(s) seen for this property, kept only until the descriptor is marked
 * `complete` (see {@link module:objectDescriptors.checkClearValues}), then cleared to save memory.
 * @property {boolean} nullable - Whether this property's value has been seen as `null`.
 * @property {boolean} optional - Whether this property is missing on some, but not all, of the compared objects.
 * @property {boolean} circular - Whether following this property's own nested value would lead back to an ancestor
 * already being described (a genuine circular reference), rather than a normal, resolvable nested object/array.
 * @property {boolean} isReference - Whether this property's value is itself an object/array, and so has its own
 * separate descriptor elsewhere in the descriptorMap (pointed to by `arrayReference`/`objectReference` below).
 * @property {boolean} isInstance - Whether this property's value is an instance of a custom class (as opposed to a
 * plain Object or Array literal) - such values are treated as opaque and not traced further.
 * @property {null|number} arrayReference - If this property's value is an array, the index (within the
 * descriptorMap) of that array's own descriptor; `null` otherwise.
 * @property {null|number} objectReference - If this property's value is a plain object, the index (within the
 * descriptorMap) of that object's own descriptor; `null` otherwise.
 */
export type descriptorDetail = {
    index: number;
    key: number | string;
    type: Array<string>;
    value: Array<any>;
    nullable: boolean;
    optional: boolean;
    circular: boolean;
    isReference: boolean;
    isInstance: boolean;
    arrayReference: number | null;
    objectReference: number | null;
};
/**
 * @type {module:objectDescriptors~descriptorDetail}
 * @memberOf module:objectDescriptors
 */
declare const descriptorDetailSample: descriptorDetail;
export default descriptorDetailSample;
//# sourceMappingURL=descriptorDetail.d.ts.map