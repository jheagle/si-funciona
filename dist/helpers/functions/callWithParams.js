'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/web.dom-collections.iterator.js')
require('core-js/stable')
/**
 * Given a function, call with the correct number of parameters from an array of possible parameters.
 * @function
 * @memberOf module:functionHelpers
 * @param {Function} fn - The function to be called
 * @param {Array} params - Array of possible function parameters
 * @param {number} [minimum=2] - Minimum number of parameters to use in the function
 * @returns {*}
 */
const callWithParams = function (fn) {
  const params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : []
  const minimum = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2
  return fn(...params.slice(0, fn.length || minimum))
}
var _default = exports.default = callWithParams
