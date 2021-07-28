'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.array.includes.js')

require('core-js/modules/es.function.name.js')

require('core-js/stable')

const _isObject = _interopRequireDefault(require('./isObject'))

const _objectKeys = _interopRequireDefault(require('./objectKeys'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * Check if the current object has inherited properties.
 * @param {Object|Array} object
 * @returns {boolean}
 */
const isInstanceObject = function isInstanceObject (object) {
  if (typeof object !== 'function' && !(0, _isObject.default)(object)) {
    return false
  }

  if (!['Array', 'Function', 'Object'].includes(object.constructor.name)) {
    return true
  }

  return object.constructor.name !== 'Array' && (0, _objectKeys.default)(object, true).length > (0, _objectKeys.default)(object).length
}

const _default = isInstanceObject
exports.default = _default
