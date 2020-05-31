;(function (regeneratorRuntime) {
  /**
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 */

  /**
 * Manage how functions are called with these utilities.
 * @module functionHelpers
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 */
  const functionHelpers = {}

  /**
 * Return a curried version of the passed function.
 * The returned function expects the same number of arguments minus the ones provided.
 * fn is the name of the function being curried.
 * @function curry
 * @param {function} fn - Receives a function to be curried
 * @returns {function|*}
 */
  const curry = fn => (...args) => args.length >= fn.length
    ? fn(...args)
    : (...a) => curry(fn)(...[...args, ...a])
  functionHelpers.curry = curry

  /**
 * Take one or more function with a single parameter and return value.
 * Pass a paramter and the value will be transformed by each function then returned.
 * @function pipe
 * @param {...function} fns - Takes a series of functions having the same parameter
 * @returns {*}
 */
  const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)
  functionHelpers.pipe = pipe

  /**
 * Given a function, call with the correct number of paramters from an array of possible parameters.
 * @function callWithParams
 * @param {function} fn - The function to be called
 * @param {Array} params - Array of possible function parameters
 * @param {number} [minimum=2] - Minimumn number of parameters to use in the function
 * @returns {*}
 */
  const callWithParams = (fn, params = [], minimum = 2) =>
    fn(...params.slice(0, fn.length || minimum))
  functionHelpers.callWithParams = callWithParams

  /**
 * Provide a way to cancel a request or attach a resolve event.
 * @typedef {Object} delayHandler
 * @property {Promise} resolver
 * @property {Function} cancel
 */

  /**
 * Provide a timeout which returns a promise.
 * @param {number} time - Delay in milliseconds
 * @returns {delayHandler}
 */
  const delay = (time = 0) => {
    let cancel = () => undefined
    return {
      resolver: new Promise(
        (resolve, reject) => {
          if (isNaN(time)) {
            reject(new Error(`Invalid delay: ${time}`))
          } else {
            const timeoutId = setTimeout(resolve, time, `Delayed for: ${time}`)
            cancel = () => {
              clearTimeout(timeoutId)
              reject(new Error(`Cancelled delay: ${time}`))
            }
          }
        }
      ),
      cancel: cancel
    }
  }
  functionHelpers.delay = delay

  /**
 * Manage functions to run sequentially. Each time queue manager is called the passed function is added to the queue to be called when ready.
 * @function queueManager
 * @param {*} fn - A function to enqueue
 * @param  {...any} args - Arguments to be passed to the function once it is ready
 * @returns {Promise}
 */
  const queueManager = (fn, ...args) => {
    queueManager.queue = queueManager.queue || []
    queueManager.isRunning = queueManager.isRunning || false
    const runNextItem = () => {
      if (queueManager.queue.length && !queueManager.isRunning) {
        queueManager.isRunning = true
        const toRun = queueManager.queue.shift()
        toRun.generator.next(toRun.item)
      }
      return queueManager.queue
    }
    return new Promise((resolve, reject) => {
      const generator = (function * () {
        const item = yield
        return typeof item.fn === 'function' ? resolve(item.fn(...item.args)) : reject(item)
      })()
      generator.next()
      queueManager.queue.push({
        item: { fn: fn, args: args },
        generator: generator
      })
      runNextItem()
    }).then(resolvedResult => {
      queueManager.isRunning = false
      runNextItem()
      return resolvedResult
    })
  }
  functionHelpers.queueManager = queueManager

  /**
 * Run Timeout functions one after the other in queue.
 * @function queueTimeout
 * @param {function} fn - A callback function to be performed at some time in the future.
 * @param {number} time - The time in milliseconds to delay.
 * @param {...*} args - Arguments to be passed to the callback once it is implemented.
 * @returns {Promise}
 */
  const queueTimeout = (fn, time = 0, ...args) => queueManager(() => delay(time).resolver.then(() => fn(...args)))
  functionHelpers.queueTimeout = queueTimeout

  module.exports = functionHelpers
})(require('regenerator-runtime'))
