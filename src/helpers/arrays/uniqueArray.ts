import 'core-js/stable'

/**
 * Remove duplicate values from an array.
 * @function uniqueArray
 * @memberOf module:arrayHelpers
 * @param {Array} array - The array to make unique
 * @returns {Array}
 */
const uniqueArray = (array: Array<any>): Array<any> => array.filter((item: any, index: number) => array.indexOf(item) === index)

export default uniqueArray
