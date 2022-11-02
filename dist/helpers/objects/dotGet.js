'use strict'

require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _isObject = _interopRequireDefault(require('./isObject'))
var _strAfter = _interopRequireDefault(require('../strings/strAfter'))
var _strBefore = _interopRequireDefault(require('../strings/strBefore'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Get a nested property value from an object.
 * @function
 * @memberOf module:objectHelpers
 * @param {Object} arrayObject - The array or object to get the property from
 * @param {string} dotNotation - The path to the property
 * @param {string|null} [defaultValue=null] - The default value to return if the property is not found
 * @returns {*} The value of the property
 */
var dotGet = function dotGet (arrayObject, dotNotation) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null
  var key = (0, _strBefore.default)(dotNotation, '.')
  var lastKey = !key
  if (lastKey) {
    key = dotNotation
  }
  if (key === '*') {
    var result = []
    for (var wildKey in arrayObject) {
      var wildValue = arrayObject[wildKey]
      if (lastKey) {
        result[wildKey] = wildValue
        continue
      }
      if (!(0, _isObject.default)(wildValue)) {
        continue
      }
      result[wildKey] = dotGet(wildValue, (0, _strAfter.default)(dotNotation, '.'), defaultValue)
    }
    return result
  }
  if (lastKey) {
    var _arrayObject$dotNotat
    return (_arrayObject$dotNotat = arrayObject[dotNotation]) !== null && _arrayObject$dotNotat !== void 0 ? _arrayObject$dotNotat : defaultValue
  }
  if (typeof arrayObject[key] === 'undefined') {
    return defaultValue
  }
  var next = arrayObject[key]
  if (!(0, _isObject.default)(next)) {
    return defaultValue
  }
  return dotGet(next, (0, _strAfter.default)(dotNotation, '.'), defaultValue)
}
var _default = dotGet
exports.default = _default
