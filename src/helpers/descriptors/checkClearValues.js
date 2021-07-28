import 'core-js/stable'
import setValue from '../objects/setValue'

/**
 * Check if we should clear the values on this descriptor
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor
 * @param {boolean} [keepValues=false]
 * @returns {module:objectDescriptors~descriptor}
 */
const checkClearValues = (descriptor, keepValues = false) => setValue(
  'details',
  (descriptor.complete && !keepValues)
    ? descriptor.details.map(
      detail => setValue('value', [], detail)
    )
    : descriptor.details,
  descriptor
)

export default checkClearValues
