import descriptorDetailSample from './descriptorDetail'

/**
 * @typedef {Object} module:objectDescriptors~descriptor
 * @memberOf module:objectDescriptors
 * @property {number} index
 * @property {Array.<module:objectDescriptors~descriptorDetail>} details
 * @property {number} length
 * @property {Array.<string|number>} keys
 * @property {Array.<number>} references
 * @property {boolean} isArray
 * @property {boolean} complete
 */

/**
 * @type {module:objectDescriptors~descriptor}
 * @memberOf module:objectDescriptors
 */
const descriptorSample = {
  index: 0,
  details: [descriptorDetailSample],
  length: 1,
  keys: [descriptorDetailSample.key],
  references: [],
  isArray: false,
  complete: true
}

export default descriptorSample
