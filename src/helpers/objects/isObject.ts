
/**
 * Check if the provided thing is an object / array.
 * @param object
 */
const isObject = (object: any): boolean => typeof object === 'object' && object !== null

export default isObject
