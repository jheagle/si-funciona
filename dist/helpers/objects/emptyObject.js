'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _isObject = _interopRequireDefault(require('./isObject'))
var _objectKeys = _interopRequireDefault(require('./objectKeys'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Helper function for testing if the item is an Object or Array that does not have any properties
 * @function
 * @memberOf module:objectHelpers
 * @param {Object|Array} item - Object or Array to test
 * @returns {boolean}
 */
const emptyObject = item => (typeof item === 'function' || (0, _isObject.default)(item)) && !(0, _objectKeys.default)(item).length
var _default = emptyObject
exports.default = _default
