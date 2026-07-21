import 'core-js/stable'
import leastCommonMultiple from './leastCommonMultiple'

/**
 * Helper for calculating the multiplier that would make each number relative to each other.
 * @memberOf module:numberHelpers
 * @param {number} num1 - A number to compare
 * @param {number} num2 - Another number to be compared against
 * @returns {number}
 */
const lowestCommonDenominator = (...numbers: number[]): number => numbers.reduce((num1: number, num2: number): number => leastCommonMultiple(num1, num2), 1)

export default lowestCommonDenominator
