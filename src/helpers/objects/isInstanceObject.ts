import 'core-js/stable'
import isObject from './isObject'
import objectKeys from './objectKeys'

/**
 * Check if the current object has inherited properties.
 * @function
 * @memberOf module:objectHelpers
 * @param {Object|Array} object
 * @returns {boolean}
 */
const isInstanceObject = (object: Array<any> | Object): boolean => {
  if (typeof object !== 'function' && !isObject(object)) {
    return false
  }
  if (!['Array', 'Function', 'Object'].includes(object.constructor.name)) {
    return true
  }
  return object.constructor.name !== 'Array' && objectKeys(object, true).length > objectKeys(object).length
}

export default isInstanceObject
