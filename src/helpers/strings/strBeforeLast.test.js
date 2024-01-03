import strBeforeLast from './strBeforeLast'

describe('strBeforeLast', () => {
  test('will return the string before the last instance of the search string', () => {
    expect(strBeforeLast('background-color-last', '-')).toBe('background-color')
  })
})
