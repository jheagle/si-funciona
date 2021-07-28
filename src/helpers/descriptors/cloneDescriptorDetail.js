import 'core-js/stable'
import objectKeys from '../objects/objectKeys'

/**
 * Get a new copy of an existing Descriptor Detail
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptorDetail} originalDetail
 * @returns {module:objectDescriptors~descriptorDetail}
 */
const cloneDescriptorDetail = originalDetail => {
  const copyDetail = {}
  objectKeys(originalDetail).forEach(key => {
    copyDetail[key] = Array.isArray(originalDetail[key])
      ? originalDetail[key].map(value => value)
      : originalDetail[key]
  })
  return copyDetail
}

export default cloneDescriptorDetail
