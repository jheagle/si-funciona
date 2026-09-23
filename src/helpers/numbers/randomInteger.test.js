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

const collect = (fn, draws = 5000) => [...new Set(Array.from({ length: draws }, fn))].sort((a, b) => a - b)

test('randomInteger range is the number of possible values', () => {
  expect(collect(() => randomInteger(1))).toEqual([0])
  expect(collect(() => randomInteger(2))).toEqual([0, 1])
  expect(collect(() => randomInteger(50))).toHaveLength(50)
  expect(Math.max(...collect(() => randomInteger(50)))).toBe(49)
})

test('randomInteger with offset and interval covers exactly range values', () => {
  expect(collect(() => randomInteger(3, 1, 5))).toEqual([5, 10, 15])
  expect(collect(() => randomInteger(10, 1))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})
