'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
/**
 * Retrieve the string part before the last search match.
 * @param str - The string to search within.
 * @param search - The substring to search for.
 * @returns The portion of `str` before the last occurrence of `search`, or `''` if not found.
 */
const strBeforeLast = (str, search) => {
  const index = str.lastIndexOf(search)
  return index === -1 ? '' : str.substring(0, index)
}
const _default = exports.default = strBeforeLast
