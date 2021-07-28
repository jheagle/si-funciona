import 'core-js/stable'
import assignDescriptor from './assignDescriptor'
import checkClearValues from './checkClearValues'
import checkDescriptorComplete from './checkDescriptorComplete'
import compareDescriptor from './compareDescriptor'
import describeObject from './describeObject'
import nextReference from './nextReference'
import sameDescriptor from './sameDescriptor'

/**
 * Trace out the entire object including nested objects.
 * @function
 * @memberOf module:objectDescriptors
 * @param {Object|Array} object
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=1000000000]
 * @param {number} [options.depthLimit=-1]
 * @param {boolean} [options.keepValues=false]
 * @returns {module:objectDescriptors~descriptorMap}
 */
const describeObjectMap = (object, { mapLimit = 1000000000, depthLimit = -1, keepValues = false } = {}) => {
  const descriptorMap = [describeObject(object)]
  descriptorMap[0].index = 0
  const describeReferences = (descriptor, currentDetail, limit = -1, returnCallback = returnMap => returnMap) => {
    let index = descriptorMap.length
    const nextRef = currentDetail ? nextReference(descriptor, currentDetail.index) : undefined
    const nextDetail = (typeof nextRef !== 'undefined') ? descriptor.details[nextRef] : null
    if (currentDetail) {
      const vals = descriptor.isArray ? currentDetail.value : [currentDetail.value[currentDetail.value.length - 1]]
      vals.forEach(val => {
        const tempDescriptor = describeObject(val)
        const existingDescriptorIndex = descriptorMap.findIndex(existingDescriptor => compareDescriptor(tempDescriptor, existingDescriptor))
        if (existingDescriptorIndex >= 0) {
          index = existingDescriptorIndex
          if (tempDescriptor.length && sameDescriptor(tempDescriptor, descriptorMap[existingDescriptorIndex])) {
            currentDetail.circular = true
            descriptor.details[currentDetail.index] = currentDetail
          }
        }
        if (index >= mapLimit) {
          return descriptorMap
        }
        if (limit === 0) {
          return descriptorMap
        }
        if (tempDescriptor.isArray) {
          index = currentDetail.arrayReference ?? index
          descriptor.details[currentDetail.index].arrayReference = index
        } else {
          index = currentDetail.objectReference ?? index
          descriptor.details[currentDetail.index].objectReference = index
        }
        tempDescriptor.index = index
        if (existingDescriptorIndex < 0) {
          descriptorMap[index] = descriptorMap[index]
            ? assignDescriptor(descriptorMap[index], tempDescriptor)
            : tempDescriptor
        }
        descriptorMap[descriptor.index] = assignDescriptor(descriptorMap[descriptor.index], descriptor)
        currentDetail = descriptorMap[descriptor.index].details.find(
          detail => detail.key === currentDetail.key
        )
        if (!currentDetail.circular) {
          const newReference = nextReference(tempDescriptor, -1)
          const newDetail = (typeof newReference !== 'undefined') ? tempDescriptor.details[newReference] : null
          return describeReferences(tempDescriptor, newDetail, --limit, returnMap => describeReferences(descriptor, nextDetail, --limit)
          )
        }
      })
    }
    descriptorMap[descriptor.index] = assignDescriptor(
      descriptorMap[descriptor.index],
      checkDescriptorComplete(descriptor)
    )
    descriptorMap[descriptor.index] = checkClearValues(descriptorMap[descriptor.index], keepValues)
    return nextDetail
      ? describeReferences(descriptor, nextDetail, --limit)
      : returnCallback(descriptorMap)
  }
  const descriptor = descriptorMap[0]
  const currentReference = nextReference(descriptor, -1)
  if (typeof currentReference === 'undefined') {
    descriptorMap[0] = assignDescriptor(descriptorMap[0], checkDescriptorComplete(descriptor))
    descriptorMap[0] = checkClearValues(descriptorMap[0], keepValues)
    return descriptorMap
  }
  return describeReferences(descriptor, descriptor.details[currentReference], depthLimit)
}

export default describeObjectMap
