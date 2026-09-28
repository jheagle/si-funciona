
/**
 * Helper for returning the absolute min value
 * @param num1 - A number to compare
 * @param num2 - Another number to be compared against
 */
const absoluteMin = (num1: number, num2: number): number => Math.abs(num1) < Math.abs(num2) ? num1 : num2

export default absoluteMin
