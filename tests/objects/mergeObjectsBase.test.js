import mergeObjectsBase from '../../src/helpers/objects/mergeObjectsBase'

test('combines multiple objects into one new object', () => {
  const someItem = { name: 'something', anArray: [1, 2, 3] }
  const secondItem = { number: 10, nested: { value: 'aValue' } }
  const thirdItem = { number: 5, anArray: [2, 3, 4, 5, 6, 7] }
  const fourthItem = { name: 'different', key: 'someKey' }
  const newItem = mergeObjectsBase({ useClone: true })({}, someItem, secondItem, thirdItem, fourthItem)
  expect(newItem).not.toBe(someItem)
  expect(newItem.nested).not.toBe(secondItem.nested)
  expect(newItem).toEqual({
    name: 'different',
    number: 5,
    nested: { value: 'aValue' },
    anArray: [2, 3, 4, 5, 6, 7],
    key: 'someKey'
  })
})
