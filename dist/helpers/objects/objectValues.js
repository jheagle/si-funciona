'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.async-iterator.map.js')
require('core-js/modules/esnext.iterator.map.js')
require('core-js/stable')
var _objectKeys = _interopRequireDefault(require('./objectKeys'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Get an array of values from any object or array. Will return empty array when invalid or there are no values.
 * Optional flag will include the inherited values from prototype chain when set.
 * @memberOf module:objectHelpers
 * @param {Object|Array} object
 * @param {boolean} [includeInherited=false]
 * @returns {Array}
 */
const objectValues = function (object) {
  const includeInherited = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false
  return (0, _objectKeys.default)(object, includeInherited).map(key => object[key])
}
var _default = exports.default = objectValues
