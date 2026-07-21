'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _greatestCommonDivisor = _interopRequireDefault(require('./greatestCommonDivisor'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Helper for calculating the multiplier that would make each number relative to each other.
 * @memberOf module:numberHelpers
 * @param {number} num1 - A number to compare
 * @param {number} num2 - Another number to be compared against
 * @returns {number}
 */
const leastCommonMultiple = (num1, num2) => num1 === 0 || num2 === 0 ? 0 : num1 * num2 / (0, _greatestCommonDivisor.default)(num1, num2)
var _default = exports.default = leastCommonMultiple
