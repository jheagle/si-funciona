import 'core-js/stable'

/**
 * Given a string, make the first character uppercase and the rest lowercase.
 * @function
 * @memberOf module:stringHelpers
 * @param {string} str
 * @returns {string}
 */
const ucFirst = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

export default ucFirst
