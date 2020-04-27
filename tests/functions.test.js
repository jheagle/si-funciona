const helpers = require('../dist/helpers/functions.js')

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

// queueTimeout
