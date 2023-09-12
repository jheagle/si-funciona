import 'core-js/stable';
/**
 * Prepare functions to be called once the body is available.
 * @function
 * @memberOf module:functionHelpers
 * @param {Function} callback
 * @param {boolean} [reset=false]
 * @returns {Array.<Function>}
 */
declare const onBodyLoad: (callback: Function, reset?: boolean) => Array<Function>;
export default onBodyLoad;
