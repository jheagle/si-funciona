import 'core-js/stable'
import { descriptor } from './samples/descriptor'
import { descriptorDetail } from './samples/descriptorDetail'

/**
 * Check if the two descriptors are the same.
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor1
 * @param {module:objectDescriptors~descriptor} descriptor2
 * @returns {boolean}
 */
const sameDescriptor = (descriptor1: descriptor, descriptor2: descriptor): boolean => descriptor1.details.every((detail: descriptorDetail, index: number): boolean => detail.value.some(dVal => descriptor2.details[index].value.includes(dVal)))

export default sameDescriptor
