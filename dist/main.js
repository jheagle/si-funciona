'use strict'

require('core-js/modules/es.object.define-property.js')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.object.assign.js')

var _arrays = _interopRequireDefault(require('./helpers/arrays.js'))

var _descriptors = _interopRequireDefault(require('./helpers/descriptors.js'))

var _functions = _interopRequireDefault(require('./helpers/functions.js'))

var _numbers = _interopRequireDefault(require('./helpers/numbers.js'))

var _objects = _interopRequireDefault(require('./helpers/objects.js'))

var _strings = _interopRequireDefault(require('./helpers/strings.js'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * All of the functionalHelpers system functions for stringing together functions and simplifying logic.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module functionalHelpers
 */
var functionalHelpers = Object.assign({}, _arrays.default, _descriptors.default, _functions.default, _numbers.default, _objects.default, _strings.default)
var _default = functionalHelpers
exports.default = _default
var root = void 0 || typeof window !== 'undefined' ? window : {}
root.functionalHelpers = functionalHelpers
