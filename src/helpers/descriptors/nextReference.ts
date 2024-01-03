import 'core-js/stable'
import objectKeys from '../objects/objectKeys'
import { descriptor } from './samples/descriptor'

/**
 * Find the index of the next module:objectDescriptors.descriptorDetail to build a resource for.
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor
 * @param {number} currentReference
 * @returns {number|undefined}
 */
const nextReference = (descriptor: descriptor, currentReference: number): number | undefined => descriptor.references.find(
  (nextRef: number): boolean => {
    if (nextRef <= currentReference) {
      return false
    }
    const val: any = descriptor.details[nextRef].value[descriptor.details[nextRef].value.length - 1]
    if (typeof val !== 'object' || val === null || typeof val === 'undefined' || descriptor.details[nextRef].circular || descriptor.details[nextRef].isInstance) {
      return false
    }
    return !!objectKeys(val).length
  }
)

export default nextReference
