'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.object.assign.js')

const _arrays = _interopRequireDefault(require('./helpers/arrays.js'))

const _descriptors = _interopRequireDefault(require('./helpers/descriptors.js'))

const _functions = _interopRequireDefault(require('./helpers/functions.js'))

const _numbers = _interopRequireDefault(require('./helpers/numbers.js'))

const _objects = _interopRequireDefault(require('./helpers/objects.js'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * All of the functionalHelpers system functions for stringing together functions and simplifying logic.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module functionalHelpers
 */
const functionalHelpers = Object.assign({}, _arrays.default, _descriptors.default, _functions.default, _numbers.default, _objects.default)
const _default = functionalHelpers
exports.default = _default
const root = void 0 || typeof window !== 'undefined' ? window : {}
root.functionalHelpers = functionalHelpers
