import delay from '../../src/helpers/functions/delay'

describe('delay', () => {
  test('will reject on non numeric time input', () => {
    expect.assertions(1)
    return expect(delay('not a number').resolver).rejects.toEqual(new Error('Invalid delay: not a number'))
  })

  test('will timeout then provide a promise', () => {
    expect.assertions(1)
    return expect(delay(10).resolver).resolves.toBe('Delayed for: 10')
  })

  test('can be cancelled', () => {
    expect.assertions(1)
    const delayHandler = delay(10)
    delayHandler.cancel()
    return expect(delayHandler.resolver).rejects.toEqual(new Error('Cancelled delay: 10'))
  })
})
