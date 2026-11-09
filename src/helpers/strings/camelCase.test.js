import camelCase from './camelCase'

describe('camelCase', () => {
  test('will convert snake_case to camelCase', () => {
    expect(camelCase('background_color')).toBe('backgroundColor')
  })
  test('will convert kabob-case to camelCase', () => {
    expect(camelCase('background-color')).toBe('backgroundColor')
  })
  test('will convert Title Case to camelCase', () => {
    expect(camelCase('Background Color')).toBe('backgroundColor')
  })

  test('splits an acronym from the word after it (parseJSONResponse)', () => {
    expect(camelCase('parseJSONResponse')).toBe('parseJsonResponse')
  })
})
