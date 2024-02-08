'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.regexEscape = exports.default = void 0
/**
 * Take a string and escape the regex characters.
 * @memberOf module:stringHelpers
 * @param {string} str
 * @returns {string}
 */
const regexEscape = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
exports.regexEscape = regexEscape
var _default = exports.default = regexEscape
