'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.regexEscape = exports.default = void 0
/**
 * Take a string and escape the regex characters.
 * @param str - The string to escape, so it can be used literally inside a `RegExp`.
 */
const regexEscape = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
exports.regexEscape = regexEscape
const _default = exports.default = regexEscape
