import 'core-js/stable';
/**
 * Take one or more function with a single parameter and return value.
 * Pass a parameter and the value will be transformed by each function then returned.
 * @function
 * @memberOf module:functionHelpers
 * @param {...Function} fns - Takes a series of functions having the same parameter
 * @returns {*}
 */
declare const pipe: (...fns: Function[]) => any;
export default pipe;
