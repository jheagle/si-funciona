import 'core-js/stable'

/**
 * Split a string into sets of numbers or letters.
 * @function
 * @memberOf module:stringHelpers
 * @param {string} str
 * @returns {array}
 */
const words = str => str.match(/\d+|[A-Z]?[a-z]+|[A-Za-z]+/g)

export default words
