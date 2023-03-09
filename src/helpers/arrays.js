/**
 * Some simple utility functions for generating arrays or performing work on arrays.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module arrayHelpers
 * @memberOf module:siFunciona
 */

import 'core-js/stable'
import addUniqueToArray from './arrays/addUniqueToArray.js'
import buildArray from './arrays/buildArray.js'
import buildArrayOfReferences from './arrays/buildArrayOfReferences.js'
import compareArrays from './arrays/compareArrays.js'
import mergeArrays from './arrays/mergeArrays.js'
import uniqueArray from './arrays/uniqueArray.js'

export default {
  addUniqueToArray,
  buildArray,
  buildArrayOfReferences,
  compareArrays,
  mergeArrays,
  uniqueArray
}
