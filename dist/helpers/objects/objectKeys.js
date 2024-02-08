'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _isObject = _interopRequireDefault(require('./isObject'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Get an array of keys from any object or array. Will return empty array when invalid or there are no keys.
 * Optional flag will include the inherited keys from prototype chain when set.
 * @memberOf module:objectHelpers
 * @param {Object|Array} object
 * @param {boolean} [includeInherited=false]
 * @returns {Array.<string|number>}
 */
const objectKeys = function (object) {
  const includeInherited = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false
  if (typeof object !== 'function' && !(0, _isObject.default)(object)) {
    return []
  }
  if (includeInherited) {
    const propNames = Object.getOwnPropertyNames(object)
    if (propNames.length) {
      return propNames
    }
  }
  const keys = []
  for (const key in object) {
    if (includeInherited || Object.prototype.hasOwnProperty.call(object, key)) {
      if (Array.isArray(object)) {
        keys.push(parseInt(key))
        continue
      }
      keys.push(key)
    }
  }
  return keys
}
var _default = exports.default = objectKeys
