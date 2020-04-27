/**
 * @file All of the functionalHelpers system functions for stringing together functions and simplifying logic.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 */

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
   * @author Joshua Heagle <joshuaheagle@gmail.com>
   * @typedef {Object} functionalHelpers
   * @module functionalHelpers
   */
const functionalHelpers = {}
root.functionalHelpers = functionalHelpers

/**
   * Return a reference to this library while preserving the original same-named library
   * @function noConflict
   * @returns {functionalHelpers}
   */
functionalHelpers.noConflict = () => {
  root.functionalHelpers = previousFunctionalHelpers
  return functionalHelpers
}

Object.assign(
  functionalHelpers,
  arrayHelpers,
  functionHelpers,
  numberHelpers,
  objectHelpers
)
