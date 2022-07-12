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
 * Unset a nested property value an object.
 * @function
 * @memberOf module:objectHelpers
 * @param {Object} arrayObject - The array or object to set the property on
 * @param {string} dotNotation - The path for the property
 * @returns {Object} The modified object
 */
var dotUnset = function dotUnset (arrayObject, dotNotation) {
  var _arrayObject$key

  var key = (0, _strBefore.default)(dotNotation, '.')
  var lastKey = !key

  if (lastKey) {
    key = dotNotation
  }

  if (key === '*') {
    for (var wildKey in arrayObject) {
      if (lastKey) {
        delete arrayObject[wildKey]
        continue
      }

      if (!(0, _isObject.default)(arrayObject[wildKey])) {
        continue
      }

      dotUnset(arrayObject[wildKey], (0, _strAfter.default)(dotNotation, '.'))
    }

    return arrayObject
  }

  if (lastKey) {
    delete arrayObject[dotNotation]
    return arrayObject
  }

  var next = (_arrayObject$key = arrayObject[key]) !== null && _arrayObject$key !== void 0 ? _arrayObject$key : []
  arrayObject[key] = dotUnset(next, (0, _strAfter.default)(dotNotation, '.'))
  return arrayObject
}

var _default = dotUnset
exports.default = _default
