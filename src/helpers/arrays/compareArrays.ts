import isObject from '../objects/isObject'
import mergeArrays from './mergeArrays'
import objectKeys from '../objects/objectKeys'

export type compareArrayResult = {
  value: string,
  keys: Array<Array<number | string>>,
  result: Array<number>,
}

export type compareArrayResultMap = Array<compareArrayResult>

/**
 * Compare two Arrays and return the Object where the value for each property is as follows:
 * -1 to indicate val1 is less than val2
 * 0 to indicate both values are the equal
 * 1 to indicate val1 is greater than val2
 * The returned Object uses the element values as the property names
 * This functions works by first creating a concatenated array of all unique values. Then for each unique values,
 * convert to a string and use it as a new property name. Array filter each array checking if it has the unique value.
 * Use the lengths of these filtered arrays to compare. So if the first array has the value and the second one doesn't
 * the first length will be one or more and the second will be zero, if the both have the value then both will be one
 * or more.
 * @example
 * // example of input and resulting output
 * compareArrays(
 *   ['match1', 'firstMismatch1', 'match2', 'firstMismatch2', 'badMatch1'],
 *   ['match1', 'match2', 'secondMismatch1', 'badMatch1', 'badMatch1']
 * )
 * // unique array
 * ['match1', 'firstMismatch1', 'match2', 'firstMismatch2', 'badMatch1', 'secondMismatch1']
 * // result object
 * [
 *   {
 *     value: 'match1',
 *     keys: [[0], [0]],
 *     result: [0, 0]
 *   },
 *   {
 *     value: 'firstMismatch1',
 *     keys: [[1], []],
 *     result: [1, -1]
 *   },
 *   {
 *     value: 'match2',
 *     keys: [[2], [1]],
 *     result: [0, 0]
 *   },
 *   {
 *     value: 'firstMismatch2',
 *     keys: [[3], []],
 *     result: [1, -1]
 *   },
 *   {
 *     value: 'badMatch1',
 *     keys: [[4], [3, 4]],
 *     result: [0, 0]
 *   },
 *   {
 *     value: 'secondMismatch1',
 *     keys: [[], [2]],
 *     result: [-1, 1]
 *   }
 * ]
 *
 * @param arrays - The arrays to compare
 */
const compareArrays = (...arrays: Array<Array<any>>): compareArrayResultMap => mergeArrays(...arrays)
  .reduce(
    (results: any, attr: Array<any> | Object | any): Array<any> => {
      const attrType = typeof attr
      const useArray: boolean = Array.isArray(attr)
      const keys: Array<Array<any>> = arrays.map((array: Array<any>) => array.reduce((results: Array<any>, current: any, key: number): Array<any> => {
        const currentType = typeof current
        if (attrType !== currentType) {
          return results
        }
        if (!isObject(attr)) {
          return current === attr ? [...results, key] : results
        }
        if (useArray !== Array.isArray(current)) {
          return results
        }
        const compareKeys = useArray
          ? compareArrays(attr, current)
          : compareArrays(objectKeys(attr), objectKeys(current))
        return compareKeys.every((compare: compareArrayResult): boolean => compare.result.every((result: number): boolean => result === 0)) ? [...results, key] : results
      }, []))
      const arrayResults: (1 | -1)[] = keys.map((array: Array<any>): 1 | -1 => array.length ? 1 : -1)
      return [...results, {
        value: attr,
        keys: keys,
        result: arrayResults.every((result: 1 | -1): boolean => result === 1) ? arrayResults.map((result: 1 | -1): 0 => 0) : arrayResults
      }]
    },
    []
  )

export default compareArrays
