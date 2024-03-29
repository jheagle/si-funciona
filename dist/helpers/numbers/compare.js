'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
/**
 * Compare two numbers and return:
 * -1 to indicate val1 is less than val2
 * 0 to indicate both values are the equal
 * 1 to indicate val1 is greater than val2
 * @memberOf module:numberHelpers
 * @param {number} val1 - The first number to compare
 * @param {number} val2 - The second number to compare
 * @returns {number}
 */
const compare = (val1, val2) => val1 === val2 ? 0 : val1 > val2 ? 1 : -1
var _default = exports.default = compare
