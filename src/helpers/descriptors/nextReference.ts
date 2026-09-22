import objectKeys from '../objects/objectKeys'
import { descriptor } from './samples/descriptor'

/**
 * Find the index (within `descriptor.details`) of the next referenced property - after `currentReference` - whose
 * own nested object/array still needs its descriptor built. Used to walk through a descriptor's references one at
 * a time while building out a descriptorMap.
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor - The descriptor whose references to search.
 * @param {number} currentReference - The `details` index already processed - search continues after this one.
 * @returns {number|undefined} The next detail index to process, or `undefined` if none remain.
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
