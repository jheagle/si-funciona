import 'core-js/stable'
import isObject from './isObject'
import strAfter from '../strings/strAfter'
import strBefore from '../strings/strBefore'

/**
 * Get a nested property value from an object.
 * @function
 * @memberOf module:objectHelpers
 * @param {Object} arrayObject - The array or object to get the property from
 * @param {string} dotNotation - The path to the property
 * @param {string|null} [defaultValue=null] - The default value to return if the property is not found
 * @returns {*} The value of the property
 */
const dotGet = (arrayObject, dotNotation, defaultValue = null) => {
  let key = strBefore(dotNotation, '.')
  const lastKey = !key
  if (lastKey) {
    key = dotNotation
  }
  if (key === '*') {
    const result = []
    for (let wildKey in arrayObject) {
      const wildValue = arrayObject[wildKey]
      if (lastKey) {
        result[wildKey] = wildValue
        continue
      }
      if (!isObject(wildValue)) {
        continue
      }
      result[wildKey] = dotGet(wildValue, strAfter(dotNotation, '.'), defaultValue)
    }
    return result
  }
  if (lastKey) {
    return arrayObject[dotNotation] ?? defaultValue
  }
  if (typeof arrayObject[key] === 'undefined') {
    return defaultValue
  }
  const next = arrayObject[key]
  if (!isObject(next)) {
    return defaultValue
  }
  return dotGet(next, strAfter(dotNotation, '.'), defaultValue)
}

export default dotGet
