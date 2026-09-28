import BasicQueue, { IsQueue, queuedItem } from '../arrays/BasicQueue'

/**
 * Create an instance of a basic queue.
 * @param initialQueue - Items to pre-populate the queue with, in order.
 */
const makeBasicQueue = (initialQueue: queuedItem[] | any = []): IsQueue<any> => {
  return new BasicQueue(initialQueue)
}

export default makeBasicQueue
