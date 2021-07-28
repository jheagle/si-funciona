import 'core-js/stable'

/**
 * Given a function, call with the correct number of paramters from an array of possible parameters.
 * @function
 * @memberOf module:functionHelpers
 * @param {Function} fn - The function to be called
 * @param {Array} params - Array of possible function parameters
 * @param {number} [minimum=2] - Minimumn number of parameters to use in the function
 * @returns {*}
 */
const callWithParams = (fn, params = [], minimum = 2) =>
  fn(...params.slice(0, fn.length || minimum))

export default callWithParams
