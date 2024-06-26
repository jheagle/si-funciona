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
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Given a string in kebab-case, snake_case or 'Sentence case', convert to camelCase.
 * @memberOf module:stringHelpers
 * @param {string} str
 * @returns {string}
 */
const camelCase = str => (0, _words.default)(str).reduce((camel, part) => camel ? camel.concat((0, _ucFirst.default)(part)) : part.toLowerCase(), '')
var _default = exports.default = camelCase
