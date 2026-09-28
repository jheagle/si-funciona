'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
const _greatestCommonDivisor = _interopRequireDefault(require('./greatestCommonDivisor'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Helper for calculating the multiplier that would make each number relative to each other.
 * @param num1 - A number to compare
 * @param num2 - Another number to be compared against
 */
const leastCommonMultiple = (num1, num2) => num1 === 0 || num2 === 0 ? 0 : num1 * num2 / (0, _greatestCommonDivisor.default)(num1, num2)
const _default = exports.default = leastCommonMultiple
