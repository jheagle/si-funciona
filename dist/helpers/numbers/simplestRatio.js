'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _greatestCommonDivisor = _interopRequireDefault(require('./greatestCommonDivisor'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Reduce several numbers to their simplest form / ratio
 * @memberOf module:numberHelpers
 * @param {...number} numbers - Array of numbers to simplify
 * @returns {Array.<number>}
 */
const simplestRatio = function () {
  for (var _len = arguments.length, numbers = new Array(_len), _key = 0; _key < _len; _key++) {
    numbers[_key] = arguments[_key]
  }
  if (numbers.length === 0) {
    return []
  }
  let commonDivisor = numbers.reduce((num1, num2) => (0, _greatestCommonDivisor.default)(num1, num2), 0)
  // Set to positive so that when we divide the numbers they retain their +/-
  commonDivisor = Math.abs(commonDivisor)
  // Simplify the numbers, handle zero
  return numbers.map(num => commonDivisor === 0 ? 0 : num / commonDivisor)
}
var _default = exports.default = simplestRatio
