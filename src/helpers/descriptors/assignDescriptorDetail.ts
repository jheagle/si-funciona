import 'core-js/stable'
import cloneDescriptorDetail from './cloneDescriptorDetail'
import uniqueArray from '../arrays/uniqueArray'
import { descriptorDetail } from './samples/descriptorDetail'

/**
 * Assign properties from other details onto an existing detail.
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptorDetail} originalDetail
 * @param  {...module:objectDescriptors~descriptorDetail} details
 * @returns {module:objectDescriptors~descriptorDetail}
 */
const assignDescriptorDetail = (originalDetail: descriptorDetail, ...details: Array<descriptorDetail>): descriptorDetail => details.reduce(
  (existingDetail, newDetail) => {
    existingDetail.type = uniqueArray([...existingDetail.type, ...newDetail.type])
    existingDetail.value = uniqueArray([...existingDetail.value, ...newDetail.value])
    existingDetail.nullable = existingDetail.nullable || newDetail.nullable
    existingDetail.optional = existingDetail.optional || newDetail.optional
    existingDetail.circular = existingDetail.circular || newDetail.circular
    existingDetail.isReference = existingDetail.isReference || newDetail.isReference
    existingDetail.isInstance = existingDetail.isInstance || newDetail.isInstance
    existingDetail.arrayReference = [existingDetail.arrayReference, newDetail.arrayReference].find(ref => typeof ref === 'number')
    existingDetail.objectReference = [existingDetail.objectReference, newDetail.objectReference].find(ref => typeof ref === 'number')
    existingDetail.arrayReference = (typeof existingDetail.arrayReference === 'undefined')
      ? null
      : existingDetail.arrayReference
    existingDetail.objectReference = (typeof existingDetail.objectReference === 'undefined')
      ? null
      : existingDetail.objectReference
    return existingDetail
  }, cloneDescriptorDetail(originalDetail))

export default assignDescriptorDetail
