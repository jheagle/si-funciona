(function () {
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
 * @returns {function(...[*]): function(...[*])}
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
 * @returns {function(*=): (*|any)}
 */
  const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)
  functionHelpers.pipe = pipe

  /**
 * Given a function, call with the correct number of paramters from an array of possible parameters.
 * @function callWithParams
 * @param {function} fn
 * @param {Array} params
 * @param {number} [minimum]
 * @returns {*}
 */
  const callWithParams = (fn, params = [], minimum = 2) =>
    fn(...params.slice(0, fn.length || minimum))
  functionHelpers.callWithParams = callWithParams

  /**
 * Run Timeout functions one after the other in queue. This function needs some work to comply with the standards
 * applied to the rest of this file where this is not a Pure function, and it does not reliably return a result. This
 * implementation should likely be used with Promise instead.
 * WARNING: This is a recursive function.
 * @function queueTimeout
 * @param {function|object|boolean} fn - A callback function to be performed at some time in the future.
 * @param {number} time - The time in milliseconds to delay.
 * @param {...*} args - Arguments to be passed to the callback once it is implemented.
 * @returns {{id: number, func: function, timeout: number, args: {Array}, result: *}}
 */
  const queueTimeout = (fn = {}, time = 0, ...args) => {
  // Track the queue to be processed in FIFO
    queueTimeout.queue = queueTimeout.queue || []
    // Do not run more than one queued item at a time
    queueTimeout.isRunning = queueTimeout.isRunning || false
    // Construct an object which will store the queued function data
    const queueItem = { id: 0, func: fn, timeout: time, args: args, result: 0 }
    if (fn) {
    // When the function is valid, append it to the end of the queue
      queueTimeout.queue.push(queueItem)
    }
    if (queueTimeout.queue.length && !queueTimeout.isRunning) {
    // Check that the queue is not empty, and it is not running a queued item
    // Set isRunning flag to begin processing the next queued item
      queueTimeout.isRunning = true
      // Pick an item off the front of the queue, and thereby reduce the queue size
      const toRun = queueTimeout.queue.shift()
      // Get the timeout ID when it has begun
      toRun.id = setTimeout(() => {
      // Run the function after the provided timeout
        toRun.result = toRun.func(...toRun.args)
        // Reset isRunning flag
        queueTimeout.isRunning = false
        // Re-run the queue which will get the next queued item if there is one
        return queueTimeout(false)
      }, toRun.timeout)
      // Return whatever object we have for the current queued item being processed, likely incomplete because the
      // function will complete in the future
      return toRun
    }
    // Return newly created queuedItem
    return queueItem
  }
  functionHelpers.queueTimeout = queueTimeout

  module.exports = functionHelpers
})()
