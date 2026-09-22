'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
/**
 * Retrieve the string part after the last search match.
 * @memberOf module:stringHelpers
 * @param {string} str - The string to search within.
 * @param {string} search - The substring to search for.
 * @returns {string} The portion of `str` after the last occurrence of `search`, or `''` if not found.
 */
const strAfterLast = (str, search) => {
  const index = str.lastIndexOf(search)
  return index === -1 ? '' : str.substring(index + search.length)
}
const _default = exports.default = strAfterLast
