'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _camelCase = _interopRequireDefault(require('./strings/camelCase.js'))
var _kabobCase = _interopRequireDefault(require('./strings/kabobCase.js'))
var _snakeCase = _interopRequireDefault(require('./strings/snakeCase.js'))
var _strAfter = _interopRequireDefault(require('./strings/strAfter.js'))
var _strAfterLast = _interopRequireDefault(require('./strings/strAfterLast.js'))
var _strBefore = _interopRequireDefault(require('./strings/strBefore.js'))
var _strBeforeLast = _interopRequireDefault(require('./strings/strBeforeLast.js'))
var _titleCase = _interopRequireDefault(require('./strings/titleCase.js'))
var _ucFirst = _interopRequireDefault(require('./strings/ucFirst.js'))
var _words = _interopRequireDefault(require('./strings/words.js'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Manage how strings are manipulated with these utilities.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module stringHelpers
 * @memberOf module:siFunciona
 */
var _default = {
  camelCase: _camelCase.default,
  kabobCase: _kabobCase.default,
  snakeCase: _snakeCase.default,
  strAfter: _strAfter.default,
  strAfterLast: _strAfterLast.default,
  strBefore: _strBefore.default,
  strBeforeLast: _strBeforeLast.default,
  titleCase: _titleCase.default,
  ucFirst: _ucFirst.default,
  words: _words.default
}
exports.default = _default
