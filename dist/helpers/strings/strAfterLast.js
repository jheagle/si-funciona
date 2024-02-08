'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
/**
 * Retrieve the string part after the last search match.
 * @memberOf module:stringHelpers
 * @param {string} str
 * @param {string} search
 * @returns {string}
 */
const strAfterLast = (str, search) => {
  const index = str.lastIndexOf(search)
  return index === -1 ? '' : str.substring(index + search.length)
}
var _default = exports.default = strAfterLast
