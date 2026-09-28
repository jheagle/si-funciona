
/**
 * Leverage buildArrayBase to generate an array filled with references to the provided item.
 * The length defines how long the array should be.
 * @param item - The item to be used for each array element
 * @param length - The desired length of the array
 */
const buildArrayOfReferences = (item: any, length: number): Array<any> => {
  const arr = []
  while (arr.length < length) {
    arr.push(item)
  }
  return arr
}

export default buildArrayOfReferences
