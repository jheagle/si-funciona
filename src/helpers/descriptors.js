/**
 * Create a format to standardize every object into a specific template.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module objectDescriptors
 * @memberOf module:siFunciona
 */

import 'core-js/stable'
import assignDescriptor from './descriptors/assignDescriptor.js'
import assignDescriptorDetail from './descriptors/assignDescriptorDetail.js'
import checkClearValues from './descriptors/checkClearValues.js'
import checkDescriptorComplete from './descriptors/checkDescriptorComplete.js'
import cloneDescriptor from './descriptors/cloneDescriptor.js'
import cloneDescriptorDetail from './descriptors/cloneDescriptorDetail.js'
import compareDescriptor from './descriptors/compareDescriptor.js'
import describeObject from './descriptors/describeObject.js'
import describeObjectMap from './descriptors/describeObjectMap.js'
import describeObjectDetail from './descriptors/describeObjectDetail.js'
import nextReference from './descriptors/nextReference.js'
import sameDescriptor from './descriptors/sameDescriptor.js'

export default {
  assignDescriptor,
  assignDescriptorDetail,
  checkClearValues,
  checkDescriptorComplete,
  cloneDescriptor,
  cloneDescriptorDetail,
  compareDescriptor,
  describeObject,
  describeObjectMap,
  describeObjectDetail,
  nextReference,
  sameDescriptor
}
