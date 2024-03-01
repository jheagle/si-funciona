'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
require('regenerator-runtime/runtime')
/**
 * Provide a timeout which returns a promise.
 * @memberOf module:functionHelpers
 * @param {number} time - Delay in milliseconds
 * @returns {module:functionHelpers~delayHandler}
 */
const delay = function () {
  const time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0
  let cancel = () => undefined
  return {
    resolver: new Promise((resolve, reject) => {
      if (isNaN(time)) {
        reject(new Error('Invalid delay: '.concat(time)))
      } else {
        const timeoutId = setTimeout(resolve, time, 'Delayed for: '.concat(time))
        cancel = () => {
          clearTimeout(timeoutId)
          reject(new Error('Cancelled delay: '.concat(time)))
        }
      }
    }),
    cancel: cancel
  }
}
var _default = exports.default = delay
