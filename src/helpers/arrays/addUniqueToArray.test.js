import addUniqueToArray from './addUniqueToArray'

describe('addUniqueToArray', () => {
  test('will add a new unique element to an array', () => {
    const someArray = ['one', 'two', 'three']
    const newElement = 'four'
    const updatedArray = addUniqueToArray(newElement, someArray)
    expect(updatedArray).toContain(newElement)
  })

  test('will not add duplicate to array', () => {
    const someArray = ['one', 'two', 'three']
    const newElement = 'three'
    const updatedArray = addUniqueToArray(newElement, someArray)
    expect(updatedArray).toContain(newElement)
    expect(updatedArray.length).toEqual(3)
  })
})
