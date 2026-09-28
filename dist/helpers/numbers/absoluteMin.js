'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
/**
 * Helper for returning the absolute min value
 * @param num1 - A number to compare
 * @param num2 - Another number to be compared against
 */
const absoluteMin = (num1, num2) => Math.abs(num1) < Math.abs(num2) ? num1 : num2
const _default = exports.default = absoluteMin
