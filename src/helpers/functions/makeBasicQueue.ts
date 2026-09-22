import BasicQueue, { IsQueue, queuedItem } from '../arrays/BasicQueue'

/**
 * Create an instance of a basic queue.
 * @memberOf module:functionHelpers
 * @param {Array} [initialQueue=[]] - Items to pre-populate the queue with, in order.
 * @returns {IsQueue}
 */
const makeBasicQueue = (initialQueue: queuedItem[] | any = []): IsQueue<any> => {
  return new BasicQueue(initialQueue)
}

export default makeBasicQueue
