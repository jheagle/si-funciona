'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _BasicQueue = _interopRequireDefault(require('../arrays/BasicQueue'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Create an instance of a basic queue.
 * @memberOf module:functionHelpers
 * @param {Array} initialQueue
 * @returns {IsQueue}
 */
const makeBasicQueue = function () {
  const initialQueue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  return new _BasicQueue.default(initialQueue)
}
var _default = exports.default = makeBasicQueue
