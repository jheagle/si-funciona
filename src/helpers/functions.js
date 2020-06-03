/**
 * Manage how functions are called with these utilities.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module functionHelpers
 */
import 'core-js/stable'
import 'regenerator-runtime/runtime'

/**
 * Return a curried version of the passed function.
 * The returned function expects the same number of arguments minus the ones provided.
 * fn is the name of the function being curried.
 * @param {function} fn - Receives a function to be curried
 * @returns {function|*}
 */
export const curry = fn => (...args) => args.length >= fn.length
  ? fn(...args)
  : (...a) => curry(fn)(...[...args, ...a])

/**
 * Take one or more function with a single parameter and return value.
 * Pass a paramter and the value will be transformed by each function then returned.
 * @param {...function} fns - Takes a series of functions having the same parameter
 * @returns {*}
 */
export const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)

/**
 * Given a function, call with the correct number of paramters from an array of possible parameters.
 * @param {function} fn - The function to be called
 * @param {Array} params - Array of possible function parameters
 * @param {number} [minimum=2] - Minimumn number of parameters to use in the function
 * @returns {*}
 */
export const callWithParams = (fn, params = [], minimum = 2) =>
  fn(...params.slice(0, fn.length || minimum))

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
export const delay = (time = 0) => {
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

/**
 * Manage functions to run sequentially.
 * @param {Iterable} [queue=[]] - The iterable that can be used to store queued functions
 * @returns {queueManager~handle}
 */
export const queueManager = (queue = []) => {
  let isRunning = false
  /**
   * Each time queue handle is called the passed function is added to the queue to be called when ready.
   * @param {Function} fn - A function to enqueue
   * @param  {...any} args - Arguments to be passed to the function once it is ready
   * @returns {Promise}
   */
  const handle = (fn, ...args) => {
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
  return handle
}

/**
 * Manage functions to run sequentially with delays.
 * @param {Iterable} [queue=[]] - The iterable that can be used to store queued functions
 * @returns {queueTimeout~handle}
 */
export const queueTimeout = (queue = []) => {
  const manager = queueManager(queue)
  /**
   * Run Timeout functions one after the other in queue.
   * @param {function} fn - A callback function to be performed at some time in the future.
   * @param {number} time - The time in milliseconds to delay.
   * @param {...*} args - Arguments to be passed to the callback once it is implemented.
   * @returns {Promise}
   */
  const handle = (fn, time = 0, ...args) => manager(() => delay(time).resolver.then(() => fn(...args)))
  return handle
}
