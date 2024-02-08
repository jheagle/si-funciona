import 'core-js/stable'
import isObject from './isObject'
import strAfter from '../strings/strAfter'
import strBefore from '../strings/strBefore'
import { dotNotateableItem, dotNotationString } from './dotNotate'

/**
 * Set a nested property value an object.
 * @memberOf module:objectHelpers
 * @param {Object} arrayObject - The array or object to set the property on
 * @param {string} dotNotation - The path for the property
 * @param {*} value - The default value to return if the property is not found
 * @returns {Object} The modified object
 */
const dotSet = (arrayObject: dotNotateableItem, dotNotation: dotNotationString, value: any = null): dotNotateableItem => {
  let key: string = strBefore(dotNotation, '.')
  const lastKey: boolean = !key
  if (lastKey) {
    key = dotNotation
  }
  if (key === '*') {
    for (let wildKey in arrayObject) {
      if (lastKey) {
        // @ts-ignore
        arrayObject[wildKey] = value
        continue
      }
      // @ts-ignore
      if (!isObject(arrayObject[wildKey])) {
        continue
      }
      // @ts-ignore
      dotSet(arrayObject[wildKey], strAfter(dotNotation, '.'), value)
    }
    return arrayObject
  }
  if (lastKey) {
    // @ts-ignore
    arrayObject[dotNotation] = value
    return arrayObject
  }
  // @ts-ignore
  const next: any = arrayObject[key] ?? []
  // @ts-ignore
  arrayObject[key] = dotSet(next, strAfter(dotNotation, '.'), value)
  return arrayObject
}

export default dotSet