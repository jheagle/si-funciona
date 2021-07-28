import 'core-js/stable'

/**
 * Leverage buildArrayBase to generate an array filled with references to the provided item.
 * The length defines how long the array should be.
 * @function
 * @memberOf module:arrayHelpers
 * @param {*} item - The item to be used for each array element
 * @param {number} length - The desired length of the array
 * @returns {Array.<*>}
 */
const buildArrayOfReferences = (item, length) => {
  const arr = []
  while (arr.length < length) {
    arr.push(item)
  }
  return arr
}

export default buildArrayOfReferences
