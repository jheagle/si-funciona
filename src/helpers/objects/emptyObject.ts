import isObject from './isObject'
import objectKeys from './objectKeys'

/**
 * Helper function for testing if the item is an Object or Array that does not have any properties
 * @param item - Object or Array to test
 */
const emptyObject = (item: Array<any> | Object): boolean => (typeof item === 'function' || isObject(item)) && !objectKeys(item).length

export default emptyObject
