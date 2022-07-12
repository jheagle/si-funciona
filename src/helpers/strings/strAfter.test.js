import strAfter from './strAfter'

describe('strAfter', () => {
  test('will return empty string when no search string is found', () => {
    expect(strAfter('someString', 'notFound')).toBe('')
  })

  test('will return substring after search string', () => {
    expect(strAfter('someString', 's')).toBe('omeString')
  })
})
