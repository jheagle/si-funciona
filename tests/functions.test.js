import helpers from '../dist/helpers/functions.js'

test('curry returns callable with unmet parameters', () => {
  const arg1 = 'first'
  const arg2 = 'second'
  const arg3 = 'third'
  const testFunction = (arg1, arg2, arg3) => `arg1: ${arg1}, arg2: ${arg2}, arg3: ${arg3}`
  expect(helpers.curry(testFunction)(arg1, arg2, arg3))
    .toBe(`arg1: ${arg1}, arg2: ${arg2}, arg3: ${arg3}`)
  const functionNoArgs = helpers.curry(testFunction)
  expect(typeof functionNoArgs).toBe('function')
  const functionOneArg = functionNoArgs(arg1)
  expect(typeof functionOneArg).toBe('function')
  const functionTwoArgs = functionOneArg(arg2)
  expect(typeof functionTwoArgs).toBe('function')
  expect(functionTwoArgs(arg3)).toBe(`arg1: ${arg1}, arg2: ${arg2}, arg3: ${arg3}`)
})

test('pipe some data through functions results in new data', () => {
  const someString = ''
  const functionOne = string => string ? `${string}, arg1: first` : 'arg1: first'
  const functionTwo = string => string ? `${string}, arg2: second` : 'arg2: second'
  const functionThree = string => string ? `${string}, arg3: third` : 'arg3: third'
  expect(helpers.pipe(functionOne)(someString))
    .toBe('arg1: first')
  expect(helpers.pipe(functionOne, functionTwo)(someString))
    .toBe('arg1: first, arg2: second')
  expect(helpers.pipe(functionOne, functionTwo, functionThree)(someString))
    .toBe('arg1: first, arg2: second, arg3: third')
})

test('callWithParams will use the correct number of parameters for a function', () => {
  const testFunction = (...args) => {
    const arg1 = (typeof args[0] !== 'undefined') ? args[0] : '[not set]'
    const arg2 = (typeof args[1] !== 'undefined') ? args[1] : '[not set]'
    const arg3 = (typeof args[2] !== 'undefined') ? args[2] : '[not set]'
    return `arg1: ${arg1}, arg2: ${arg2}, arg3: ${arg3}`
  }
  const params = ['first', 'second', 'third', 'fourth', 'five']
  expect(helpers.callWithParams(testFunction, params, 0))
    .toBe('arg1: [not set], arg2: [not set], arg3: [not set]')
  expect(helpers.callWithParams(testFunction, params, 1))
    .toBe('arg1: first, arg2: [not set], arg3: [not set]')
  expect(helpers.callWithParams(testFunction, params, 2))
    .toBe('arg1: first, arg2: second, arg3: [not set]')
  expect(helpers.callWithParams(testFunction, params, 3))
    .toBe('arg1: first, arg2: second, arg3: third')
})

describe('delay', () => {
  test('will reject on non numeric time input', () => {
    expect.assertions(1)
    return expect(helpers.delay('not a number').resolver).rejects.toEqual(new Error('Invalid delay: not a number'))
  })

  test('will timeout then provide a proimse', () => {
    expect.assertions(1)
    return expect(helpers.delay(10).resolver).resolves.toBe('Delayed for: 10')
  })

  test('can be cancelled', () => {
    expect.assertions(1)
    const delayHandler = helpers.delay(10)
    delayHandler.cancel()
    return expect(delayHandler.resolver).rejects.toEqual(new Error('Cancelled delay: 10'))
  })
})

test('queueManager takes multiple functions and processes sequencially', done => {
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
  Promise.all([
    helpers.queueManager(function1, 'one').then(result => expect(test1).toHaveBeenCalled() || result),
    helpers.queueManager(function2, 'two').then(result => expect(test2).toHaveBeenCalled() || result),
    helpers.queueManager(function3, 'three').then(result => expect(test3).toHaveBeenCalled() || result),
    helpers.queueManager(function4, 'four').then(result => expect(test4).toHaveBeenCalled() || result)
  ]).then(result => expect(testArray).toEqual(result) || done())
})

test('queueTimeout takes multiple functions and processes sequencially them after provided timeouts', () => {
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
  return Promise.all([
    helpers.queueTimeout(function1, 500, 'one').then(result => expect(test1).toHaveBeenCalled() || result),
    helpers.queueTimeout(function2, 0, 'two').then(result => expect(test2).toHaveBeenCalled() || result),
    helpers.queueTimeout(function3, 100, 'three').then(result => expect(test3).toHaveBeenCalled() || result),
    helpers.queueTimeout(function4, 50, 'four').then(result => expect(test4).toHaveBeenCalled() || result)
  ]).then(result => expect(testArray).toEqual(result) || result)
})
