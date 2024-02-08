'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.async-iterator.reduce.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.reduce.js')
require('core-js/stable')
var _ucFirst = _interopRequireDefault(require('./ucFirst'))
var _words = _interopRequireDefault(require('./words'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Given a string in kebab-case, snake_case, camelCase or 'Sentence case', convert to 'Title Case'.
 * @memberOf module:stringHelpers
 * @param {string} str
 * @returns {string}
 */
const titleCase = str => (0, _words.default)(str).reduce((title, part) => title ? title.concat(' ' + (0, _ucFirst.default)(part)) : (0, _ucFirst.default)(part), '')
var _default = exports.default = titleCase
