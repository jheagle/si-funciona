'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/stable')

const _isObject = _interopRequireDefault(require('./isObject'))

const _objectKeys = _interopRequireDefault(require('./objectKeys'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * Helper function for testing if the item is an Object or Array that does not have any properties
 * @function
 * @param {Object|Array} item - Object or Array to test
 * @returns {boolean}
 */
const emptyObject = function emptyObject (item) {
  return (typeof item === 'function' || (0, _isObject.default)(item)) && !(0, _objectKeys.default)(item).length
}

const _default = emptyObject
exports.default = _default
