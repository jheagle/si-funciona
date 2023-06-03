'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/web.dom-collections.iterator.js')
require('core-js/stable')
/**
 * The return function which takes the missing parameter in order to call the preloaded function.
 * @typedef {Function} module:functionHelpers~callWithMissing
 * @memberOf module:functionHelpers
 * @param {*} missing - The missing parameter to be applied
 * @returns {*}
 */
/**
 * Provide an array of parameters to be used with a function, allow the function to be called later
 * with the missing parameter.
 * @function
 * @memberOf module:functionHelpers
 * @param {Function} fn - The function to be called
 * @param {Array} params - The parameters to preload
 * @param {number} [unassignedParam=0] - Position of missing parameter (zero indexed)
 * @returns {module:functionHelpers~callWithMissing}
 */
const preloadParams = function (fn) {
  const params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : []
  const unassignedParam = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0
  return missing => {
    params.splice(unassignedParam, 0, missing)
    return fn(...params)
  }
}
var _default = preloadParams
exports.default = _default
