'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('regenerator-runtime/runtime')
const _cloneObject = _interopRequireDefault(require('../objects/cloneObject'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Output the value with label to the console and return the value to not interrupt the code - useful for
 * inspecting a value mid-pipe/mid-chain without altering the result.
 * @param label - Pass an identifying label of the value being output.
 * @param useClone - Determines if the logged data should be a clone of the original to preserve
 * its state at the time of logging (rather than a live reference that may show later mutations).
 */
const trace = (label, useClone = true) => value => {
  // noinspection JSForgottenDebugStatementInspection
  console.info(`${label}: `, useClone ? (0, _cloneObject.default)(value) : value)
  return value
}
const _default = exports.default = trace
