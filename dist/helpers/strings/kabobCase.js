'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.async-iterator.reduce.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.reduce.js')
require('core-js/stable')
var _words = _interopRequireDefault(require('./words'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Given a string in snake_case, camelCase or 'Sentence case', convert to kabob-case.
 * @memberOf module:stringHelpers
 * @param {string} str
 * @returns {string}
 */
const kabobCase = str => (0, _words.default)(str).reduce((kabob, part) => kabob ? kabob.concat('-' + part.toLowerCase()) : part.toLowerCase(), '')
var _default = exports.default = kabobCase
