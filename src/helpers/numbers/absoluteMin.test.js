import absoluteMin from './absoluteMin'

test('absoluteMin returns the correct number', () => {
  expect(absoluteMin(-200, 50)).toBe(50)
  expect(absoluteMin(1, -1)).toBe(-1)
  expect(absoluteMin(0, 0)).toBe(0)
})
