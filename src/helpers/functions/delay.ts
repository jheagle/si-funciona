import 'core-js/stable'
import 'regenerator-runtime/runtime'

/**
 * Provide a way to cancel a request or attach a resolve event.
 * @typedef {Object} module:functionHelpers~delayHandler
 * @memberOf module:functionHelpers
 * @property {Promise} resolver
 * @property {Function} cancel
 */
type delayHandler = {
  resolver: Promise<any>,
  cancel: () => void,
}

/**
 * Provide a timeout which returns a promise.
 * @function
 * @memberOf module:functionHelpers
 * @param {number} time - Delay in milliseconds
 * @returns {module:functionHelpers~delayHandler}
 */
const delay = (time: number = 0): delayHandler => {
  let cancel = (): void => undefined
  return {
    resolver: new Promise(
      (resolve: Function, reject: Function): void => {
        if (isNaN(time)) {
          reject(new Error(`Invalid delay: ${time}`))
        } else {
          const timeoutId = setTimeout(resolve, time, `Delayed for: ${time}`)
          cancel = (): void => {
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
