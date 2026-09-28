'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('regenerator-runtime/runtime')
const _delay = _interopRequireDefault(require('./delay'))
const _queueManager = _interopRequireDefault(require('./queueManager'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Manage functions to run sequentially with delays.
 * @param queueManagerHandle
 */
const queueTimeout = (queueManagerHandle = null) => {
  const manager = queueManagerHandle || (0, _queueManager.default)()
  manager.start()
  return (fn, time = 0, ...args) => manager.push(() => (0, _delay.default)(time).resolver.then(() => fn(...args)))
}
const _default = exports.default = queueTimeout
