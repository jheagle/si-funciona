'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
/**
 * Return the highest number that can be divided into both numbers.
 * @memberOf module:numberHelpers
 * @param {number} num1 - First number to assess
 * @param {number} num2 - Second number to compare for common divisor
 * @returns {number}
 */
const greatestCommonDivisor = (num1, num2) => num2 === 0 ? num1 : greatestCommonDivisor(num2, num1 % num2)
var _default = exports.default = greatestCommonDivisor
