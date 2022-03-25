import mergeObjectsMutable from './mergeObjectsMutable'

test('combines two objects into one new object', () => {
  const someItem = { name: 'something', number: 5, nested: { value: 'aValue' }, anArray: [1, 2, 3] }
  const secondItem = { name: 'different', key: 'someKey' }
  const newItem = mergeObjectsMutable({}, someItem, secondItem)
  expect(newItem).not.toBe(someItem)
  expect(newItem).toEqual({
    name: 'different',
    number: 5,
    nested: { value: 'aValue' },
    anArray: [1, 2, 3],
    key: 'someKey'
  })
})

test('add large reference onto attribute of first object, with circular references', () => {
  const children = [
    {
      tagName: 'body',
      parentItem: {},
      children: []
    },
    {
      tagName: 'head',
      parentItem: {},
      children: []
    }
  ]
  const newAttributes = {
    parentItem: {
      tagName: 'html',
      body: children[0],
      head: children[1],
      parentItem: {},
      children: children
    }
  }
  const result = mergeObjectsMutable(children[1], newAttributes)
  const expectedResult = {
    tagName: 'head',
    parentItem: {
      tagName: 'html',
      body: {
        tagName: 'body',
        parentItem: {},
        children: []
      },
      parentItem: {},
      children: []
    },
    children: []
  }
  expectedResult.parentItem.head = expectedResult
  expectedResult.parentItem.children[0] = expectedResult.parentItem.body
  expectedResult.parentItem.children[1] = expectedResult.parentItem.head
  expect(result).toEqual(expectedResult)
})
