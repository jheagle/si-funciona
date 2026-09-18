'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _BasicQueue = _interopRequireDefault(require('../arrays/BasicQueue'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Create an instance of a basic queue.
 * @memberOf module:functionHelpers
 * @param {Array} initialQueue
 * @returns {IsQueue}
 */
const makeBasicQueue = (initialQueue = []) => {
  return new _BasicQueue.default(initialQueue)
}
var _default = exports.default = makeBasicQueue
