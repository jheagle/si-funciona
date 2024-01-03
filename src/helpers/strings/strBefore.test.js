import strBefore from './strBefore'

describe('strBefore', () => {
  test('will return the string before the first instance of the search string', () => {
    expect(strBefore('background-color', '-')).toBe('background')
  })
})
