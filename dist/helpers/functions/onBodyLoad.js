'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _queueManager = _interopRequireDefault(require('./queueManager'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt (value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value)
    })
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled (value) {
      try {
        step(generator.next(value))
      } catch (e) {
        reject(e)
      }
    }
    function rejected (value) {
      try {
        step(generator.throw(value))
      } catch (e) {
        reject(e)
      }
    }
    function step (result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
const queue = []
const manager = (0, _queueManager.default)()
manager.start()
let observer = null
const doReset = () => observer = null
const initializeObserver = () => __awaiter(void 0, void 0, void 0, function * () {
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
})
/**
 * Prepare functions to be called once the body is available.
 * @function
 * @memberOf module:functionHelpers
 * @param {Function} callback
 * @param {boolean} [reset=false]
 * @returns {Array.<Function>}
 */
const onBodyLoad = function (callback) {
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
var _default = exports.default = onBodyLoad
