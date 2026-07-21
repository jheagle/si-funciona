'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _leastCommonMultiple = _interopRequireDefault(require('./leastCommonMultiple'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Helper for calculating the multiplier that would make each number relative to each other.
 * @memberOf module:numberHelpers
 * @param {number} num1 - A number to compare
 * @param {number} num2 - Another number to be compared against
 * @returns {number}
 */
const lowestCommonDenominator = function () {
  for (var _len = arguments.length, numbers = new Array(_len), _key = 0; _key < _len; _key++) {
    numbers[_key] = arguments[_key]
  }
  return numbers.reduce((num1, num2) => (0, _leastCommonMultiple.default)(num1, num2), 1)
}
var _default = exports.default = lowestCommonDenominator
