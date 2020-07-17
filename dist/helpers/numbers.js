'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.compare = exports.randomInteger = exports.randomNumber = exports.getAbsoluteMin = exports.getAbsoluteMax = void 0

require('core-js/stable')

/**
 * Some number comparators and random number generators.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module numberHelpers
 */

/**
 * Helper for returning the absolute max value
 * @function
 * @param {number} num1 - A number to compare
 * @param {number} num2 - Another number to be compared against
 * @returns {number}
 */
var getAbsoluteMax = function getAbsoluteMax (num1, num2) {
  return Math.abs(num1) > Math.abs(num2) ? num1 : num2
}
/**
 * Helper for returning the absolute min value
 * @function
 * @param {number} num1 - A number to compare
 * @param {number} num2 - Another number to be compared against
 * @returns {number}
 */

exports.getAbsoluteMax = getAbsoluteMax

var getAbsoluteMin = function getAbsoluteMin (num1, num2) {
  return Math.abs(num1) < Math.abs(num2) ? num1 : num2
}
/**
 * Create a single random number within provided range. And with optional offset,
 * The distance between the result numbers can be adjusted with interval.
 * @function
 * @param {number} range - Choose the breadth of the random number (0-100 would be 100 for range)
 * @param {number} [offset=0] - Choose the starting number (1-10 would be 1 for offset, 9 for range)
 * @param {number} [interval=1] - Choose the distance between numbers (~5, ~10, ~15 would be 5 for interval, 1 for
 * offset, 2 for range)
 * @returns {number}
 */

exports.getAbsoluteMin = getAbsoluteMin

var randomNumber = function randomNumber (range) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
  var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1
  return (Math.random() * range + offset) * interval
}
/**
 * Create a single random integer within provide range. And with optional offset,
 * The distance between the result numbers can be adjusted with interval.
 * @function
 * @param {number} range - Choose the breadth of the random number (0-100 would be 100 for range)
 * @param {number} [offset=0] - Choose the starting number (1-10 would be 1 for offset, 9 for range)
 * @param {number} [interval=1] - Choose the distance between numbers (5, 10, 15 would be 5 for interval, 1 for
 * offset, 2 for range)
 * @returns {number}
 */

exports.randomNumber = randomNumber

var randomInteger = function randomInteger (range) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
  var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1
  return (Math.floor(Math.random() * range) + offset) * interval
}
/**
 * Compare two numbers and return:
 * -1 to indicate val1 is less than val2
 * 0 to indicate both values are the equal
 * 1 to indicate val1 is greater than val2
 * @function
 * @param {number} val1 - The first number to compare
 * @param {number} val2 - The second number to compare
 * @returns {number}
 */

exports.randomInteger = randomInteger

var compare = function compare (val1, val2) {
  return val1 === val2 ? 0 : val1 > val2 ? 1 : -1
}

exports.compare = compare
