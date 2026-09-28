'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
const _queueManager = _interopRequireDefault(require('./queueManager'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
const queue = []
const manager = (0, _queueManager.default)()
manager.start()
let observer = null
const doReset = () => observer = null
const initializeObserver = async () => {
  observer = new MutationObserver(() => {
    if (document.body) {
      while (queue.length) {
        manager.push(queue.shift())
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
 * @param callback
 * @param reset
 */
const onBodyLoad = (callback, reset = false) => {
  if (reset) {
    doReset()
  }
  queue.push(callback)
  if (observer === null) {
    initializeObserver()
  }
  return queue
}
const _default = exports.default = onBodyLoad
