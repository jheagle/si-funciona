'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
require('regenerator-runtime/runtime')
var _cloneObject = _interopRequireDefault(require('../objects/cloneObject'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Output the value with label to the console and return the value to not interrupt the code - useful for
 * inspecting a value mid-pipe/mid-chain without altering the result.
 * @memberOf module:functionHelpers
 * @param {string} label - Pass an identifying label of the value being output.
 * @param {boolean} [useClone=true] - Determines if the logged data should be a clone of the original to preserve
 * its state at the time of logging (rather than a live reference that may show later mutations).
 * @returns {function(*=)}
 */
const trace = (label, useClone = true) => value => {
  // noinspection JSForgottenDebugStatementInspection
  console.info(`${label}: `, useClone ? (0, _cloneObject.default)(value) : value)
  return value
}
var _default = exports.default = trace
