import 'core-js/stable'
import assignDescriptor from './assignDescriptor'
import checkClearValues from './checkClearValues'
import checkDescriptorComplete from './checkDescriptorComplete'
import compareDescriptor from './compareDescriptor'
import describeObject, { describeableObject } from './describeObject'
import nextReference from './nextReference'
import sameDescriptor from './sameDescriptor'
import { descriptor } from './samples/descriptor'
import { descriptorDetail } from './samples/descriptorDetail'
import { descriptorMap } from './samples/descriptorMap'

type describeObjectMapOptions = { mapLimit?: number, depthLimit?: number, keepValues?: boolean }

/**
 * Trace out the entire object including nested objects, producing a flat descriptorMap - see the
 * {@link module:objectDescriptors} module description for what a descriptor represents and why it's flat. This is
 * the main entry point into this module: start here to describe a real object/array before comparing, merging, or
 * inspecting its structure with the other functions in this module.
 * @example
 * describeObjectMap({ name: 'example', tags: ['a', 'b'] })
 * // [
 * //   { index: 0, details: [...], length: 2, keys: ['name', 'tags'], references: [1], isArray: false, complete: true },
 * //   { index: 1, details: [...], length: 2, keys: [0], references: [], isArray: true, complete: true }
 * // ]
 * // descriptorMap[0] describes the top-level object; its 'tags' property is a reference (references: [1]) to
 * // descriptorMap[1], which separately describes that nested array. descriptorMap[1]'s own `length` (2) reflects
 * // the array's actual length, but `keys` has only one entry (0) since both elements share the same type
 * // ('string') and are described together by a single, representative descriptorDetail.
 * @memberOf module:objectDescriptors
 * @param {Object|Array} object - The real object or array to describe.
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=1000000000] - Stop describing further nested references once the map reaches
 * this many descriptors - a safety limit for extremely large or deeply-referenced structures.
 * @param {number} [options.depthLimit=-1] - How many levels of nested objects/arrays to describe; `-1` means no
 * limit, `0` describes only the top level, etc.
 * @param {boolean} [options.keepValues=false] - By default, each detail's actual values are cleared once its
 * descriptor is complete (to save memory) - set true to keep them.
 * @returns {module:objectDescriptors~descriptorMap}
 */
const describeObjectMap = (object: describeableObject, {
  mapLimit = 1000000000,
  depthLimit = -1,
  keepValues = false
}: describeObjectMapOptions = {}): descriptorMap => {
  const descriptorMap: descriptorMap = [describeObject(object)]
  descriptorMap[0].index = 0
  const describeReferences = (descriptor: descriptor, currentDetail: descriptorDetail | null, limit: number = -1, returnCallback = (returnMap: descriptorMap): descriptorMap => returnMap): descriptorMap => {
    let index: number = descriptorMap.length
    const nextRef: number = currentDetail ? nextReference(descriptor, currentDetail.index) : undefined
    const nextDetail: descriptorDetail = (typeof nextRef !== 'undefined') ? descriptor.details[nextRef] : null
    if (currentDetail) {
      const vals = descriptor.isArray ? currentDetail.value : [currentDetail.value[currentDetail.value.length - 1]]
      vals.forEach((val: any): descriptorMap => {
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
          const newReference: number = nextReference(tempDescriptor, -1)
          const newDetail: descriptorDetail | null = (typeof newReference !== 'undefined') ? tempDescriptor.details[newReference] : null
          return describeReferences(tempDescriptor, newDetail, --limit, (returnMap: descriptorMap): descriptorMap => describeReferences(descriptor, nextDetail, --limit)
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
  const descriptor: descriptor = descriptorMap[0]
  const currentReference: number = nextReference(descriptor, -1)
  if (typeof currentReference === 'undefined') {
    descriptorMap[0] = assignDescriptor(descriptorMap[0], checkDescriptorComplete(descriptor))
    descriptorMap[0] = checkClearValues(descriptorMap[0], keepValues)
    return descriptorMap
  }
  return describeReferences(descriptor, descriptor.details[currentReference], depthLimit)
}

export default describeObjectMap
