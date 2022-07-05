'use strict'

require('core-js/modules/es.object.define-property.js')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.array.concat.js')

require('core-js/modules/es.regexp.exec.js')

require('core-js/modules/es.string.split.js')

require('core-js/modules/es.array.slice.js')

require('core-js/modules/es.regexp.constructor.js')

require('core-js/modules/es.regexp.sticky.js')

require('core-js/modules/es.regexp.to-string.js')

require('core-js/modules/es.string.replace.js')

require('core-js/modules/es.string.match.js')

require('core-js/stable')

var _isObject = _interopRequireDefault(require('./isObject'))

var _strBeforeLast = _interopRequireDefault(require('../strings/strBeforeLast'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * Convert an array or object to a single dimensional associative array with dot notation.
 * @function
 * @memberOf module:objectHelpers
 * @param {Object} arrayObject - The array or object to dot-notate
 * @param {string} [prepend=''] - The path for the property being processed
 * @param {Object} [results={}] - The final array to return
 * @returns {Object} The dot-notated array
 */
var dotNotate = function dotNotate (arrayObject) {
  var prepend = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ''
  var results = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}

  for (var key in arrayObject) {
    var value = arrayObject[key]

    if ((0, _isObject.default)(value)) {
      var nestedKey = ''.concat(prepend).concat(key)
      var allMatches = []
      var prepends = nestedKey.split('.')

      if (prepends.length > 1) {
        var lastTwoPrepends = prepends.slice(prepends.length - 2).join('.')
        var lastPrependsRegex = new RegExp(lastTwoPrepends.replace('\.', '\\.'), 'g')
        allMatches = nestedKey.match(lastPrependsRegex) || []
      }

      if (allMatches.length > 1) {
        return results
      }

      dotNotate(value, ''.concat(nestedKey, '.'), results)
      continue
    }

    results[prepend + key] = value
  }

  return results
}

var _default = dotNotate
exports.default = _default
