import 'core-js/stable'

/**
 * Check if the provided thing is an object / array.
 * @function
 * @memberOf module:objectHelpers
 * @param {*} object
 * @returns {boolean}
 */
const isObject = (object: any): boolean => typeof object === 'object' && object !== null

export default isObject
