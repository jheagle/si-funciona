'use strict'

require('core-js/modules/es.object.define-property.js')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.array.includes.js')

require('core-js/stable')

var _isObject = _interopRequireDefault(require('./isObject'))

var _objectKeys = _interopRequireDefault(require('./objectKeys'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * Check if the current object has inherited properties.
 * @function
 * @memberOf module:objectHelpers
 * @param {Object|Array} object
 * @returns {boolean}
 */
var isInstanceObject = function isInstanceObject (object) {
  if (typeof object !== 'function' && !(0, _isObject.default)(object)) {
    return false
  }

  if (!['Array', 'Function', 'Object'].includes(object.constructor.name)) {
    return true
  }

  return object.constructor.name !== 'Array' && (0, _objectKeys.default)(object, true).length > (0, _objectKeys.default)(object).length
}

var _default = isInstanceObject
exports.default = _default
