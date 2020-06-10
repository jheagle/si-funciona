/**
 * All of the functionalHelpers system functions for stringing together functions and simplifying logic.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module functionalHelpers
 */

import 'core-js/stable'
import * as arrayHelpers from './helpers/arrays'
import * as functionHelpers from './helpers/functions'
import * as numberHelpers from './helpers/numbers'
import * as objectHelpers from './helpers/objects'

/**
   * Store a reference to this scope which will be Window if rendered via browser
   */
const root = this || {}

/**
   * Store reference to any pre-existing module of the same name
   * @type {module|*}
   */
const previousFunctionalHelpers = root.functionalHelpers || {}

/**
   * All methods exported from this module are encapsulated within functionalHelpers.
   * @typedef {Object} functionalHelpers
   */
const functionalHelpers = {}
root.functionalHelpers = functionalHelpers

/**
   * Return a reference to this library while preserving the original same-named library
   * @returns {functionalHelpers}
   */
functionalHelpers.noConflict = () => {
  root.functionalHelpers = previousFunctionalHelpers
  return functionalHelpers
}

export default Object.assign(
  functionalHelpers,
  arrayHelpers,
  functionHelpers,
  numberHelpers,
  objectHelpers
)