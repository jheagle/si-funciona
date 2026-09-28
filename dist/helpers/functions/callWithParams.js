'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
/**
 * Given a function, call with the correct number of parameters from an array of possible parameters.
 * @param fn - The function to be called
 * @param params - Array of possible function parameters
 * @param minimum - Minimum number of parameters to use in the function
 */
const callWithParams = (fn, params = [], minimum = 2) => fn(...params.slice(0, fn.length || minimum))
const _default = exports.default = callWithParams
