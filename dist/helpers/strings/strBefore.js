'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
/**
 * Retrieve the string part before the search match.
 * @param str - The string to search within.
 * @param search - The substring to search for.
 * @returns The portion of `str` before the first occurrence of `search`, or `''` if not found.
 */
const strBefore = (str, search) => {
  const index = str.indexOf(search)
  return index === -1 ? '' : str.slice(0, index)
}
const _default = exports.default = strBefore
