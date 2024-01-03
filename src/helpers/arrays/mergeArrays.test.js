import mergeArrays from './mergeArrays'

describe('mergeArrays', () => {
  test('returns unique merged values from multiple arrays', () => {
    expect(mergeArrays(
      ['match1', 'firstMismatch1', 'match2', 'firstMismatch2', 'badMatch1'],
      ['match1', 'match2', 'secondMismatch1', 'badMatch1', 'badMatch1']
    )).toEqual(['match1', 'firstMismatch1', 'match2', 'firstMismatch2', 'badMatch1', 'secondMismatch1'])
  })
})
