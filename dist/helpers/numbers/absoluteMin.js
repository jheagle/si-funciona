'use strict'

require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
/**
 * Helper for returning the absolute min value
 * @function
 * @memberOf module:numberHelpers
 * @param {number} num1 - A number to compare
 * @param {number} num2 - Another number to be compared against
 * @returns {number}
 */
var absoluteMin = function absoluteMin (num1, num2) {
  return Math.abs(num1) < Math.abs(num2) ? num1 : num2
}
var _default = absoluteMin
exports.default = _default
