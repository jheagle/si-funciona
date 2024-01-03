/**
 * Some simple utility functions for generating arrays or performing work on arrays.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module arrayHelpers
 * @memberOf module:siFunciona
 */

import 'core-js/stable'
import addUniqueToArray from './arrays/addUniqueToArray'
import BasicQueue from './arrays/BasicQueue'
import buildArray from './arrays/buildArray'
import buildArrayOfReferences from './arrays/buildArrayOfReferences'
import compareArrays from './arrays/compareArrays'
import mergeArrays from './arrays/mergeArrays'
import uniqueArray from './arrays/uniqueArray'

export default {
  addUniqueToArray,
  BasicQueue,
  buildArray,
  buildArrayOfReferences,
  compareArrays,
  mergeArrays,
  uniqueArray
}
