'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _emptyObject = _interopRequireDefault(require('../objects/emptyObject'))
var _isCloneable = _interopRequireDefault(require('../objects/isCloneable'))
var _isInstanceObject = _interopRequireDefault(require('../objects/isInstanceObject'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Trace an object's attribute and provide details about it.
 * @memberOf module:objectDescriptors
 * @param {*} value
 * @param {string|number} [key=0]
 * @param {number} [index=0]
 * @returns {module:objectDescriptors~descriptorDetail}
 */
const describeObjectDetail = function (value) {
  const key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
  const index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0
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
