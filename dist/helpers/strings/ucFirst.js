'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
/**
 * Given a string, make the first character uppercase and the rest lowercase.
 * @function
 * @memberOf module:stringHelpers
 * @param {string} str
 * @returns {string}
 */
const ucFirst = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
var _default = ucFirst
exports.default = _default
