import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { callableLater, IsQueue, queuedItem } from '../arrays/BasicQueue'
import makeBasicQueue from './makeBasicQueue'

/**
 * Each time queue handle is called the passed function is added to the queue to be called when ready.
 * @typedef {Object} module:functionHelpers~queueedRunnable
 * @memberOf module:functionHelpers
 * @property {Object.<fn|args, Function|Array.<*>>} item - Stores the function and the arguments to apply to it when called
 * @property {Generator} generator - The generator instance which can be used to yield function results
 */
export type queuedRunnable = {
  item: { fn: Function | queuedItem, args: any[] },
  generator: Generator
}

/**
 * The pushed function is added to the queue to be called when ready.
 * @typedef {Function} module:functionHelpers~queueManagerPush
 * @memberOf module:functionHelpers
 * @param {Function} fn - A function to enqueue
 * @param  {...*} args - Arguments to be passed to the function once it is ready
 * @returns {Promise}
 */
export type queuePush = (fn: Function, ...args: any) => Promise<any>

/**
 * Each time queue handle is called the passed function is added to the queue to be called when ready.
 * @typedef {Object} module:functionHelpers~queueManagerHandle
 * @memberOf module:functionHelpers
 * @property {Function} start - Callable property that will disable paused state and run the next queue
 * @property  {Function} pause - Callable property that will switch state to paused
 * @property {module:functionHelpers~queueManagerPush} push - Callable property that takes a function to add to the queue
 */
export type queueManagerHandle = {
  start: () => void
  pause: () => void
  push: queuePush
}

/**
 * Manage functions to run sequentially.
 * @memberOf module:functionHelpers
 * @param {IsQueue} [queue=[]] - The iterable that can be used to store queued functions
 * @returns {module:functionHelpers~queueManagerHandle}
 */
const queueManager = (queue: IsQueue<queuedItem> = null): queueManagerHandle => {
  let isRunning = false
  let isPaused = true
  /**
   * Convert a function to a queueable object.
   * @param {Promise.resolve} resolve
   * @param {Promise.reject} reject
   * @param {Function} fn
   * @param {...*} args
   * @returns {queuedRunnable}
   */
  const makeQueuedRunnable = (resolve: Function, reject: Function, fn: Function | queuedItem, ...args: any): queuedRunnable => {
    const generator = (function * (): Generator<callableLater> {
      const item: callableLater = yield
      return typeof item.fn === 'function' ? resolve(item.fn(...item.args)) : reject(item)
    })()
    // Prepare the generator to be used on the subsequent call
    generator.next()
    return {
      item: { fn: fn, args: args },
      generator: generator
    }
  }
  /**
   * After an item is run, THEN run this function to reset isRunning
   * @param {*} result
   * @returns {*}
   */
  const postRun = (result: any): any => {
    isRunning = false
    runNextItem()
    return result
  }
  /**
   * When ready, runs the next queued runnable generator.
   * @returns {IteratorYieldResult|null}
   */
  const runNextItem = (): any | null => {
    if (!isPaused && !queue.empty() && !isRunning) {
      isRunning = true
      let toRun = queue.dequeue()
      if (typeof toRun === 'undefined' || toRun === null) {
        return null
      }
      if (typeof toRun === 'function') {
        new Promise((resolve, reject) => {
          toRun = makeQueuedRunnable(resolve, reject, toRun)
          runNextItem()
        }).then(postRun)
      }
      if ('success' in toRun) {
        // Some run responses return an object with 'success' property.
        console.info(toRun.success)
        return null
      }
      if (!toRun.generator || 'error' in toRun) {
        // Some run responses return an object with an 'error' property
        let errorMessage = 'Verify queued function implements "done()" state.'
        if ('error' in toRun && toRun.error) {
          errorMessage = `[${toRun.error}]: ${errorMessage}`
        }
        throw new Error(errorMessage)
      }
      if (toRun.generator && toRun.item) {
        // Ensure the returned result has both the generator and the item to be valid
        return toRun.generator.next(toRun.item)
      }
    }
    return null
  }
  /**
   * Add a function into the queue to be run when ready.
   * @param {Function} fn - The function to run when ready
   * @param {...*} args - Optional arguments to apply when the function is ready to be run
   * @returns Promise
   */
  const pushAnother = (fn: Function, ...args: any): Promise<any> => new Promise(
    (resolve: Function, reject: Function) => {
      queue.enqueue(makeQueuedRunnable(resolve, reject, fn, ...args))
      runNextItem()
    }
  )
    .then(postRun)
  if (Array.isArray(queue)) {
    const queueArray = queue
    queue = makeBasicQueue()
    queueArray.forEach((queued: Function): Promise<any> => pushAnother(queued))
  }
  if (queue === null) {
    queue = makeBasicQueue()
  }
  runNextItem()
  return {
    start: (): void => {
      isPaused = false
      runNextItem()
    },
    pause: (): void => {
      isPaused = true
    },
    push: pushAnother
  }
}

export default queueManager
