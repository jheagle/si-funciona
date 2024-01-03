import 'core-js/stable'

/**
 * Having an array and a potential new array element, check if the element is in the array, if not append to array.
 * @function
 * @memberOf module:arrayHelpers
 * @param {*} item - An potential array element, possibly a DomItem
 * @param {Array} array - An array where an element may be appended.
 * @returns {Array}
 */
const addUniqueToArray = (item: any, array: Array<any>): Array<any> => !array.includes(item) ? array.concat([item]) : array

export default addUniqueToArray
