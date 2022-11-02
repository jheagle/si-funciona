'use strict'

require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
require('regenerator-runtime/runtime')
var _delay = _interopRequireDefault(require('./delay'))
var _queueManager = _interopRequireDefault(require('./queueManager'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Run Timeout functions one after the otherin queue.
 * @typedef {Function} module:functionHelpers~queueTimeoutHandle
 * @memberOf module:functionHelpers
 * @param {Function} fn - A callback function to be performed at some time in the future.
 * @param {number} time - The time in milliseconds to delay.
 * @param {...*} args - Arguments to be passed to the callback once it is implemented.
 * @returns {Promise}
 */

/**
 * Manage functions to run sequentially with delays.
 * @function
 * @memberOf module:functionHelpers
 * @param {module:functionHelpers~queueManagerHandle} [queueManagerHandle=null]
 * @returns {module:functionHelpers~queueTimeoutHandle}
 */
var queueTimeout = function queueTimeout () {
  var queueManagerHandle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
  var manager = queueManagerHandle || (0, _queueManager.default)()
  return function (fn) {
    var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key]
    }
    return manager(function () {
      return (0, _delay.default)(time).resolver.then(function () {
        return fn.apply(void 0, args)
      })
    })
  }
}
var _default = queueTimeout
exports.default = _default
