'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

const _descriptorDetail = _interopRequireDefault(require('./descriptorDetail'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

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
  details: [_descriptorDetail.default],
  length: 1,
  keys: [_descriptorDetail.default.key],
  references: [],
  isArray: false,
  complete: true
}
const _default = descriptorSample
exports.default = _default
