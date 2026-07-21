import 'core-js/stable'

/**
 * Return the highest number that can be divided into both numbers.
 * @memberOf module:numberHelpers
 * @param {number} num1 - First number to assess
 * @param {number} num2 - Second number to compare for common divisor
 * @returns {number}
 */
const greatestCommonDivisor = (num1: number, num2: number): number => (num2 === 0 ? num1 : greatestCommonDivisor(num2, num1 % num2))

export default greatestCommonDivisor
