'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _isInstanceObject = _interopRequireDefault(require('./isInstanceObject'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Determine if the value is a reference instance
 * @function
 * @memberOf module:objectHelpers
 * @param {Array|Object|*} value
 * @returns {boolean}
 */
const isCloneable = value => typeof value === 'object' && value !== null && !(0, _isInstanceObject.default)(value)
var _default = isCloneable
exports.default = _default
