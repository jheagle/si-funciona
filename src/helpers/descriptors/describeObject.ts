import assignDescriptorDetail from './assignDescriptorDetail'
import describeObjectDetail from './describeObjectDetail'
import objectKeys from '../objects/objectKeys'
import { descriptor } from './samples/descriptor'
import { descriptorDetail } from './samples/descriptorDetail'

export type describeableObject = Array<any> | {
  [k: number | string]: any
}

/**
 * Trace a single object or array (not its nested objects/arrays - see
 * {@link module:objectDescriptors.describeObjectMap} for that) and return the descriptor which defines its own
 * structure and attributes.
 * @memberOf module:objectDescriptors
 * @param {Object|Array} object - The object or array to describe.
 * @returns {module:objectDescriptors~descriptor}
 */
const describeObject = (object: describeableObject): descriptor => {
  const descriptor: descriptor = {
    index: 0,
    details: [],
    length: 0,
    keys: [],
    references: [],
    isArray: false,
    complete: false
  }
  const keys: Array<number | string> = objectKeys(object)
  for (let i = 0; i < keys.length; ++i) {
    const key: number | string = keys[i]
    // @ts-ignore
    const newDetail: descriptorDetail = describeObjectDetail(object[key], key, descriptor.length++)
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
