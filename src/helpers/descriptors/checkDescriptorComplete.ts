import 'core-js/stable'
import setValue from '../objects/setValue'
import { descriptor } from './samples/descriptor'

/**
 * Check if every property this descriptor references (i.e. every nested object/array it points to) has actually
 * had its own descriptor built yet, and set the descriptor's `complete` flag to true if so.
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor - The descriptor to check.
 * @returns {module:objectDescriptors~descriptor} The same descriptor, with `complete` updated.
 */
const checkDescriptorComplete = (descriptor: descriptor): descriptor => <descriptor>setValue(
  'complete',
  descriptor.references
    .every(
      (refId: number): boolean => [
        descriptor.details[refId].arrayReference,
        descriptor.details[refId].objectReference
      ].some((ref: number): boolean => typeof ref === 'number')
    ),
  descriptor
)

export default checkDescriptorComplete
