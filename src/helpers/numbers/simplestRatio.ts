import 'core-js/stable'
import greatestCommonDivisor from './greatestCommonDivisor'

/**
 * Reduce several numbers to their simplest form / ratio
 * @memberOf module:numberHelpers
 * @param {...number} numbers - Array of numbers to simplify
 * @returns {Array.<number>}
 */
const simplestRatio = (...numbers: number[]): number[] => {
    if (numbers.length === 0) {
        return []
    }
    let commonDivisor = numbers.reduce((num1: number, num2: number): number => greatestCommonDivisor(num1, num2), 0)
    // Set to positive so that when we divide the numbers they retain their +/-
    commonDivisor = Math.abs(commonDivisor)

    return numbers.map((num) => num / commonDivisor)
}

export default simplestRatio
