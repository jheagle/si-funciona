'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
/**
 * Provide an array of parameters to be used with a function, allow the function to be called later
 * with the missing parameter.
 * @param fn - The function to be called
 * @param params - The parameters to preload
 * @param unassignedParam - Position of missing parameter (zero indexed)
 */
const preloadParams = (fn, params = [], unassignedParam = 0) => missing => {
  params.splice(unassignedParam, 0, missing)
  return fn(...params)
}
const _default = exports.default = preloadParams
