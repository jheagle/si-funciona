import isInstanceObject from './isInstanceObject'

/**
 * Determine if the value is a reference instance
 * @param value
 */
const isCloneable = (value: Array<any>|Object|any): boolean => typeof value === 'object' && value !== null && !isInstanceObject(value)

export default isCloneable
