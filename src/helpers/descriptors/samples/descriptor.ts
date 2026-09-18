import descriptorDetailSample, { descriptorDetail } from './descriptorDetail'

/**
 * A flat, serializable description of one object or array's shape - see the {@link module:objectDescriptors} module
 * description for the concept this represents. One `descriptor` covers a single level of nesting; a nested
 * object/array's own shape is a separate `descriptor` elsewhere in the same {@link module:objectDescriptors~descriptorMap},
 * pointed to via the relevant `descriptorDetail`'s `arrayReference`/`objectReference`.
 * @typedef {Object} module:objectDescriptors~descriptor
 * @memberOf module:objectDescriptors
 * @property {number} index - This descriptor's own position in the descriptorMap it belongs to.
 * @property {Array.<module:objectDescriptors~descriptorDetail>} details - One entry per property/element of the
 * described object or array.
 * @property {number} length - The number of properties/elements described (i.e. `details.length`).
 * @property {Array.<string|number>} keys - The property names (or array indexes) described, in the same order as `details`.
 * @property {Array.<number>} references - The `index` values (from `details`) of properties whose own value is
 * itself an object/array, and so has a separate descriptor elsewhere in the map.
 * @property {boolean} isArray - Whether the described value was an array (true) or a plain object (false).
 * @property {boolean} complete - Whether every referenced nested descriptor has actually been resolved yet - false
 * while still being built, true once nothing referenced is left pending.
 */
export type descriptor = {
  index: number,
  details: Array<descriptorDetail>,
  length: number,
  keys: Array<number | string>,
  references: Array<number>,
  isArray: boolean,
  complete: boolean,
}

/**
 * @type {module:objectDescriptors~descriptor}
 * @memberOf module:objectDescriptors
 */
const descriptorSample: descriptor = {
  index: 0,
  details: [descriptorDetailSample],
  length: 1,
  keys: [descriptorDetailSample.key],
  references: [],
  isArray: false,
  complete: true
}

export default descriptorSample
