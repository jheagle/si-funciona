import 'core-js/stable';
/**
 * The return function which takes the missing parameter in order to call the preloaded function.
 * @typedef {Function} module:functionHelpers~callWithMissing
 * @memberOf module:functionHelpers
 * @param {*} missing - The missing parameter to be applied
 * @returns {*}
 */
type callWithMissing = (missing: any) => any;
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
declare const preloadParams: (fn: Function, params?: Array<any>, unassignedParam?: number) => callWithMissing;
export default preloadParams;
