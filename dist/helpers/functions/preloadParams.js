'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
/**
 * Provide an array of parameters to be used with a function, allow the function to be called later
 * with the missing parameter.
 * @memberOf module:functionHelpers
 * @param {Function} fn - The function to be called
 * @param {Array} params - The parameters to preload
 * @param {number} [unassignedParam=0] - Position of missing parameter (zero indexed)
 * @returns {module:functionHelpers~callWithMissing}
 */
const preloadParams = (fn, params = [], unassignedParam = 0) => missing => {
  params.splice(unassignedParam, 0, missing)
  return fn(...params)
}
var _default = exports.default = preloadParams
