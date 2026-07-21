import 'core-js/stable'
import greatestCommonDivisor from './greatestCommonDivisor'

/**
 * Helper for calculating the multiplier that would make each number relative to each other.
 * @memberOf module:numberHelpers
 * @param {number} num1 - A number to compare
 * @param {number} num2 - Another number to be compared against
 * @returns {number}
 */
const leastCommonMultiple = (num1: number, num2: number): number => (num1 === 0 || num2 === 0) ? 0 : num1 * num2 / greatestCommonDivisor(num1, num2)

export default leastCommonMultiple
