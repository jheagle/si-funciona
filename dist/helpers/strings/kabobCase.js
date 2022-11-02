'use strict'

require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/es.array.reduce.js')
require('core-js/modules/es.object.to-string.js')
require('core-js/modules/esnext.async-iterator.reduce.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.reduce.js')
require('core-js/modules/es.array.concat.js')
require('core-js/stable')
var _words = _interopRequireDefault(require('./words.js'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Given a string in snake_case, camelCase or 'Sentence case', convert to kabob-case.
 * @function
 * @memberOf module:stringHelpers
 * @param {string} str
 * @returns {string}
 */
var kabobCase = function kabobCase (str) {
  return (0, _words.default)(str).reduce(function (kabob, part) {
    return kabob ? kabob.concat('-' + part.toLowerCase()) : part.toLowerCase()
  }, '')
}
var _default = kabobCase
exports.default = _default
