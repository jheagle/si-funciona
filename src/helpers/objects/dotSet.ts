import isObject from './isObject'
import strAfter from '../strings/strAfter'
import strBefore from '../strings/strBefore'
import { dotNotateableItem, dotNotationString } from './dotNotate'

/**
 * Set a nested property value an object.
 * @param arrayObject - The array or object to set the property on
 * @param dotNotation - The path for the property
 * @param value - The default value to return if the property is not found
 * @returns The modified object
 */
const dotSet = (arrayObject: dotNotateableItem, dotNotation: dotNotationString, value: any = null): dotNotateableItem => {
  let key: string = strBefore(dotNotation, '.')
  const lastKey: boolean = !key
  if (lastKey) {
    key = dotNotation
  }
  if (key === '*') {
    for (const wildKey in arrayObject) {
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
  const rest: string = strAfter(dotNotation, '.')
  // A missing parent becomes an array only when the next key is an index (a.0), otherwise a plain object (a.b)
  // @ts-ignore
  const next: any = arrayObject[key] ?? (/^\d+$/.test(strBefore(rest, '.') || rest) ? [] : {})
  // @ts-ignore
  arrayObject[key] = dotSet(next, rest, value)
  return arrayObject
}

export default dotSet
