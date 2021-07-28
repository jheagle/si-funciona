import 'core-js/stable'
import objectKeys from './objectKeys'

/**
 * Get an array of values from any object or array. Will return empty array when invalid or there are no values.
 * Optional flag will include the inherited values from prototype chain when set.
 * @function
 * @memberOf module:objectHelpers
 * @param {Object|Array} object
 * @param {boolean} [includeInherited=false]
 * @returns {Array}
 */
const objectValues = (object, includeInherited = false) => objectKeys(object, includeInherited).map(key => object[key])

export default objectValues
