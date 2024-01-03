import strAfterLast from './strAfterLast'

describe('strAfterLast', () => {
  test('will return empty string when no search string is found', () => {
    expect(strAfterLast('someString', 'notFound')).toBe('')
  })

  test('will return substring after search string', () => {
    expect(strAfterLast('someStringLast', 's')).toBe('t')
  })
})
