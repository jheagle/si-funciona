'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
require('regenerator-runtime/runtime')
var _cloneObject = _interopRequireDefault(require('../objects/cloneObject'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Output the value with label to the console and return the value to not interrupt the code.
 * @function
 * @memberOf module:functionHelpers
 * @param {string} label - Pass an identifying label of the value being output.
 * @param useClone - Determines if the logged data should be a clone of the original to preserve state.
 * @returns {function(*=)}
 */
const trace = function (label) {
  const useClone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true
  return value => {
    // noinspection JSForgottenDebugStatementInspection
    console.info(''.concat(label, ': '), useClone ? (0, _cloneObject.default)(value) : value)
    return value
  }
}
var _default = exports.default = trace
