import 'core-js/stable'
import setValue from '../objects/setValue'

/**
 * Check if the descriptors references have all been built and set complete to true if they have.
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor
 * @returns {module:objectDescriptors~descriptor}
 */
const checkDescriptorComplete = (descriptor) => setValue(
  'complete',
  descriptor.references
    .every(
      refId => [
        descriptor.details[refId].arrayReference,
        descriptor.details[refId].objectReference
      ].some(ref => typeof ref === 'number')
    ),
  descriptor
)

export default checkDescriptorComplete
