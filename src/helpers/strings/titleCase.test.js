import titleCase from './titleCase'

describe('titleCase', () => {
  test('will convert kabob-case to Title Case', () => {
    expect(titleCase('background-color')).toBe('Background Color')
  })
  test('will convert camelCase to Title Case', () => {
    expect(titleCase('backgroundColor')).toBe('Background Color')
  })
  test('will convert snake_case to Title Case', () => {
    expect(titleCase('background_color')).toBe('Background Color')
  })

  test('splits an acronym from the word after it (parseJSONResponse)', () => {
    expect(titleCase('parseJSONResponse')).toBe('Parse Json Response')
  })
})
