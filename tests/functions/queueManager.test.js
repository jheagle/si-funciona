import queueManager from '../../src/helpers/functions/queueManager'

describe('queueManager', () => {
  test('takes multiple functions and processes sequentially', done => {
    const testArray = []
    const test1 = jest.fn()
    const test2 = jest.fn()
    const test3 = jest.fn()
    const test4 = jest.fn()
    const function1 = value => testArray.push(value) && (test1() || value)
    const function2 = value => testArray.push(value) && (test2() || value)
    const function3 = value => testArray.push(value) && (test3() || value)
    const function4 = value => testArray.push(value) && (test4() || value)
    expect.assertions(5)
    const manager = queueManager([])
    Promise.all([
      manager(function1, 'one').then(result => expect(test1).toHaveBeenCalled() || result),
      manager(function2, 'two').then(result => expect(test2).toHaveBeenCalled() || result),
      manager(function3, 'three').then(result => expect(test3).toHaveBeenCalled() || result),
      manager(function4, 'four').then(result => expect(test4).toHaveBeenCalled() || result)
    ]).then(result => expect(testArray).toEqual(result) || done())
  })
})
