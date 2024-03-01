'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.async-iterator.for-each.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.for-each.js')
require('core-js/modules/web.dom-collections.iterator.js')
require('core-js/stable')
require('regenerator-runtime/runtime')
var _makeBasicQueue = _interopRequireDefault(require('./makeBasicQueue'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Manage functions to run sequentially.
 * @memberOf module:functionHelpers
 * @param {IsQueue} [queue=[]] - The iterable that can be used to store queued functions
 * @returns {module:functionHelpers~queueManagerHandle}
 */
const queueManager = function () {
  let queue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
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
  const makeQueuedRunnable = function (resolve, reject, fn) {
    const generator = (function * () {
      const item = yield
      return typeof item.fn === 'function' ? resolve(item.fn(...item.args)) : reject(item)
    }())
    // Prepare the generator to be used on the subsequent call
    generator.next()
    for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key]
    }
    return {
      item: {
        fn: fn,
        args: args
      },
      generator: generator
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
          errorMessage = '['.concat(toRun.error, ']: ').concat(errorMessage)
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
  const pushAnother = function (fn) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2]
    }
    return new Promise((resolve, reject) => {
      queue.enqueue(makeQueuedRunnable(resolve, reject, fn, ...args))
      runNextItem()
    }).then(postRun)
  }
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
var _default = exports.default = queueManager
