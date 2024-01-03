import 'core-js/stable'
import isObject from './isObject'
import strAfter from '../strings/strAfter'
import strBefore from '../strings/strBefore'
import { dotNotateableItem, dotNotationString } from './dotNotate'

/**
 * Unset a nested property value an object.
 * @function
 * @memberOf module:objectHelpers
 * @param {Object} arrayObject - The array or object to set the property on
 * @param {string} dotNotation - The path for the property
 * @returns {Object} The modified object
 */
const dotUnset = (arrayObject: dotNotateableItem, dotNotation: dotNotationString): dotNotateableItem => {
  let key: string = strBefore(dotNotation, '.')
  const lastKey: boolean = !key
  if (lastKey) {
    key = dotNotation
  }
  if (key === '*') {
    for (let wildKey in arrayObject) {
      if (lastKey) {
        // @ts-ignore
        delete arrayObject[wildKey]
        continue
      }
      // @ts-ignore
      if (!isObject(arrayObject[wildKey])) {
        continue
      }
      // @ts-ignore
      dotUnset(arrayObject[wildKey], strAfter(dotNotation, '.'))
    }
    return arrayObject
  }
  if (lastKey) {
    // @ts-ignore
    delete arrayObject[dotNotation]
    return arrayObject
  }
  // @ts-ignore
  const next: any = arrayObject[key] ?? []
  // @ts-ignore
  arrayObject[key] = dotUnset(next, strAfter(dotNotation, '.'))
  return arrayObject
}

export default dotUnset