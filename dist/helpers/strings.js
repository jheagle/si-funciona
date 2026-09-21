'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
Object.defineProperty(exports, 'camelCase', {
  enumerable: true,
  get: function () {
    return _camelCase.default
  }
})
exports.default = void 0
Object.defineProperty(exports, 'kabobCase', {
  enumerable: true,
  get: function () {
    return _kabobCase.default
  }
})
Object.defineProperty(exports, 'makeFilepath', {
  enumerable: true,
  get: function () {
    return _makeFilepath.default
  }
})
Object.defineProperty(exports, 'makeRelativePath', {
  enumerable: true,
  get: function () {
    return _makeRelativePath.default
  }
})
Object.defineProperty(exports, 'regexEscape', {
  enumerable: true,
  get: function () {
    return _regexEscape.default
  }
})
Object.defineProperty(exports, 'snakeCase', {
  enumerable: true,
  get: function () {
    return _snakeCase.default
  }
})
Object.defineProperty(exports, 'strAfter', {
  enumerable: true,
  get: function () {
    return _strAfter.default
  }
})
Object.defineProperty(exports, 'strAfterLast', {
  enumerable: true,
  get: function () {
    return _strAfterLast.default
  }
})
Object.defineProperty(exports, 'strBefore', {
  enumerable: true,
  get: function () {
    return _strBefore.default
  }
})
Object.defineProperty(exports, 'strBeforeLast', {
  enumerable: true,
  get: function () {
    return _strBeforeLast.default
  }
})
Object.defineProperty(exports, 'titleCase', {
  enumerable: true,
  get: function () {
    return _titleCase.default
  }
})
Object.defineProperty(exports, 'ucFirst', {
  enumerable: true,
  get: function () {
    return _ucFirst.default
  }
})
Object.defineProperty(exports, 'words', {
  enumerable: true,
  get: function () {
    return _words.default
  }
})
require('core-js/stable')
var _camelCase = _interopRequireDefault(require('./strings/camelCase'))
var _kabobCase = _interopRequireDefault(require('./strings/kabobCase'))
var _makeFilepath = _interopRequireDefault(require('./strings/makeFilepath'))
var _makeRelativePath = _interopRequireDefault(require('./strings/makeRelativePath'))
var _regexEscape = _interopRequireDefault(require('./strings/regexEscape'))
var _snakeCase = _interopRequireDefault(require('./strings/snakeCase'))
var _strAfter = _interopRequireDefault(require('./strings/strAfter'))
var _strAfterLast = _interopRequireDefault(require('./strings/strAfterLast'))
var _strBefore = _interopRequireDefault(require('./strings/strBefore'))
var _strBeforeLast = _interopRequireDefault(require('./strings/strBeforeLast'))
var _titleCase = _interopRequireDefault(require('./strings/titleCase'))
var _ucFirst = _interopRequireDefault(require('./strings/ucFirst'))
var _words = _interopRequireDefault(require('./strings/words'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Manage how strings are manipulated with these utilities.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module stringHelpers
 * @memberOf module:siFunciona
 */
const _default = exports.default = {
  camelCase: _camelCase.default,
  kabobCase: _kabobCase.default,
  makeFilepath: _makeFilepath.default,
  makeRelativePath: _makeRelativePath.default,
  regexEscape: _regexEscape.default,
  snakeCase: _snakeCase.default,
  strAfter: _strAfter.default,
  strAfterLast: _strAfterLast.default,
  strBefore: _strBefore.default,
  strBeforeLast: _strBeforeLast.default,
  titleCase: _titleCase.default,
  ucFirst: _ucFirst.default,
  words: _words.default
}
