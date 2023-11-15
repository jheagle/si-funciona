import queueManager from './queueManager'
import queueTimeout from './queueTimeout'
import { logObject } from 'js-build-tools/functions/testHelpers'

describe('queueTimeout', () => {
  test('takes multiple functions and processes sequentially them after provided timeouts', () => {
    const testArray = []
    const test1 = jest.fn()
    const test2 = jest.fn()
    const test3 = jest.fn()
    const test4 = jest.fn()
    const queue = []
    const function1 = value => testArray.push(value) && (test1() || value)
    const function2 = value => testArray.push(value) && (test2() || value)
    const function3 = value => testArray.push(value) && (test3() || value)
    const function4 = value => testArray.push(value) && (test4() || value)
    expect.assertions(5)
    const queueManagerHandle = queueManager(queue)
    const timeoutManager = queueTimeout(queueManagerHandle)
    return Promise.all([
      timeoutManager(function1, 500, 'one').then(result => expect(test1).toHaveBeenCalled() || result),
      timeoutManager(function2, 0, 'two').then(result => expect(test2).toHaveBeenCalled() || result),
      timeoutManager(function3, 100, 'three').then(result => expect(test3).toHaveBeenCalled() || result),
      timeoutManager(function4, 50, 'four').then(result => expect(test4).toHaveBeenCalled() || result)
    ]).then(result => expect(testArray).toEqual(result) || result)
  })
})
