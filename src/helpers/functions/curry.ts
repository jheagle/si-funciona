import 'core-js/stable'

/**
 * Return a curried version of the passed function.
 * The returned function expects the same number of arguments minus the ones provided.
 * fn is the name of the function being curried.
 * @function
 * @memberOf module:functionHelpers
 * @param {Function} fn - Receives a function to be curried
 * @returns {Function|*}
 */
const curry = (fn: Function): Function | any => (...args: any): any => args.length >= fn.length
  ? fn(...args)
  : (...a: any): any => curry(fn)(...[...args, ...a])

export default curry
