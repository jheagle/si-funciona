'use strict'

require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/es.array.slice.js')
require('core-js/stable')
/**
 * Given a string, make the first character uppercase and the rest lowercase.
 * @function
 * @memberOf module:stringHelpers
 * @param {string} str
 * @returns {string}
 */
var ucFirst = function ucFirst (str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
var _default = ucFirst
exports.default = _default
