'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.for-each.js')
require('regenerator-runtime/runtime')
const _makeBasicQueue = _interopRequireDefault(require('./makeBasicQueue'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Manage functions to run sequentially.
 * @memberOf module:functionHelpers
 * @param {IsQueue|Array} [queue=null] - The queue to manage. Pass a plain array to have it converted into a
 * {@link module:arrayHelpers.BasicQueue} automatically, or a custom queue implementing `IsQueue`; omit it (or pass
 * `null`) to have one created for you.
 * @returns {module:functionHelpers~queueManagerHandle}
 */
const queueManager = (queue = null) => {
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
  const makeQueuedRunnable = (resolve, reject, fn, ...args) => {
    const generator = (function * () {
      const item = yield
      if (typeof item.fn !== 'function') {
        return reject(item)
      }
      try {
        return resolve(item.fn(...item.args))
      } catch (error) {
        // A function which throws rejects its own promise (as one which returns a rejected promise does), instead of
        // throwing out of whichever function happened to finish just before it and starting the next item.
        return reject(error)
      }
    }())
    // Prepare the generator to be used on the subsequent call
    generator.next()
    return {
      item: {
        fn,
        args
      },
      generator
    }
  }
  /**
   * After an item is run, THEN run this function to reset isRunning
   * @param {*} result
   * @returns {*}
   */
  const postRun = result => {
    isRunning = false
    runNextItem()
    return result
  }
  /**
   * When a queued function throws (or returns a promise which rejects), carry on with the rest of the queue and pass the
   * error on to whoever queued it - otherwise the queue would stay marked as running and never start another function.
   * @param {*} error
   * @throws {*} The same error
   */
  const postFailedRun = error => {
    isRunning = false
    runNextItem()
    throw error
  }
  /**
   * When ready, runs the next queued runnable generator.
   * @returns {IteratorYieldResult|null}
   */
  const runNextItem = () => {
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
        }).then(postRun, postFailedRun)
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
  const pushAnother = (fn, ...args) => new Promise((resolve, reject) => {
    queue.enqueue(makeQueuedRunnable(resolve, reject, fn, ...args))
    runNextItem()
  }).then(postRun, postFailedRun)
  if (Array.isArray(queue)) {
    const queueArray = queue
    queue = (0, _makeBasicQueue.default)()
    queueArray.forEach(queued => pushAnother(queued))
  }
  if (queue === null) {
    queue = (0, _makeBasicQueue.default)()
  }
  runNextItem()
  return {
    start: () => {
      isPaused = false
      runNextItem()
    },
    pause: () => {
      isPaused = true
    },
    push: pushAnother
  }
}
const _default = exports.default = queueManager
