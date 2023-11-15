import 'core-js/stable';
import { IsQueue, queuedItem } from '../arrays/BasicQueue';
/**
 * Create an instance of a basic queue.
 * @memberOf module:functionHelpers
 * @param {Array} initialQueue
 * @returns {IsQueue}
 */
declare const makeBasicQueue: (initialQueue?: queuedItem[] | any) => IsQueue<any>;
export default makeBasicQueue;
