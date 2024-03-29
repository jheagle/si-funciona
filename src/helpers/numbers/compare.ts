import 'core-js/stable'

/**
 * Compare two numbers and return:
 * -1 to indicate val1 is less than val2
 * 0 to indicate both values are the equal
 * 1 to indicate val1 is greater than val2
 * @memberOf module:numberHelpers
 * @param {number} val1 - The first number to compare
 * @param {number} val2 - The second number to compare
 * @returns {number}
 */
const compare = (val1: number, val2: number): number => val1 === val2 ? 0 : val1 > val2 ? 1 : -1

export default compare
