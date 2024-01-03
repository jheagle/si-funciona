import 'core-js/stable'
import isObject from './isObject'
import objectKeys from './objectKeys'

/**
 * Helper function for testing if the item is an Object or Array that does not have any properties
 * @function
 * @memberOf module:objectHelpers
 * @param {Object|Array} item - Object or Array to test
 * @returns {boolean}
 */
const emptyObject = (item: Array<any> | Object): boolean => (typeof item === 'function' || isObject(item)) && !objectKeys(item).length

export default emptyObject
