import 'core-js/stable'
import isObject from './isObject'
import strAfter from '../strings/strAfter'
import strBefore from '../strings/strBefore'

/**
 * Unset a nested property value an object.
 * @function
 * @memberOf module:objectHelpers
 * @param {Object} arrayObject - The array or object to set the property on
 * @param {string} dotNotation - The path for the property
 * @returns {Object} The modified object
 */
const dotUnset = (arrayObject, dotNotation) => {
  let key = strBefore(dotNotation, '.')
  const lastKey = !key
  if (lastKey) {
    key = dotNotation
  }
  if (key === '*') {
    for (let wildKey in arrayObject) {
      if (lastKey) {
        delete arrayObject[wildKey]
        continue
      }
      if (!isObject(arrayObject[wildKey])) {
        continue
      }
      dotUnset(arrayObject[wildKey], strAfter(dotNotation, '.'))
    }
    return arrayObject
  }
  if (lastKey) {
    delete arrayObject[dotNotation]
    return arrayObject
  }
  const next = arrayObject[key] ?? []
  arrayObject[key] = dotUnset(next, strAfter(dotNotation, '.'))
  return arrayObject
}

export default dotUnset