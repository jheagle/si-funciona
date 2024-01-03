import randomNumber from './randomNumber'

test('randomNumber returns a number with the given specifications', () => {
  const test1 = randomNumber(100)
  expect(test1).toBeGreaterThanOrEqual(0)
  expect(test1).toBeLessThan(100)
  const test2 = randomNumber(9, 1)
  expect(test2).toBeGreaterThanOrEqual(1)
  expect(test2).toBeLessThan(10)
  const test3 = randomNumber(2, 1, 5)
  expect(test3).toBeGreaterThanOrEqual(5)
  expect(test3).toBeLessThanOrEqual(15)
})
