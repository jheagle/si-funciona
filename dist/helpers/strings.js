'use strict'

require('core-js/modules/es.object.define-property.js')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/stable')

var _camelCase = _interopRequireDefault(require('./strings/camelCase.js'))

var _kabobCase = _interopRequireDefault(require('./strings/kabobCase.js'))

var _snakeCase = _interopRequireDefault(require('./strings/snakeCase.js'))

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
 * @memberOf module:stringHelpers
 */
var _default = {
  camelCase: _camelCase.default,
  kabobCase: _kabobCase.default,
  snakeCase: _snakeCase.default,
  titleCase: _titleCase.default,
  ucFirst: _ucFirst.default,
  words: _words.default
}
exports.default = _default
