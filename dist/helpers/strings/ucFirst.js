'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
/**
 * Given a string, make the first character uppercase and the rest lowercase.
 * @param str - The string to convert.
 */
const ucFirst = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
const _default = exports.default = ucFirst
