import kabobCase from './kabobCase'

describe('kabobCase', () => {
  test('will convert snake_case to kabob-case', () => {
    expect(kabobCase('background_color')).toBe('background-color')
  })
  test('will convert camelCase to kabob-case', () => {
    expect(kabobCase('backgroundColor')).toBe('background-color')
  })
  test('will convert Title Case to kabob-case', () => {
    expect(kabobCase('Background Color')).toBe('background-color')
  })
})