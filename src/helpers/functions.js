/**
 * Manage how functions are called with these utilities.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module functionHelpers
 */
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { cloneObject } from './objects'

/**
 * Return a curried version of the passed function.
 * The returned function expects the same number of arguments minus the ones provided.
 * fn is the name of the function being curried.
 * @function
 * @param {Function} fn - Receives a function to be curried
 * @returns {Function|*}
 */
export const curry = fn => (...args) => args.length >= fn.length
  ? fn(...args)
  : (...a) => curry(fn)(...[...args, ...a])

/**
 * Take one or more function with a single parameter and return value.
 * Pass a paramter and the value will be transformed by each function then returned.
 * @function
 * @param {...Function} fns - Takes a series of functions having the same parameter
 * @returns {*}
 */
export const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)

/**
 * Given a function, call with the correct number of paramters from an array of possible parameters.
 * @function
 * @param {Function} fn - The function to be called
 * @param {Array} params - Array of possible function parameters
 * @param {number} [minimum=2] - Minimumn number of parameters to use in the function
 * @returns {*}
 */
export const callWithParams = (fn, params = [], minimum = 2) =>
  fn(...params.slice(0, fn.length || minimum))

/**
 * The return function which takes the missing parameter in order to call the preloaded function.
 * @typedef {Function} callWithMissing
 * @param {*} missing - The missing parameter to be applied
 * @returns {*}
 */

/**
 * Provide an array of parameters to be used with a function, allow the function to be called later
 * with the missing parameter.
 * @function
 * @param {Function} fn - The function to be called
 * @param {Array} params - The parameters to preload
 * @param {number} [unassignedParam=0] - Position of missing parameter (zero indexed)
 * @returns {module:functionHelpers~callWithMissing}
 */
export const preloadParams = (fn, params = [], unassignedParam = 0) => missing => {
  params.splice(unassignedParam, 0, missing)
  return fn(...params)
}

/**
 * Provide a way to cancel a request or attach a resolve event.
 * @typedef {Object} delayHandler
 * @property {Promise} resolver
 * @property {Function} cancel
 */

/**
 * Provide a timeout which returns a promise.
 * @function
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
 * Each time queue handle is called the passed function is added to the queue to be called when ready.
 * @typedef {Function} queueManagerHandle
 * @param {Function} fn - A function to enqueue
 * @param  {...*} args - Arguments to be passed to the function once it is ready
 * @returns {Promise}
 */

/**
 * Manage functions to run sequentially.
 * @function
 * @param {Iterable} [queue=[]] - The iterable that can be used to store queued functions
 * @returns {module:functionHelpers~queueManagerHandle}
 */
export const queueManager = (queue = []) => {
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

/**
 * Run Timeout functions one after the otherin queue.
 * @typedef {Function} queueTimeoutHandle
 * @param {Function} fn - A callback function to be performed at some time in the future.
 * @param {number} time - The time in milliseconds to delay.
 * @param {...*} args - Arguments to be passed to the callback once it is implemented.
 * @returns {Promise}
 */

/**
 * Manage functions to run sequentially with delays.
 * @function
 * @param {Iterable} [queue=[]] - The iterable that can be used to store queued functions
 * @returns {module:functionHelpers~queueTimeoutHandle}
 */
export const queueTimeout = (queue = []) => {
  const manager = queueManager(queue)
  return (fn, time = 0, ...args) => manager(() => delay(time).resolver.then(() => fn(...args)))
}

/**
 * Output the a value with label to the console and return the value to not interrupt the code.
 * @function
 * @param {string} label - Pass an identifying label of the value being output.
 * @param useClone - Determines if the logged data should be a clone of the original to preserve state.
 * @returns {function(*=)}
 */
export const trace = (label, useClone = true) => value => {
  // noinspection JSForgottenDebugStatementInspection
  console.info(`${label}: `, useClone ? cloneObject(value) : value)
  return value
}
