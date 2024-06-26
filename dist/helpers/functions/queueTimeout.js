'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
require('regenerator-runtime/runtime')
var _delay = _interopRequireDefault(require('./delay'))
var _queueManager = _interopRequireDefault(require('./queueManager'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Manage functions to run sequentially with delays.
 * @memberOf module:functionHelpers
 * @param {module:functionHelpers~queueManagerHandle} [queueManagerHandle=null]
 * @returns {module:functionHelpers~queueTimeoutHandle}
 */
const queueTimeout = function () {
  const queueManagerHandle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
  const manager = queueManagerHandle || (0, _queueManager.default)()
  manager.start()
  return function (fn) {
    const time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key]
    }
    return manager.push(() => (0, _delay.default)(time).resolver.then(() => fn(...args)))
  }
}
var _default = exports.default = queueTimeout
