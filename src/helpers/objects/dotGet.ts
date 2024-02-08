import 'core-js/stable'
import isObject from './isObject'
import strAfter from '../strings/strAfter'
import strBefore from '../strings/strBefore'
import { dotNotateableItem, dotNotationString } from './dotNotate'

/**
 * Get a nested property value from an object.
 * @memberOf module:objectHelpers
 * @param {Object} arrayObject - The array or object to get the property from
 * @param {string} dotNotation - The path to the property
 * @param {string|null} [defaultValue=null] - The default value to return if the property is not found
 * @returns {*} The value of the property
 */
const dotGet = (arrayObject: dotNotateableItem, dotNotation: dotNotationString, defaultValue: string | null = null): any => {
  let key: string = strBefore(dotNotation, '.')
  const lastKey: boolean = !key
  if (lastKey) {
    key = dotNotation
  }
  if (key === '*') {
    const result: Array<any> = []
    for (let wildKey in arrayObject) {
      // @ts-ignore
      const wildValue: any = arrayObject[wildKey]
      if (lastKey) {
        // @ts-ignore
        result[wildKey] = wildValue
        continue
      }
      if (!isObject(wildValue)) {
        continue
      }
      // @ts-ignore
      result[wildKey] = dotGet(wildValue, strAfter(dotNotation, '.'), defaultValue)
    }
    return result
  }
  if (lastKey) {
    // @ts-ignore
    return arrayObject[dotNotation] ?? defaultValue
  }
  // @ts-ignore
  if (typeof arrayObject[key] === 'undefined') {
    return defaultValue
  }
  // @ts-ignore
  const next: any = arrayObject[key]
  if (!isObject(next)) {
    return defaultValue
  }
  return dotGet(next, strAfter(dotNotation, '.'), defaultValue)
}

export default dotGet
