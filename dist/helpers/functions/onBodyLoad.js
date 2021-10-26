'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/stable')

const _queueManager = _interopRequireDefault(require('./queueManager'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

const queue = []
const manager = (0, _queueManager.default)()
let observer = null

const doReset = function doReset () {
  return observer = null
}

const initializeObserver = function initializeObserver () {
  observer = new MutationObserver(function () {
    if (document.body) {
      while (queue.length) {
        manager(queue.shift())
      }

      observer.disconnect()
      doReset()
    }
  })
  observer.observe(document.documentElement, {
    childList: true
  })
  return observer
}
/**
 * Prepare functions to be called once the body is available.
 * @function
 * @memberOf module:functionHelpers
 * @param {Function} callback
 * @param {boolean} [reset=false]
 * @returns {Array.<Function>}
 */

const onBodyLoad = function onBodyLoad (callback) {
  const reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false

  if (reset) {
    doReset()
  }

  queue.push(callback)

  if (observer === null) {
    initializeObserver()
  }

  return queue
}

const _default = onBodyLoad
exports.default = _default