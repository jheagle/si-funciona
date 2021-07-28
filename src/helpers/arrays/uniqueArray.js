import 'core-js/stable'

/**
 * Remove duplicate values from an array.
 * @function uniqueArray
 * @memberOf module:arrayHelpers
 * @param {Array} array - The array to make unique
 * @returns {Array}
 */
const uniqueArray = array => array.filter((item, index) => array.indexOf(item) === index)

export default uniqueArray
