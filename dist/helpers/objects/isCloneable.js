'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
const _isInstanceObject = _interopRequireDefault(require('./isInstanceObject'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Determine if the value is a reference instance
 * @memberOf module:objectHelpers
 * @param {Array|Object|*} value
 * @returns {boolean}
 */
const isCloneable = value => typeof value === 'object' && value !== null && !(0, _isInstanceObject.default)(value)
const _default = exports.default = isCloneable
