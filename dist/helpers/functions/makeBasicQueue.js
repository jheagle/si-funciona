'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
const _BasicQueue = _interopRequireDefault(require('../arrays/BasicQueue'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Create an instance of a basic queue.
 * @memberOf module:functionHelpers
 * @param {Array} [initialQueue=[]] - Items to pre-populate the queue with, in order.
 * @returns {IsQueue}
 */
const makeBasicQueue = (initialQueue = []) => {
  return new _BasicQueue.default(initialQueue)
}
const _default = exports.default = makeBasicQueue
