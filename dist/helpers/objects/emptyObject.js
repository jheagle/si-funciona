'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
const _isObject = _interopRequireDefault(require('./isObject'))
const _objectKeys = _interopRequireDefault(require('./objectKeys'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Helper function for testing if the item is an Object or Array that does not have any properties
 * @param item - Object or Array to test
 */
const emptyObject = item => (typeof item === 'function' || (0, _isObject.default)(item)) && !(0, _objectKeys.default)(item).length
const _default = exports.default = emptyObject
