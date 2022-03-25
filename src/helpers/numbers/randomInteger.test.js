import randomInteger from './randomInteger'

test('randomInteger returns an integer with the given specifications', () => {
  const test1 = randomInteger(100)
  expect(test1).toBeGreaterThanOrEqual(0)
  expect(test1).toBeLessThan(100)
  const test2 = randomInteger(9, 1)
  expect(test2).toBeGreaterThanOrEqual(1)
  expect(test2).toBeLessThan(10)
  const test3 = randomInteger(2, 1, 5)
  expect(test3).toBeGreaterThanOrEqual(5)
  expect(test3).toBeLessThanOrEqual(15)
  expect([5, 10, 15]).toContain(test3)
})
