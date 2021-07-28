import 'core-js/stable'
import emptyObject from '../objects/emptyObject'
import isCloneable from '../objects/isCloneable'
import isInstanceObject from '../objects/isInstanceObject'

/**
 * Trace an object's attribute and provide details about it.
 * @function
 * @memberOf module:objectDescriptors
 * @param {*} value
 * @param {string|number} [key=0]
 * @param {number} [index=0]
 * @returns {module:objectDescriptors~descriptorDetail}
 */
const describeObjectDetail = (value, key = 0, index = 0) => {
  const type = (typeof value)
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
