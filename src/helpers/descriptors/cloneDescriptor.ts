import 'core-js/stable'
import cloneDescriptorDetail from './cloneDescriptorDetail'
import { descriptor } from './samples/descriptor'

/**
 * Make a copy of an object descriptor so that the original will not be mutated.
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} originalMap
 * @returns {module:objectDescriptors~descriptor}
 */
const cloneDescriptor = (originalMap: descriptor): descriptor => {
  const copyMap: descriptor | {} = {}
  // @ts-ignore
  copyMap['index'] = originalMap.index || 0
  // @ts-ignore
  copyMap['details'] = originalMap.details.map(cloneDescriptorDetail)
  // @ts-ignore
  copyMap['length'] = originalMap.length
  // @ts-ignore
  copyMap['keys'] = originalMap.keys.map(key => key)
  // @ts-ignore
  copyMap['references'] = originalMap.references.map(reference => reference)
  // @ts-ignore
  copyMap['isArray'] = originalMap.isArray
  // @ts-ignore
  copyMap['complete'] = originalMap.complete
  return <descriptor>copyMap
}

export default cloneDescriptor
