import lowestCommonDenominator from './lowestCommonDenominator'

describe('lowestCommonDenominator', () => {
  test('will find the lcd of two numbers: 4,6,8', () => {
    expect(lowestCommonDenominator(4, 6, 8)).toBe(24)
  })
  test('will find the lcd of two numbers: 2,4,6', () => {
    expect(lowestCommonDenominator(3, 4, 6)).toBe(12)
  })
  test('will find the lcd of two numbers: 12,18,24', () => {
    expect(lowestCommonDenominator(12, 18, 24)).toBe(72)
  })
  test('will find the lcd of two numbers: 5,10,15', () => {
    expect(lowestCommonDenominator(5, 10, 15)).toBe(30)
  })
  test('will find the lcd of two numbers: -13,11,2', () => {
    expect(lowestCommonDenominator(-13, 11, 2)).toBe(286)
  })
  test('will find the lcd of two numbers: 3,3,3', () => {
    expect(lowestCommonDenominator(3, 3, 3)).toBe(3)
  })
})
