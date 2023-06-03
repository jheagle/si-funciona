'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
/**
 * Helper for returning the absolute max value
 * @function
 * @memberOf module:numberHelpers
 * @param {number} num1 - A number to compare
 * @param {number} num2 - Another number to be compared against
 * @returns {number}
 */
const absoluteMax = (num1, num2) => Math.abs(num1) > Math.abs(num2) ? num1 : num2
var _default = absoluteMax
exports.default = _default
