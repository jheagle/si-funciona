import uniqueArray from './uniqueArray'

/**
 * Take multiple arrays and then filter all these into one unique array.
 * @param arrays - Provide multiple arrays to create one unique array
 */
const mergeArrays = (...arrays: Array<Array<any>>): Array<any> => arrays.map(uniqueArray).reduce(
  (merged: Array<any>, arr: Array<any>): Array<any> => [...merged, ...arr.filter((attr: any): boolean => !merged.includes(attr))],
  []
)

export default mergeArrays
