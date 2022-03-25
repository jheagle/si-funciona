import compare from './compare'

test('compare returns 1, 0, or -1 based on the results', () => {
  expect(compare(-200, 50)).toBe(-1)
  expect(compare(1, -1)).toBe(1)
  expect(compare(10, 10)).toBe(0)
})
