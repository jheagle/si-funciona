import descriptorSample, { descriptor } from './descriptor'

/**
 * The full, flat result of describing an object graph: a list of every descriptor discovered, including nested
 * ones - the return type of {@link module:objectDescriptors.describeObjectMap}. Each descriptor's own `index`
 * matches its position in this array, which is how `arrayReference`/`objectReference` on a descriptorDetail point
 * back into it.
 * @typedef {Array.<module:objectDescriptors~descriptor>} module:objectDescriptors~descriptorMap
 * @memberOf module:objectDescriptors
 */
export type descriptorMap = Array<descriptor>

/**
 * @type {module:objectDescriptors~descriptorMap}
 * @memberOf module:objectDescriptors
 */
const descriptorMapSample: descriptorMap = [
  descriptorSample
]

export default descriptorMapSample
