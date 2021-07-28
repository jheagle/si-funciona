/**
 * Some simple utility functions for generating arrays or performing work on arrays.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module arrayHelpers
 * @memberOf module:functionalHelpers
 */

import 'core-js/stable'
import buildArray from './arrays/buildArray'
import buildArrayOfReferences from './arrays/buildArrayOfReferences'
import compareArrays from './arrays/compareArrays'
import mergeArrays from './arrays/mergeArrays'
import uniqueArray from './arrays/uniqueArray'

export default {
  buildArray,
  buildArrayOfReferences,
  compareArrays,
  mergeArrays,
  uniqueArray
}
