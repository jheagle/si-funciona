import 'core-js/stable';
import 'regenerator-runtime/runtime';
/**
 * Provide a way to cancel a request or attach a resolve event.
 * @typedef {Object} module:functionHelpers~delayHandler
 * @memberOf module:functionHelpers
 * @property {Promise} resolver
 * @property {Function} cancel
 */
type delayHandler = {
    resolver: Promise<any>;
    cancel: () => void;
};
/**
 * Provide a timeout which returns a promise.
 * @memberOf module:functionHelpers
 * @param {number} time - Delay in milliseconds
 * @returns {module:functionHelpers~delayHandler}
 */
declare const delay: (time?: number) => delayHandler;
export default delay;
