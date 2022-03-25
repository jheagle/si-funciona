import preloadParams from './preloadParams'

describe('preloadParams', () => {
  const arg1 = 'first'
  const arg2 = 'second'
  const arg3 = 'third'
  const testFunction = (arg1, arg2, arg3) => `arg1: ${arg1}, arg2: ${arg2}, arg3: ${arg3}`

  test('will allow delay of first position argument', () => {
    expect(preloadParams(testFunction, [arg2, arg3], 0)(arg1))
      .toBe(`arg1: ${arg1}, arg2: ${arg2}, arg3: ${arg3}`)
  })

  test('will allow delay of second position argument', () => {
    expect(preloadParams(testFunction, [arg1, arg3], 1)(arg2))
      .toBe(`arg1: ${arg1}, arg2: ${arg2}, arg3: ${arg3}`)
  })

  test('will allow delay of third position argument', () => {
    expect(preloadParams(testFunction, [arg1, arg2], 2)(arg3))
      .toBe(`arg1: ${arg1}, arg2: ${arg2}, arg3: ${arg3}`)
  })
})
