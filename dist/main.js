'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
var _arrays = _interopRequireDefault(require('./helpers/arrays.js'))
var _descriptors = _interopRequireDefault(require('./helpers/descriptors.js'))
var _functions = _interopRequireDefault(require('./helpers/functions.js'))
var _numbers = _interopRequireDefault(require('./helpers/numbers.js'))
var _objects = _interopRequireDefault(require('./helpers/objects.js'))
var _strings = _interopRequireDefault(require('./helpers/strings.js'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * All of the siFunciona system functions for stringing together functions and simplifying logic.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module siFunciona
 */

const siFunciona = Object.assign({}, _arrays.default, _descriptors.default, _functions.default, _numbers.default, _objects.default, _strings.default)
var _default = siFunciona
exports.default = _default
const root = void 0 || typeof window !== 'undefined' ? window : {}
root.siFunciona = siFunciona
