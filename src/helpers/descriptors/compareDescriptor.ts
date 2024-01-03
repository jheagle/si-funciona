import 'core-js/stable'
import { descriptor } from './samples/descriptor'
import { descriptorDetail } from './samples/descriptorDetail'

/**
 * Check if two descriptors are the same or similar in that they have similar keys and the associated types are the same.
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor1
 * @param {module:objectDescriptors~descriptor} descriptor2
 * @returns {boolean}
 */
const compareDescriptor = (descriptor1: descriptor, descriptor2: descriptor): boolean => {
  if (descriptor1.isArray !== descriptor2.isArray) {
    return false
  }
  if (descriptor1.length === 0 || descriptor2.length === 0) {
    return descriptor1.length === descriptor2.length
  }
  const smallerDescriptor: descriptor = descriptor1.length <= descriptor2.length ? descriptor1 : descriptor2
  const largerDescriptor: descriptor = descriptor2.length >= descriptor1.length ? descriptor2 : descriptor1
  return smallerDescriptor.keys.every((key: number | string): boolean => largerDescriptor.keys.includes(key))
    ? smallerDescriptor.details.every((detail: descriptorDetail): boolean => detail.type.some((type: string): boolean => largerDescriptor.details.find((foundDetail: descriptorDetail): boolean => foundDetail.key === detail.key).type.includes(type)))
    : false
}

export default compareDescriptor
