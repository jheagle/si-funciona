import 'core-js/stable'

/**
 * Create a single random integer within provide range. And with optional offset,
 * The distance between the result numbers can be adjusted with interval.
 * @function
 * @memberOf module:numberHelpers
 * @param {number} range - Choose the breadth of the random number (0-100 would be 100 for range)
 * @param {number} [offset=0] - Choose the starting number (1-10 would be 1 for offset, 9 for range)
 * @param {number} [interval=1] - Choose the distance between numbers (5, 10, 15 would be 5 for interval, 1 for
 * offset, 2 for range)
 * @returns {number}
 */
const randomInteger = (range: number, offset: number = 0, interval: number = 1): number => (Math.floor(Math.random() * range) + offset) * interval

export default randomInteger
