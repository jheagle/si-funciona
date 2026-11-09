import snakeCase from './snakeCase'

describe('snakeCase', () => {
  test('will convert kabob-case to snake_case', () => {
    expect(snakeCase('background-color')).toBe('background_color')
  })
  test('will convert camelCase to snake_case', () => {
    expect(snakeCase('backgroundColor')).toBe('background_color')
  })
  test('will convert Title Case to snake_case', () => {
    expect(snakeCase('Background Color')).toBe('background_color')
  })

  test('splits an acronym from the word after it (parseJSONResponse)', () => {
    expect(snakeCase('parseJSONResponse')).toBe('parse_json_response')
  })
})
