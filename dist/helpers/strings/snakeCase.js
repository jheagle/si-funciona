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
 * Given a string in kebab-case, camelCase or 'Sentence case', convert to snake_case.
 * @function
 * @memberOf module:stringHelpers
 * @param {string} str
 * @returns {string}
 */
var snakeCase = function snakeCase (str) {
  return (0, _words.default)(str).reduce(function (snake, part) {
    return snake ? snake.concat('_' + part.toLowerCase()) : part.toLowerCase()
  }, '')
}
var _default = snakeCase
exports.default = _default
