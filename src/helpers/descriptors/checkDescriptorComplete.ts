import 'core-js/stable'
import setValue from '../objects/setValue'
import { descriptor } from './samples/descriptor'

/**
 * Check if the descriptors references have all been built and set complete to true if they have.
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor
 * @returns {module:objectDescriptors~descriptor}
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
