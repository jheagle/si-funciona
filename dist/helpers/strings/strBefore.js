'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
/**
 * Retrieve the string part before the search match.
 * @function
 * @memberOf module:stringHelpers
 * @param {string} str
 * @param {string} search
 * @returns {string}
 */
const strBefore = (str, search) => {
  const index = str.indexOf(search)
  return index === -1 ? '' : str.slice(0, index)
}
var _default = exports.default = strBefore
