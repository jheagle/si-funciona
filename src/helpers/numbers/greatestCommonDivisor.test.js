import greatestCommonDivisor from './greatestCommonDivisor'

describe('greatestCommonDivisor', () => {
  const numberSets = [
    [ 4, 6, 2 ],
    [ 9, 12, 3 ],
    [ -13, 11, 1 ],
    [ 3, 3, 3 ]
  ]
  test.each(numberSets)('get gcd for %i and %i', (a, b, expected) => {
    expect(greatestCommonDivisor(a, b)).toBe(expected)
  })
})
