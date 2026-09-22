'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
/**
 * Given a string, make the first character uppercase and the rest lowercase.
 * @memberOf module:stringHelpers
 * @param {string} str - The string to convert.
 * @returns {string}
 */
const ucFirst = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
const _default = exports.default = ucFirst
