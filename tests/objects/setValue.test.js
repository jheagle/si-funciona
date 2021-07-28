import setValue from '../../src/helpers/objects/setValue'

describe('setValue', () => {
  test('will update an item and return the item', () => {
    const someObject = {
      firstProp: null,
      secondProp: 'something here'
    }
    const updateObject1 = setValue('firstProp', { newValue: 'some value' }, someObject)
    const updateObject2 = setValue('secondProp', 'a new thing here', updateObject1)
    expect(updateObject2).toEqual({ firstProp: { newValue: 'some value' }, secondProp: 'a new thing here' })
  })
})
