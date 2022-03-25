import absoluteMax from './absoluteMax'

test('absoluteMax returns the correct number', () => {
  expect(absoluteMax(-200, 50)).toBe(-200)
  expect(absoluteMax(-1, 1)).toBe(1)
  expect(absoluteMax(0, 0)).toBe(0)
})
