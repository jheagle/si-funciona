/**
 * All of the functionalHelpers system functions for stringing together functions and simplifying logic.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module functionalHelpers
 */

import 'core-js/stable'
import * as arrayHelpers from './helpers/arrays'
import * as cloneHelpers from './helpers/objects/cloneHelpers'
import * as descriptors from './helpers/objects/descriptors'
import * as functionHelpers from './helpers/functions'
import * as numberHelpers from './helpers/numbers'
import * as objectHelpers from './helpers/objects'

/**
   * Store a reference to this scope which will be Window if rendered via browser
   */
const root = this || window || global || {}

/**
   * Store reference to any pre-existing module of the same name
   * @type {module|*}
   */
const previousFunctionalHelpers = root.functionalHelpers || {}

/**
   * All methods exported from this module are encapsulated within functionalHelpers.
   * @typedef {module:functionalHelpers|module:arrayHelpers|module:functionHelpers|module:numberHelpers|module:objectHelpers} functionalHelpers
   */
const functionalHelpers = {}
root.functionalHelpers = functionalHelpers

/**
   * Return a reference to this library while preserving the original same-named library
   * @function
   * @returns {module:functionalHelpers~functionalHelpers}
   */
const noConflict = () => {
  root.functionalHelpers = previousFunctionalHelpers
  return functionalHelpers
}
functionalHelpers.noConflict = noConflict

export default Object.assign(
  functionalHelpers,
  arrayHelpers,
  cloneHelpers,
  descriptors,
  functionHelpers,
  numberHelpers,
  objectHelpers
)
