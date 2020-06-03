/**
 * Some simple utility functions for generating arrays or performing work on arrays.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module arrayHelpers
 */

import 'core-js/stable'
import { curry } from './functions'
import { cloneObject } from './objects'

/**
 * Generate an array filled with a copy of the provided item or references to the provided item.
 * The length defines how long the array should be.
 * WARNING: This is a recursive function.
 * @param {boolean} useReference - Choose to multiply by clone or reference, true is by reference
 * @param {*} item - The item to be used for each array element
 * @param {number} length - The desired length of the array
 * @param {Array} [arr=[]] - The in-progress array of elements to be built and returned, will be used internally
 * @returns {Array.<*>}
 */
const buildArrayBase = (useReference, item, length, arr = []) => {
  item = useReference ? item : cloneObject(item)
  return --length > 0
    ? buildArrayBase(useReference, item, length, [...arr, item])
    : [...arr, item]
}

/**
 * Leverage buildArrayBase to generate an array filled with a copy of the provided item.
 * The length defines how long the array should be.
 * @function buildArray
 * @param {*} item - The item to be used for each array element
 * @param {number} length - The desired length of the array
 * @param {Array} [arr=[]] - The in-progress array of elements to be built and returned, will be used internally
 * @returns {Array.<*>}
 */
export const buildArray = curry(buildArrayBase)(false)

/**
 * Leverage buildArrayBase to generate an array filled with references to the provided item.
 * The length defines how long the array should be.
 * @function buildArrayOfReferences
 * @param {*} item - The item to be used for each array element
 * @param {number} length - The desired length of the array
 * @param {Array} [arr=[]] - The in-progress array of elements to be built and returned, will be used internally
 * @returns {Array.<*>}
 */
export const buildArrayOfReferences = curry(buildArrayBase)(true)

/**
 * Remove duplicate values from an array.
 * @function uniqueArray
 * @param {Array} array - The array to make unique
 * @returns {Array}
 */
export const uniqueArray = array => array.filter((item, index) => array.indexOf(item) === index)

/**
 * Take multiple arrays and then filter all these into one unique array.
 * @function uniqueArray
 * @param {...Array} arrays - Provide mulitple arrays to create one unique array
 * @returns {Array}
 */
export const mergeArrays = (...arrays) => arrays.map(uniqueArray).reduce(
  (merged, arr) => [...merged, ...arr.filter(attr => !merged.includes(attr))],
  []
)

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
 * arrayHelpers.compareArrays(
 *   ['match1', 'firstMismatch1', 'match2', 'firstMismatch2', 'badMatch1'],
 *   ['match1', 'match2', 'secondMismatch1', 'badMatch1', 'badMatch1']
 * )
 * // unique array
 * ['match1', 'firstMismatch1', 'match2', 'firstMismatch2', 'badMatch1', 'secondMismatch1']
 * // result object
 * [
 *   {
 *     value: 'match1',
 *     result: [0, 0]
 *   },
 *   {
 *     value: 'firstMismatch1',
 *     result: [1, -1]
 *   },
 *   {
 *     value: 'match2',
 *     result: [0, 0]
 *   },
 *   {
 *     value: 'firstMismatch2',
 *     result: [1, -1]
 *   },
 *   {
 *     value: 'badMatch1',
 *     result: [0, 0]
 *   },
 *   {
 *     value: 'secondMismatch1',
 *     result: [-1, 1]
 *   }
 * ]
 *
 * @function compareArrays
 * @param {Array} arr1 - The first array to compare
 * @param {Array} arr2 - The second array to compare
 * @returns {Object.<string, number>}
 */
export const compareArrays = (...arrays) => mergeArrays(...arrays)
  .reduce(
    (results, attr) => {
      const arrayResults = arrays.map(array => array.includes(attr) ? 1 : -1)
      return [...results, {
        value: attr,
        result: arrayResults.every(result => result === 1) ? arrayResults.map(result => 0) : arrayResults
      }]
    },
    []
  )
