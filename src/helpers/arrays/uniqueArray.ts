
/**
 * Remove duplicate values from an array. uniqueArray
 * @param array - The array to make unique
 */
const uniqueArray = (array: Array<any>): Array<any> => array.filter((item: any, index: number) => array.indexOf(item) === index)

export default uniqueArray
