
/**
 * Create a single random integer from a set of `range` possible values, starting at the optional offset.
 * With no offset the result is 0 to range - 1 (so range is the number of possible values, the same as an array length
 * when choosing an index). The distance between the result numbers can be adjusted with interval.
 * @example
 * randomInteger(1) // always 0 (one possible value)
 * randomInteger(2) // 0 or 1
 * randomInteger(3, 1, 5) // 5, 10 or 15
 * items[randomInteger(items.length)] // a random valid index
 * @memberOf module:numberHelpers
 * @param {number} range - The number of possible values (0-99 would be 100 for range)
 * @param {number} [offset=0] - Choose the starting number (1-10 would be 1 for offset, 10 for range)
 * @param {number} [interval=1] - Choose the distance between numbers (5, 10, 15 would be 5 for interval, 1 for
 * offset, 3 for range)
 * @returns {number}
 */
const randomInteger = (range: number, offset: number = 0, interval: number = 1): number => (Math.floor(Math.random() * range) + offset) * interval

export default randomInteger
