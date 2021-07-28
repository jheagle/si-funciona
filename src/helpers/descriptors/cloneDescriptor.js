import 'core-js/stable'
import cloneDescriptorDetail from './cloneDescriptorDetail'

/**
 * Make a copy of an object descriptor so that the original will not be mutated.
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} originalMap
 * @returns {module:objectDescriptors~descriptor}
 */
const cloneDescriptor = originalMap => {
  const copyMap = {}
  copyMap.index = originalMap.index || 0
  copyMap.details = originalMap.details.map(cloneDescriptorDetail)
  copyMap.length = originalMap.length
  copyMap.keys = originalMap.keys.map(key => key)
  copyMap.references = originalMap.references.map(reference => reference)
  copyMap.isArray = originalMap.isArray
  copyMap.complete = originalMap.complete
  return copyMap
}

export default cloneDescriptor
