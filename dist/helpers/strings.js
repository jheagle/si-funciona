'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _camelCase = _interopRequireDefault(require('./strings/camelCase'))
var _kabobCase = _interopRequireDefault(require('./strings/kabobCase'))
var _snakeCase = _interopRequireDefault(require('./strings/snakeCase'))
var _strAfter = _interopRequireDefault(require('./strings/strAfter'))
var _strAfterLast = _interopRequireDefault(require('./strings/strAfterLast'))
var _strBefore = _interopRequireDefault(require('./strings/strBefore'))
var _strBeforeLast = _interopRequireDefault(require('./strings/strBeforeLast'))
var _titleCase = _interopRequireDefault(require('./strings/titleCase'))
var _ucFirst = _interopRequireDefault(require('./strings/ucFirst'))
var _words = _interopRequireDefault(require('./strings/words'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Manage how strings are manipulated with these utilities.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module stringHelpers
 * @memberOf module:siFunciona
 */
var _default = exports.default = {
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
