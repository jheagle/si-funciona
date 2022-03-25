import curry from './curry'

describe('curry', () => {
  test('returns callable with unmet parameters', () => {
    const arg1 = 'first'
    const arg2 = 'second'
    const arg3 = 'third'
    const testFunction = (arg1, arg2, arg3) => `arg1: ${arg1}, arg2: ${arg2}, arg3: ${arg3}`
    expect(curry(testFunction)(arg1, arg2, arg3))
      .toBe(`arg1: ${arg1}, arg2: ${arg2}, arg3: ${arg3}`)
    const functionNoArgs = curry(testFunction)
    expect(typeof functionNoArgs).toBe('function')
    const functionOneArg = functionNoArgs(arg1)
    expect(typeof functionOneArg).toBe('function')
    const functionTwoArgs = functionOneArg(arg2)
    expect(typeof functionTwoArgs).toBe('function')
    expect(functionTwoArgs(arg3)).toBe(`arg1: ${arg1}, arg2: ${arg2}, arg3: ${arg3}`)
  })
})
