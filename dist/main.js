'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

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
const _default = {
  arrayHelpers: _arrays.default,
  descriptors: _descriptors.default,
  functionHelpers: _functions.default,
  numberHelpers: _numbers.default,
  objectHelpers: _objects.default
}
exports.default = _default
