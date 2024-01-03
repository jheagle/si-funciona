import compareArrays from './compareArrays'

describe('compareArrays', () => {
  test('returns correct boolean', () => {
    expect(compareArrays(
      ['match1', 'firstMismatch1', 'match2', 'firstMismatch2', 'badMatch1'],
      ['match1', 'match2', 'secondMismatch1', 'badMatch1', 'badMatch1']
    )).toEqual([
      {
        value: 'match1',
        keys: [[0], [0]],
        result: [0, 0]
      },
      {
        value: 'firstMismatch1',
        keys: [[1], []],
        result: [1, -1]
      },
      {
        value: 'match2',
        keys: [[2], [1]],
        result: [0, 0]
      },
      {
        value: 'firstMismatch2',
        keys: [[3], []],
        result: [1, -1]
      },
      {
        value: 'badMatch1',
        keys: [[4], [3, 4]],
        result: [0, 0]
      },
      {
        value: 'secondMismatch1',
        keys: [[], [2]],
        result: [-1, 1]
      }
    ])
  })
})
