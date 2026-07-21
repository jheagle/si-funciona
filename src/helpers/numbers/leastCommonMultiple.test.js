import leastCommonMultiple from './leastCommonMultiple'

describe('leastCommonMultiple', () => {
  const numberSets = [
    [ 4, 3, 12 ],
    [ 4, 6, 12 ],
    [ 9, 12, 36 ],
    [ -13, 11, -143 ],
    [ 3, 3, 3 ]
  ]
  test.each(numberSets)('get lcm for %i and %i', (a, b, expected) => {
    expect(leastCommonMultiple(a, b)).toBe(expected)
  })
})
