import 'core-js/stable'
import cloneObject from '../objects/cloneObject'

/**
 * Leverage buildArrayBase to generate an array filled with a copy of the provided item.
 * The length defines how long the array should be.
 * @memberOf module:arrayHelpers
 * @param {*} item - The item to be used for each array element
 * @param {number} length - The desired length of the array
 * @returns {Array.<*>}
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
