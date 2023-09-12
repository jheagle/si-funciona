/**
 * Create a format to standardize every object into a specific template.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module objectDescriptors
 * @memberOf module:siFunciona
 */

import 'core-js/stable'
import assignDescriptor from './descriptors/assignDescriptor'
import assignDescriptorDetail from './descriptors/assignDescriptorDetail'
import checkClearValues from './descriptors/checkClearValues'
import checkDescriptorComplete from './descriptors/checkDescriptorComplete'
import cloneDescriptor from './descriptors/cloneDescriptor'
import cloneDescriptorDetail from './descriptors/cloneDescriptorDetail'
import compareDescriptor from './descriptors/compareDescriptor'
import describeObject from './descriptors/describeObject'
import describeObjectMap from './descriptors/describeObjectMap'
import describeObjectDetail from './descriptors/describeObjectDetail'
import nextReference from './descriptors/nextReference'
import sameDescriptor from './descriptors/sameDescriptor'

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
