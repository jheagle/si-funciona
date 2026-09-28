import leastCommonMultiple from './leastCommonMultiple'

/**
 * Find the smallest number that all the given numbers divide into evenly, by reducing them pairwise with
 * leastCommonMultiple.
 * @param numbers - Two or more numbers to find the lowest common denominator of.
 */
const lowestCommonDenominator = (...numbers: number[]): number => numbers.reduce((num1: number, num2: number): number => leastCommonMultiple(num1, num2), 1)

export default lowestCommonDenominator
