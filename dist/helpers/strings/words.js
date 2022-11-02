'use strict'

require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/es.regexp.exec.js')
require('core-js/modules/es.string.match.js')
require('core-js/stable')
/**
 * Split a string into sets of numbers or letters.
 * @function
 * @memberOf module:stringHelpers
 * @param {string} str
 * @returns {array}
 */
var words = function words (str) {
  return str.match(/\d+|[A-Z]?[a-z]+|[A-Za-z]+/g)
}
var _default = words
exports.default = _default
