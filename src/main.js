/**
 * All of the functionalHelpers system functions for stringing together functions and simplifying logic.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module functionalHelpers
 */

import arrayHelpers from './helpers/arrays.js'
import descriptors from './helpers/descriptors.js'
import functionHelpers from './helpers/functions.js'
import numberHelpers from './helpers/numbers.js'
import objectHelpers from './helpers/objects.js'
import stringHelpers from './helpers/strings.js'

const functionalHelpers = Object.assign(
  {},
  arrayHelpers,
  descriptors,
  functionHelpers,
  numberHelpers,
  objectHelpers,
  stringHelpers
)

export default functionalHelpers

const root = this || (typeof window !== 'undefined') ? window : {}
root['functionalHelpers'] = functionalHelpers