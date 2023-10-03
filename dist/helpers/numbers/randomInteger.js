'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
/**
 * Create a single random integer within provide range. And with optional offset,
 * The distance between the result numbers can be adjusted with interval.
 * @function
 * @memberOf module:numberHelpers
 * @param {number} range - Choose the breadth of the random number (0-100 would be 100 for range)
 * @param {number} [offset=0] - Choose the starting number (1-10 would be 1 for offset, 9 for range)
 * @param {number} [interval=1] - Choose the distance between numbers (5, 10, 15 would be 5 for interval, 1 for
 * offset, 2 for range)
 * @returns {number}
 */
const randomInteger = function (range) {
  const offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
  const interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1
  return (Math.floor(Math.random() * range) + offset) * interval
}
var _default = exports.default = randomInteger
