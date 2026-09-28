'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
/**
 * Return the highest number that can be divided into both numbers.
 * @param num1 - First number to assess
 * @param num2 - Second number to compare for common divisor
 */
const greatestCommonDivisor = (num1, num2) => num2 === 0 ? num1 : greatestCommonDivisor(num2, num1 % num2)
const _default = exports.default = greatestCommonDivisor
