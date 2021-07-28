import 'core-js/stable'
import 'regenerator-runtime/runtime'

/**
 * Each time queue handle is called the passed function is added to the queue to be called when ready.
 * @typedef {Function} module:functionHelpers~queueManagerHandle
 * @memberOf module:functionHelpers
 * @param {Function} fn - A function to enqueue
 * @param  {...*} args - Arguments to be passed to the function once it is ready
 * @returns {Promise}
 */

/**
 * Manage functions to run sequentially.
 * @function
 * @memberOf module:functionHelpers
 * @param {Iterable|array} [queue=[]] - The iterable that can be used to store queued functions
 * @returns {module:functionHelpers~queueManagerHandle}
 */
const queueManager = (queue = []) => {
  let isRunning = false
  return (fn, ...args) => {
    const runNextItem = () => {
      if (queue.length && !isRunning) {
        isRunning = true
        const toRun = queue.shift()
        toRun.generator.next(toRun.item)
      }
      return queue
    }
    return new Promise((resolve, reject) => {
      const generator = (function * () {
        const item = yield
        return typeof item.fn === 'function' ? resolve(item.fn(...item.args)) : reject(item)
      })()
      generator.next()
      queue.push({
        item: { fn: fn, args: args },
        generator: generator
      })
      runNextItem()
    }).then(resolvedResult => {
      isRunning = false
      runNextItem()
      return resolvedResult
    })
  }
}

export default queueManager
