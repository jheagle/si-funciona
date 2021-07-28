/**
 * @typedef {Object} module:objectDescriptors~descriptorDetail
 * @memberOf module:objectDescriptors
 * @property {number} index
 * @property {string|number} key
 * @property {Array.<string>} type
 * @property {Array} value
 * @property {boolean} nullable
 * @property {boolean} optional
 * @property {boolean} circular
 * @property {boolean} isReference
 * @property {boolean} isInstance
 * @property {null|number} arrayReference
 * @property {null|number} objectReference
 */

/**
 * @type {module:objectDescriptors~descriptorDetail}
 * @memberOf module:objectDescriptors
 */
const descriptorDetailSample = {
  index: 0,
  key: 'keyName',
  type: ['string'],
  value: [''],
  nullable: false,
  optional: false,
  circular: false,
  isReference: false,
  isInstance: false,
  arrayReference: null,
  objectReference: null
}

export default descriptorDetailSample