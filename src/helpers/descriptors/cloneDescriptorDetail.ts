import 'core-js/stable'
import objectKeys from '../objects/objectKeys'
import { descriptorDetail } from './samples/descriptorDetail'

/**
 * Get a new copy of an existing descriptor detail so that the original will not be mutated.
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptorDetail} originalDetail - The detail to copy.
 * @returns {module:objectDescriptors~descriptorDetail} A new, independent copy.
 */
const cloneDescriptorDetail = (originalDetail: descriptorDetail): descriptorDetail => {
  const copyDetail: descriptorDetail | {} = {}
  objectKeys(originalDetail).forEach((key: string): void => {
    // @ts-ignore
    copyDetail[key] = Array.isArray(originalDetail[key]) ? originalDetail[key].map((value: any): any => value) : originalDetail[key]
  })
  return <descriptorDetail>copyDetail
}

export default cloneDescriptorDetail
