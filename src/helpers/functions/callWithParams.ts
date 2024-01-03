import 'core-js/stable'

/**
 * Given a function, call with the correct number of parameters from an array of possible parameters.
 * @function
 * @memberOf module:functionHelpers
 * @param {Function} fn - The function to be called
 * @param {Array} params - Array of possible function parameters
 * @param {number} [minimum=2] - Minimum number of parameters to use in the function
 * @returns {*}
 */
const callWithParams = (fn: Function, params: Array<any> = [], minimum: number = 2): any =>
  fn(...params.slice(0, fn.length || minimum))

export default callWithParams
