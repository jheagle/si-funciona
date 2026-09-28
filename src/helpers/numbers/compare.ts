
/**
 * Compare two numbers and return:
 * -1 to indicate val1 is less than val2
 * 0 to indicate both values are the equal
 * 1 to indicate val1 is greater than val2
 * @param val1 - The first number to compare
 * @param val2 - The second number to compare
 */
const compare = (val1: number, val2: number): number => val1 === val2 ? 0 : val1 > val2 ? 1 : -1

export default compare
