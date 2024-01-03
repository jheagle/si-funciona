import 'core-js/stable'
import objectKeys from './objectKeys'

type arrayObjectItem = Array<any> | {
  [k: number | string]: any
}

/**
 * Get an array of values from any object or array. Will return empty array when invalid or there are no values.
 * Optional flag will include the inherited values from prototype chain when set.
 * @function
 * @memberOf module:objectHelpers
 * @param {Object|Array} object
 * @param {boolean} [includeInherited=false]
 * @returns {Array}
 */
const objectValues = (object: arrayObjectItem, includeInherited: boolean = false): Array<any> => objectKeys(object, includeInherited).map((key: keyof arrayObjectItem): any => object[key])

export default objectValues
