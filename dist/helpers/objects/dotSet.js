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
 * Set a nested property value an object.
 * @function
 * @memberOf module:objectHelpers
 * @param {Object} arrayObject - The array or object to set the property on
 * @param {string} dotNotation - The path for the property
 * @param {*} value - The default value to return if the property is not found
 * @returns {Object} The modified object
 */
var dotSet = function dotSet (arrayObject, dotNotation) {
  var _arrayObject$key

  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null
  var key = (0, _strBefore.default)(dotNotation, '.')
  var lastKey = !key

  if (lastKey) {
    key = dotNotation
  }

  if (key === '*') {
    for (var wildKey in arrayObject) {
      if (lastKey) {
        arrayObject[wildKey] = value
        continue
      }

      if (!(0, _isObject.default)(arrayObject[wildKey])) {
        continue
      }

      dotSet(arrayObject[wildKey], (0, _strAfter.default)(dotNotation, '.'), value)
    }

    return arrayObject
  }

  if (lastKey) {
    arrayObject[dotNotation] = value
    return arrayObject
  }

  var next = (_arrayObject$key = arrayObject[key]) !== null && _arrayObject$key !== void 0 ? _arrayObject$key : []
  arrayObject[key] = dotSet(next, (0, _strAfter.default)(dotNotation, '.'), value)
  return arrayObject
}

var _default = dotSet
exports.default = _default
