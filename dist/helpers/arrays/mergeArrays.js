'use strict'

require('core-js/modules/es.symbol.js')

require('core-js/modules/es.symbol.description.js')

require('core-js/modules/es.object.to-string.js')

require('core-js/modules/es.symbol.iterator.js')

require('core-js/modules/es.array.iterator.js')

require('core-js/modules/es.string.iterator.js')

require('core-js/modules/web.dom-collections.iterator.js')

require('core-js/modules/es.array.from.js')

require('core-js/modules/es.array.slice.js')

require('core-js/modules/es.function.name.js')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.array.reduce.js')

require('core-js/modules/es.array.map.js')

require('core-js/modules/es.array.concat.js')

require('core-js/modules/es.array.filter.js')

require('core-js/modules/es.array.includes.js')

require('core-js/modules/es.string.includes.js')

require('core-js/stable')

const _uniqueArray = _interopRequireDefault(require('./uniqueArray'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

function _toConsumableArray (arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread() }

function _nonIterableSpread () { throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.') }

function _unsupportedIterableToArray (o, minLen) { if (!o) return; if (typeof o === 'string') return _arrayLikeToArray(o, minLen); let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) n = o.constructor.name; if (n === 'Map' || n === 'Set') return Array.from(o); if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen) }

function _iterableToArray (iter) { if (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null || iter['@@iterator'] != null) return Array.from(iter) }

function _arrayWithoutHoles (arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr) }

function _arrayLikeToArray (arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i] } return arr2 }

/**
 * Take multiple arrays and then filter all these into one unique array.
 * @function
 * @memberOf module:arrayHelpers
 * @param {...Array} arrays - Provide multiple arrays to create one unique array
 * @returns {Array}
 */
const mergeArrays = function mergeArrays () {
  for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
    arrays[_key] = arguments[_key]
  }

  return arrays.map(_uniqueArray.default).reduce(function (merged, arr) {
    return [].concat(_toConsumableArray(merged), _toConsumableArray(arr.filter(function (attr) {
      return !merged.includes(attr)
    })))
  }, [])
}

const _default = mergeArrays
exports.default = _default
