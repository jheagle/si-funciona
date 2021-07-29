'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.object.assign.js')

require('core-js/stable')

const _arrays = _interopRequireDefault(require('./helpers/arrays'))

const _descriptors = _interopRequireDefault(require('./helpers/descriptors'))

const _functions = _interopRequireDefault(require('./helpers/functions'))

const _numbers = _interopRequireDefault(require('./helpers/numbers'))

const _objects = _interopRequireDefault(require('./helpers/objects'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * All of the functionalHelpers system functions for stringing together functions and simplifying logic.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module functionalHelpers
 */

/**
 * Store a reference to this scope which will be Window if rendered via browser
 */
const root = void 0 || window || global || {}
/**
 * Store reference to any pre-existing module of the same name
 * @type {module|*}
 */

const previousFunctionalHelpers = root.functionalHelpers || {}
/**
 * All methods exported from this module are encapsulated within functionalHelpers.
 * @typedef {module:functionalHelpers|module:arrayHelpers|module:objectDescriptors|module:functionHelpers|module:numberHelpers|module:objectHelpers} functionalHelpers
 */

const functionalHelpers = {}
root.functionalHelpers = functionalHelpers
/**
 * Return a reference to this library while preserving the original same-named library
 * @function
 * @returns {functionalHelpers}
 */

const noConflict = function noConflict () {
  root.functionalHelpers = previousFunctionalHelpers
  return functionalHelpers
}

functionalHelpers.noConflict = noConflict

const _default = Object.assign(functionalHelpers, _arrays.default, _descriptors.default, _functions.default, _numbers.default, _objects.default)

exports.default = _default
