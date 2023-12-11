import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { IsQueue, queuedItem } from '../arrays/BasicQueue';
/**
 * Each time queue handle is called the passed function is added to the queue to be called when ready.
 * @typedef {Object} module:functionHelpers~queueedRunnable
 * @memberOf module:functionHelpers
 * @property {Object.<fn|args, Function|Array.<*>>} item - Stores the function and the arguments to apply to it when called
 * @property {Generator} generator - The generator instance which can be used to yield function results
 */
export type queuedRunnable = {
    item: {
        fn: Function | queuedItem;
        args: any[];
    };
    generator: Generator;
};
/**
 * The pushed function is added to the queue to be called when ready.
 * @typedef {Function} module:functionHelpers~queueManagerPush
 * @memberOf module:functionHelpers
 * @param {Function} fn - A function to enqueue
 * @param  {...*} args - Arguments to be passed to the function once it is ready
 * @returns {Promise}
 */
export type queuePush = (fn: Function, ...args: any) => Promise<any>;
/**
 * Each time queue handle is called the passed function is added to the queue to be called when ready.
 * @typedef {Object} module:functionHelpers~queueManagerHandle
 * @memberOf module:functionHelpers
 * @property {Function} start - Callable property that will disable paused state and run the next queue
 * @property  {Function} pause - Callable property that will switch state to paused
 * @property {module:functionHelpers~queueManagerPush} push - Callable property that takes a function to add to the queue
 */
export type queueManagerHandle = {
    start: () => void;
    pause: () => void;
    push: queuePush;
};
/**
 * Manage functions to run sequentially.
 * @function
 * @memberOf module:functionHelpers
 * @param {IsQueue} [queue=[]] - The iterable that can be used to store queued functions
 * @returns {module:functionHelpers~queueManagerHandle}
 */
declare const queueManager: (queue?: IsQueue<queuedItem>) => queueManagerHandle;
export default queueManager;
