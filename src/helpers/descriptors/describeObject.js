import 'core-js/stable'
import assignDescriptorDetail from './assignDescriptorDetail'
import describeObjectDetail from './describeObjectDetail'
import objectKeys from '../objects/objectKeys'

/**
 * Trace an object and return the descriptor which defines the object's structure and attributes.
 * @function
 * @memberOf module:objectDescriptors
 * @param {Object} object
 * @returns {module:objectDescriptors~descriptor}
 */
const describeObject = object => {
  const descriptor = {
    index: 0,
    details: [],
    length: 0,
    keys: [],
    references: [],
    isArray: false,
    complete: false
  }
  const keys = objectKeys(object)
  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i]
    const newDetail = describeObjectDetail(object[key], key, descriptor.length++)
    if (typeof key === 'number' && descriptor.details.length) {
      descriptor.details[0] = assignDescriptorDetail(descriptor.details[0], newDetail)
      descriptor.keys = [0]
      if (newDetail.isReference) {
        descriptor.references = [0]
      }
      continue
    }
    descriptor.details.push(newDetail)
    descriptor.keys.push(newDetail.key)
    if (newDetail.isReference) {
      descriptor.references.push(newDetail.index)
    }
  }
  descriptor.isArray = Array.isArray(object)
  descriptor.complete = !descriptor.references.length
  return descriptor
}

export default describeObject
