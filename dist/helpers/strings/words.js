'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
/**
 * Split a string into sets of numbers or letters.
 * @function
 * @memberOf module:stringHelpers
 * @param {string} str
 * @returns {array}
 */
const words = str => str.match(/\d+|[A-Z]?[a-z]+|[A-Za-z]+/g)
var _default = words
exports.default = _default
