import 'core-js/stable'
import uniqueArray from './uniqueArray'

/**
 * Take multiple arrays and then filter all these into one unique array.
 * @function
 * @memberOf module:arrayHelpers
 * @param {...Array} arrays - Provide multiple arrays to create one unique array
 * @returns {Array}
 */
const mergeArrays = (...arrays: Array<Array<any>>): Array<any> => arrays.map(uniqueArray).reduce(
  (merged: Array<any>, arr: Array<any>): Array<any> => [...merged, ...arr.filter((attr: any): boolean => !merged.includes(attr))],
  []
)

export default mergeArrays
