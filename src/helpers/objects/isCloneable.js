import 'core-js/stable'
import isInstanceObject from './isInstanceObject'

/**
 * Determine if the value is a reference instance
 * @function
 * @memberOf module:objectHelpers
 * @param {Array|Object|*} value
 * @returns {boolean}
 */
const isCloneable = value => typeof value === 'object' && value !== null && !isInstanceObject(value)

export default isCloneable
