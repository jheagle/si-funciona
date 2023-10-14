'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
require('regenerator-runtime/runtime')
/**
 * Manage functions to run sequentially.
 * @function
 * @memberOf module:functionHelpers
 * @param {Iterable|array} [queue=[]] - The iterable that can be used to store queued functions
 * @returns {module:functionHelpers~queueManagerHandle}
 */
const queueManager = function () {
  const queue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  let isRunning = false
  return function (fn) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key]
    }
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
      }())
      generator.next()
      queue.push({
        item: {
          fn: fn,
          args: args
        },
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
var _default = exports.default = queueManager
