import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { queueManagerHandle } from './queueManager';
/**
 * Run Timeout functions one after the otherin queue.
 * @typedef {Function} module:functionHelpers~queueTimeoutHandle
 * @memberOf module:functionHelpers
 * @param {Function} fn - A callback function to be performed at some time in the future.
 * @param {number} time - The time in milliseconds to delay.
 * @param {...*} args - Arguments to be passed to the callback once it is implemented.
 * @returns {Promise}
 */
type queueTimeoutHandle = (fn: Function, time: number, ...args: any) => Promise<any>;
/**
 * Manage functions to run sequentially with delays.
 * @memberOf module:functionHelpers
 * @param {module:functionHelpers~queueManagerHandle} [queueManagerHandle=null]
 * @returns {module:functionHelpers~queueTimeoutHandle}
 */
declare const queueTimeout: (queueManagerHandle?: queueManagerHandle) => queueTimeoutHandle;
export default queueTimeout;
