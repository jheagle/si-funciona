import callWithParams from '../../src/helpers/functions/callWithParams'

describe('callWithParams', () => {
  test('will use the correct number of parameters for a function', () => {
    const testFunction = (...args) => {
      const arg1 = (typeof args[0] !== 'undefined') ? args[0] : '[not set]'
      const arg2 = (typeof args[1] !== 'undefined') ? args[1] : '[not set]'
      const arg3 = (typeof args[2] !== 'undefined') ? args[2] : '[not set]'
      return `arg1: ${arg1}, arg2: ${arg2}, arg3: ${arg3}`
    }
    const params = ['first', 'second', 'third', 'fourth', 'five']
    expect(callWithParams(testFunction, params, 0))
      .toBe('arg1: [not set], arg2: [not set], arg3: [not set]')
    expect(callWithParams(testFunction, params, 1))
      .toBe('arg1: first, arg2: [not set], arg3: [not set]')
    expect(callWithParams(testFunction, params, 2))
      .toBe('arg1: first, arg2: second, arg3: [not set]')
    expect(callWithParams(testFunction, params, 3))
      .toBe('arg1: first, arg2: second, arg3: third')
  })
})
