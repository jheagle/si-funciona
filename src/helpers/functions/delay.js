import 'core-js/stable'
import 'regenerator-runtime/runtime'

/**
 * Provide a way to cancel a request or attach a resolve event.
 * @typedef {Object} module:functionHelpers~delayHandler
 * @memberOf module:functionHelpers
 * @property {Promise} resolver
 * @property {Function} cancel
 */

/**
 * Provide a timeout which returns a promise.
 * @function
 * @memberOf module:functionHelpers
 * @param {number} time - Delay in milliseconds
 * @returns {module:functionHelpers~delayHandler}
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

export default delay
