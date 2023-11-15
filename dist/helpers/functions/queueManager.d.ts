import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { IsQueue, queuedItem } from '../arrays/BasicQueue';
/**
 * Each time queue handle is called the passed function is added to the queue to be called when ready.
 * @typedef {Function} module:functionHelpers~queueManagerHandle
 * @memberOf module:functionHelpers
 * @param {Function} fn - A function to enqueue
 * @param  {...*} args - Arguments to be passed to the function once it is ready
 * @returns {Promise}
 */
export type queueManagerHandle = (fn: Function, ...args: any) => Promise<any>;
/**
 * Manage functions to run sequentially.
 * @function
 * @memberOf module:functionHelpers
 * @param {IsQueue} [queue=[]] - The iterable that can be used to store queued functions
 * @returns {module:functionHelpers~queueManagerHandle}
 */
declare const queueManager: (queue?: IsQueue<queuedItem>) => queueManagerHandle;
export default queueManager;
