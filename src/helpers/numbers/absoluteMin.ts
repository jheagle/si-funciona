import 'core-js/stable'

/**
 * Helper for returning the absolute min value
 * @memberOf module:numberHelpers
 * @param {number} num1 - A number to compare
 * @param {number} num2 - Another number to be compared against
 * @returns {number}
 */
const absoluteMin = (num1: number, num2: number): number => Math.abs(num1) < Math.abs(num2) ? num1 : num2

export default absoluteMin
