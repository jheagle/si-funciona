import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { callableLater, IsQueue, queuedItem } from '../arrays/BasicQueue'
import makeBasicQueue from './makeBasicQueue'

/**
 * Each time queue handle is called the passed function is added to the queue to be called when ready.
 * @typedef {Function} module:functionHelpers~queueManagerHandle
 * @memberOf module:functionHelpers
 * @param {Function} fn - A function to enqueue
 * @param  {...*} args - Arguments to be passed to the function once it is ready
 * @returns {Promise}
 */
export type queueManagerHandle = (fn: Function, ...args: any) => Promise<any>

/**
 * Manage functions to run sequentially.
 * @function
 * @memberOf module:functionHelpers
 * @param {IsQueue} [queue=[]] - The iterable that can be used to store queued functions
 * @returns {module:functionHelpers~queueManagerHandle}
 */
const queueManager = (queue: IsQueue<queuedItem> = null): queueManagerHandle => {
  if (Array.isArray(queue)) {
    queue = makeBasicQueue(queue)
  }
  if (queue === null) {
    queue = makeBasicQueue()
  }
  let isRunning = false
  return (fn: Function, ...args: any): Promise<any> => {
    const runNextItem = () => {
      if (!queue.empty() && !isRunning) {
        isRunning = true
        const toRun = queue.dequeue()
        toRun.generator.next(toRun.item)
      }
      return queue
    }
    return new Promise((resolve: Function, reject: Function): void => {
      const generator = (function * (): Generator<callableLater> {
        const item: callableLater = yield
        return typeof item.fn === 'function' ? resolve(item.fn(...item.args)) : reject(item)
      })()
      generator.next()
      queue.enqueue({
        item: { fn: fn, args: args },
        generator: generator
      })
      runNextItem()
    }).then((resolvedResult: any): any => {
      isRunning = false
      runNextItem()
      return resolvedResult
    })
  }
}

export default queueManager
