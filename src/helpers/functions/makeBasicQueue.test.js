import makeBasicQueue from './makeBasicQueue'
import BasicQueue from '../arrays/BasicQueue'

describe('makeBasicQueue', () => {
  test('creates an instance of BasicQueue', () => {
    const sampleQueue = makeBasicQueue()
    expect(sampleQueue).toBeInstanceOf(BasicQueue)
  })
})
