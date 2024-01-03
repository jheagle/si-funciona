import uniqueArray from './uniqueArray'

describe('uniqueArray', () => {
  test('removes duplicates from array', () => {
    expect(uniqueArray(
      ['match1', 'match2', 'secondMismatch1', 'badMatch1', 'badMatch1']
    )).toEqual(['match1', 'match2', 'secondMismatch1', 'badMatch1'])
  })
})
