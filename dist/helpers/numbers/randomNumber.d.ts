/**
 * Create a single random number from offset up to (but never including) offset + range. With optional offset,
 * the distance between the result numbers can be adjusted with interval. Matches randomInteger, which gives the
 * whole numbers of the same span.
 * @param range - Choose the breadth of the random number (0 up to, but not including, 100 would be 100 for range)
 * @param offset - Choose the starting number (1 up to, but not including, 10 would be 1 for offset, 9 for range)
 * @param interval - Choose the multiplier applied to the result (~5, ~10, ~15 would be 5 for interval,
 * 1 for offset, 2 for range)
 */
declare const randomNumber: (range: number, offset?: number, interval?: number) => number;
export default randomNumber;
//# sourceMappingURL=randomNumber.d.ts.map