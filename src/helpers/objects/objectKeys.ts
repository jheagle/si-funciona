import 'core-js/stable'
import isObject from './isObject'

type keyableItem = Array<any> | {
  [k: number | string] : any
}

/**
 * Get an array of keys from any object or array. Will return empty array when invalid or there are no keys.
 * Optional flag will include the inherited keys from prototype chain when set.
 * @memberOf module:objectHelpers
 * @param {Object|Array} object
 * @param {boolean} [includeInherited=false]
 * @returns {Array.<string|number>}
 */
const objectKeys = (object: keyableItem, includeInherited: boolean = false): Array<any> => {
  if (typeof object !== 'function' && !isObject(object)) {
    return []
  }
  if (includeInherited) {
    const propNames = Object.getOwnPropertyNames(object)
    if (propNames.length) {
      return propNames
    }
  }
  const keys = []
  for (const key in object) {
    if (includeInherited || Object.prototype.hasOwnProperty.call(object, key)) {
      if (Array.isArray(object)) {
        keys.push(parseInt(key))
        continue
      }
      keys.push(key)
    }
  }
  return keys
}

export default objectKeys
