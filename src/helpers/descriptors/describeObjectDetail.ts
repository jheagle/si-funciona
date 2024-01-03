import 'core-js/stable'
import emptyObject from '../objects/emptyObject'
import isCloneable from '../objects/isCloneable'
import isInstanceObject from '../objects/isInstanceObject'
import { descriptorDetail } from './samples/descriptorDetail'

/**
 * Trace an object's attribute and provide details about it.
 * @function
 * @memberOf module:objectDescriptors
 * @param {*} value
 * @param {string|number} [key=0]
 * @param {number} [index=0]
 * @returns {module:objectDescriptors~descriptorDetail}
 */
const describeObjectDetail = (value: any, key: number | string = 0, index: number = 0): descriptorDetail => {
  const type: string = (typeof value)
  return {
    index: index,
    key: key,
    type: [type],
    value: [value],
    nullable: value === null,
    optional: false,
    circular: false,
    isReference: isCloneable(value) && !emptyObject(value),
    isInstance: isInstanceObject(value),
    arrayReference: null,
    objectReference: null
  }
}

export default describeObjectDetail
