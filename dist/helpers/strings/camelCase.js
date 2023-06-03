'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.async-iterator.reduce.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.reduce.js')
require('core-js/stable')
var _ucFirst = _interopRequireDefault(require('./ucFirst.js'))
var _words = _interopRequireDefault(require('./words.js'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Given a string in kebab-case, snake_case or 'Sentence case', convert to camelCase.
 * @function
 * @memberOf module:stringHelpers
 * @param {string} str
 * @returns {string}
 */
const camelCase = str => (0, _words.default)(str).reduce((camel, part) => camel ? camel.concat((0, _ucFirst.default)(part)) : part.toLowerCase(), '')
var _default = camelCase
exports.default = _default
