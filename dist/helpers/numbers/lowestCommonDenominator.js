'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.reduce.js')
const _leastCommonMultiple = _interopRequireDefault(require('./leastCommonMultiple'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Find the smallest number that all the given numbers divide into evenly, by reducing them pairwise with
 * leastCommonMultiple.
 * @memberOf module:numberHelpers
 * @param {...number} numbers - Two or more numbers to find the lowest common denominator of.
 * @returns {number}
 */
const lowestCommonDenominator = (...numbers) => numbers.reduce((num1, num2) => (0, _leastCommonMultiple.default)(num1, num2), 1)
const _default = exports.default = lowestCommonDenominator
