import emptyObject from '../objects/emptyObject'
import isCloneable from '../objects/isCloneable'
import isInstanceObject from '../objects/isInstanceObject'
import { descriptorDetail } from './samples/descriptorDetail'

/**
 * Trace a single property's value and produce the descriptorDetail describing it (type, nullability, whether it
 * references a nested object/array, etc.) - the per-property building block used by
 * {@link module:objectDescriptors.describeObject}.
 * @memberOf module:objectDescriptors
 * @param {*} value - The property's value to describe.
 * @param {string|number} [key=0] - The property name (or array index) this value belongs to.
 * @param {number} [index=0] - This detail's intended position within its parent descriptor's `details` array.
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
