import setAndReturnValue from './setAndReturnValue'

describe('setAndReturnValue', () => {
  test('will update an item and return the value', () => {
    const someObject = {
      firstProp: null,
      secondProp: 'something here'
    }
    const firstValue = setAndReturnValue(someObject, 'firstProp', { newValue: 'some value' })
    expect(firstValue).toEqual({ newValue: 'some value' })
    const secondValue = setAndReturnValue(someObject, 'secondProp', 'a new thing here')
    expect(secondValue).toEqual('a new thing here')
  })
})
