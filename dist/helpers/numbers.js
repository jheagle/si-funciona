;(function () {
  /**
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 */

  /**
 * Some number comparators and random number generators.
 * @module numberHelpers
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 */
  const numberHelpers = {}

  /**
 * Helper for returning the absolute max value
 * @function getAbsoluteMax
 * @param {number} num1 - A number to compare
 * @param {number} num2 - Another number to be compared against
 * @returns {number}
 */
  const getAbsoluteMax = (num1, num2) => Math.abs(num1) > Math.abs(num2) ? num1 : num2
  numberHelpers.getAbsoluteMax = getAbsoluteMax

  /**
 * Helper for returning the absolute min value
 * @function getAbsoluteMin
 * @param {number} num1 - A number to compare
 * @param {number} num2 - Another number to be compared against
 * @returns {number}
 */
  const getAbsoluteMin = (num1, num2) => Math.abs(num1) < Math.abs(num2) ? num1 : num2
  numberHelpers.getAbsoluteMin = getAbsoluteMin

  /**
 * Create a single random number within provided range. And with optional offset,
 * The distance between the result numbers can be adjusted with interval.
 * @function randomNumber
 * @param {number} range - Choose the breadth of the random number (0-100 would be 100 for range)
 * @param {number} [offset=0] - Choose the starting number (1-10 would be 1 for offset, 9 for range)
 * @param {number} [interval=1] - Choose the distance between numbers (~5, ~10, ~15 would be 5 for interval, 1 for
 * offset, 2 for range)
 * @returns {number}
 */
  const randomNumber = (range, offset = 0, interval = 1) => (Math.random() * range + offset) * interval
  numberHelpers.randomNumber = randomNumber

  /**
 * Create a single random integer within provide range. And with optional offset,
 * The distance between the result numbers can be adjusted with interval.
 * @function randomInteger
 * @param {number} range - Choose the breadth of the random number (0-100 would be 100 for range)
 * @param {number} [offset=0] - Choose the starting number (1-10 would be 1 for offset, 9 for range)
 * @param {number} [interval=1] - Choose the distance between numbers (5, 10, 15 would be 5 for interval, 1 for
 * offset, 2 for range)
 * @returns {number}
 */
  const randomInteger = (range, offset = 0, interval = 1) => (Math.floor(Math.random() * range) + offset) * interval
  numberHelpers.randomInteger = randomInteger

  /**
 * Compare two numbers and return:
 * -1 to indicate val1 is less than val2
 * 0 to indicate both values are the equal
 * 1 to indicate val1 is greater than val2
 * @function compare
 * @param {number} val1 - The first number to compare
 * @param {number} val2 - The second number to compare
 * @returns {number}
 */
  const compare = (val1, val2) => val1 === val2 ? 0 : val1 > val2 ? 1 : -1
  numberHelpers.compare = compare

  module.exports = numberHelpers
})()
