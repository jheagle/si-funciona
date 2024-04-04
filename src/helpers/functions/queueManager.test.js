import queueManager from './queueManager'
import { Queue } from 'collect-your-stuff/dist/collections/queue/Queue'

describe('queueManager', () => {
  test('takes multiple functions and processes sequentially', done => {
    const testArray = []
    const testDidRun = jest.fn()
    const testFunction = value => testArray.push(value) && (testDidRun() || value)
    expect.assertions(5)
    const manager = queueManager()
    manager.start()
    Promise.all([
      manager.push(testFunction, 'one').then(result => expect(testDidRun).toHaveBeenCalled() || result),
      manager.push(testFunction, 'two').then(result => expect(testDidRun).toHaveBeenCalled() || result),
      manager.push(testFunction, 'three').then(result => expect(testDidRun).toHaveBeenCalled() || result),
      manager.push(testFunction, 'four').then(result => expect(testDidRun).toHaveBeenCalled() || result)
    ]).then(result => expect(testArray).toEqual(result) || done())
  })

  test('can use alternative Queue and run more after sequence', () => {
    expect.assertions(1)
    const testArray = []
    const testFunction = value => complete => {
      testArray.push(value)
      return complete
    }
    let queueToUse = [testFunction('one'), testFunction('two'), testFunction('three'), testFunction('four')]
    queueToUse = Queue.fromArray(queueToUse)
    const manager = queueManager(queueToUse)
    manager.start()
    manager.push(testFunction('five'))
    manager.push(
      complete => {
        expect(testArray).toEqual(['one', 'two', 'three', 'four', 'five'])
        return complete
      })
  })
})
