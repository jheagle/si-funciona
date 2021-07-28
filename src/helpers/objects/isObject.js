import 'core-js/stable'

/**
 * Check if the provided thing is an object.
 * @function
 * @memberOf module:objectHelpers
 * @param {*} object
 * @returns {boolean}
 */
const isObject = object => typeof object === 'object' && object !== null

export default isObject
