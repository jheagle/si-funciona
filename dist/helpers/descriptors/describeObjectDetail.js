'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _emptyObject = _interopRequireDefault(require('../objects/emptyObject'))
var _isCloneable = _interopRequireDefault(require('../objects/isCloneable'))
var _isInstanceObject = _interopRequireDefault(require('../objects/isInstanceObject'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Trace a single property's value and produce the descriptorDetail describing it (type, nullability, whether it
 * references a nested object/array, etc.) - the per-property building block used by
 * {@link module:objectDescriptors.describeObject}.
 * @memberOf module:objectDescriptors
 * @param {*} value - The property's value to describe.
 * @param {string|number} [key=0] - The property name (or array index) this value belongs to.
 * @param {number} [index=0] - This detail's intended position within its parent descriptor's `details` array.
 * @returns {module:objectDescriptors~descriptorDetail}
 */
const describeObjectDetail = (value, key = 0, index = 0) => {
  const type = typeof value
  return {
    index: index,
    key: key,
    type: [type],
    value: [value],
    nullable: value === null,
    optional: false,
    circular: false,
    isReference: (0, _isCloneable.default)(value) && !(0, _emptyObject.default)(value),
    isInstance: (0, _isInstanceObject.default)(value),
    arrayReference: null,
    objectReference: null
  }
}
var _default = exports.default = describeObjectDetail
