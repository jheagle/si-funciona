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

var _ucFirst = _interopRequireDefault(require('./ucFirst.js'))

var _words = _interopRequireDefault(require('./words.js'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * Given a string in kebab-case, snake_case, camelCase or 'Sentence case', convert to 'Title Case'.
 * @function
 * @memberOf module:stringHelpers
 * @param {string} str
 * @returns {string}
 */
var titleCase = function titleCase (str) {
  return (0, _words.default)(str).reduce(function (title, part) {
    return title ? title.concat(' ' + (0, _ucFirst.default)(part)) : (0, _ucFirst.default)(part)
  }, '')
}

var _default = titleCase
exports.default = _default
