import 'core-js/stable'
import assignDescriptorDetail from './assignDescriptorDetail'
import cloneDescriptor from './cloneDescriptor'
import compareArrays, { compareArrayResult, compareArrayResultMap } from '../arrays/compareArrays'
import uniqueArray from '../arrays/uniqueArray'
import { descriptor } from './samples/descriptor'
import { descriptorDetail } from './samples/descriptorDetail'

/**
 * Apply one or more descriptors to an existing descriptor so that they represent a merged version of the descriptors.
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} originalMap
 * @param  {...module:objectDescriptors~descriptor} descriptors
 * @returns {module:objectDescriptors~descriptor}
 */
const assignDescriptor = (originalMap: descriptor, ...descriptors: Array<descriptor>): descriptor => descriptors.reduce(
  (assignedDescriptor: descriptor, descriptor: descriptor): descriptor => {
    const detailsDiff: compareArrayResultMap = compareArrays(assignedDescriptor.keys, descriptor.keys)
    detailsDiff.forEach((diff: compareArrayResult): descriptor => {
      const existingDetail: descriptorDetail = assignedDescriptor.details.find((detail: descriptorDetail): boolean => detail.key === diff.value)
      const newDetail: descriptorDetail = descriptor.details.find((detail: descriptorDetail): boolean => detail.key === diff.value)
      if (diff.result.every((result: number): boolean => result === 0)) {
        assignedDescriptor.details[existingDetail.index] = assignDescriptorDetail(existingDetail, newDetail)
        return assignedDescriptor
      }
      const useDetail: descriptorDetail = diff.result[0] > 0 ? existingDetail : newDetail
      if (!useDetail) {
        assignedDescriptor.details[existingDetail.index].optional = true
        return assignedDescriptor
      }
      const useIndex: number = diff.result[0] > 0 ? useDetail.index : assignedDescriptor.length
      assignedDescriptor.details[useIndex] = Object.assign({}, useDetail, {
        index: useIndex,
        optional: true
      })
      assignedDescriptor.length = assignedDescriptor.length < assignedDescriptor.details.length
        ? assignedDescriptor.details.length
        : assignedDescriptor.length
      return assignedDescriptor
    })
    assignedDescriptor.keys = uniqueArray(assignedDescriptor.details.map(detail => detail.key))
    assignedDescriptor.references = uniqueArray(assignedDescriptor.details.filter(detail => detail.isReference).map(detail => detail.index))
    assignedDescriptor.isArray = assignedDescriptor.length
      ? assignedDescriptor.details.every(detail => (typeof detail.key === 'number'))
      : assignedDescriptor.isArray
    assignedDescriptor.complete = !assignedDescriptor.references.length || assignedDescriptor.complete || descriptor.complete
    return assignedDescriptor
  },
  cloneDescriptor(originalMap)
)

export default assignDescriptor
