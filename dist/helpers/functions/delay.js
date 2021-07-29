'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.object.to-string.js')

require('core-js/modules/es.promise.js')

require('core-js/stable')

require('regenerator-runtime/runtime')

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
const delay = function delay () {
  const time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0

  let cancel = function cancel () {
    return undefined
  }

  return {
    resolver: new Promise(function (resolve, reject) {
      if (isNaN(time)) {
        reject(new Error('Invalid delay: '.concat(time)))
      } else {
        const timeoutId = setTimeout(resolve, time, 'Delayed for: '.concat(time))

        cancel = function cancel () {
          clearTimeout(timeoutId)
          reject(new Error('Cancelled delay: '.concat(time)))
        }
      }
    }),
    cancel: cancel
  }
}

const _default = delay
exports.default = _default
