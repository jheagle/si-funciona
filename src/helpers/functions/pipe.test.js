import pipe from './pipe'

describe('pipe', () => {
  test('some data through functions results in new data', () => {
    const someString = ''
    const functionOne = string => string ? `${string}, arg1: first` : 'arg1: first'
    const functionTwo = string => string ? `${string}, arg2: second` : 'arg2: second'
    const functionThree = string => string ? `${string}, arg3: third` : 'arg3: third'
    expect(pipe(functionOne)(someString))
      .toBe('arg1: first')
    expect(pipe(functionOne, functionTwo)(someString))
      .toBe('arg1: first, arg2: second')
    expect(pipe(functionOne, functionTwo, functionThree)(someString))
      .toBe('arg1: first, arg2: second, arg3: third')
  })
})
