
/**
 * Given a function, call with the correct number of parameters from an array of possible parameters.
 * @param fn - The function to be called
 * @param params - Array of possible function parameters
 * @param minimum - Minimum number of parameters to use in the function
 */
const callWithParams = (fn: Function, params: Array<any> = [], minimum: number = 2): any =>
  fn(...params.slice(0, fn.length || minimum))

export default callWithParams
