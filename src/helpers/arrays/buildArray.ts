import cloneObject from '../objects/cloneObject'

/**
 * Leverage buildArrayBase to generate an array filled with a copy of the provided item.
 * The length defines how long the array should be.
 * @param item - The item to be used for each array element
 * @param length - The desired length of the array
 */
const buildArray = (item: any, length: number): Array<any> => {
  const arr = []
  while (arr.length < length) {
    const cloned = cloneObject(item)
    arr.push(cloned)
  }
  return arr
}

export default buildArray
