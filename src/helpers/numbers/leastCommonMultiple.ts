import greatestCommonDivisor from './greatestCommonDivisor'

/**
 * Helper for calculating the multiplier that would make each number relative to each other.
 * @param num1 - A number to compare
 * @param num2 - Another number to be compared against
 */
const leastCommonMultiple = (num1: number, num2: number): number => (num1 === 0 || num2 === 0) ? 0 : num1 * num2 / greatestCommonDivisor(num1, num2)

export default leastCommonMultiple
