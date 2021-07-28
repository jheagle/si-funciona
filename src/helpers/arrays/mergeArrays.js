import 'core-js/stable'
import uniqueArray from './uniqueArray'

/**
 * Take multiple arrays and then filter all these into one unique array.
 * @function
 * @memberOf module:arrayHelpers
 * @param {...Array} arrays - Provide multiple arrays to create one unique array
 * @returns {Array}
 */
const mergeArrays = (...arrays) => arrays.map(uniqueArray).reduce(
  (merged, arr) => [...merged, ...arr.filter(attr => !merged.includes(attr))],
  []
)

export default mergeArrays
