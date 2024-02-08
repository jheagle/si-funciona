import 'core-js/stable'
import setValue from '../objects/setValue'
import { descriptor } from './samples/descriptor'
import { descriptorDetail } from './samples/descriptorDetail'

/**
 * Check if we should clear the values on this descriptor
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor
 * @param {boolean} [keepValues=false]
 * @returns {module:objectDescriptors~descriptor}
 */
const checkClearValues = (descriptor: descriptor, keepValues: boolean = false): descriptor => <descriptor>setValue(
  'details',
  (descriptor.complete && !keepValues)
    ? descriptor.details.map(
      (detail: descriptorDetail): descriptorDetail => <descriptorDetail>setValue('value', [], detail)
    )
    : descriptor.details,
  descriptor
)

export default checkClearValues
