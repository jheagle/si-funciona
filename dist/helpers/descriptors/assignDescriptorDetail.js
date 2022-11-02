'use strict'

require('core-js/modules/es.symbol.js')
require('core-js/modules/es.symbol.description.js')
require('core-js/modules/es.symbol.iterator.js')
require('core-js/modules/es.array.iterator.js')
require('core-js/modules/es.string.iterator.js')
require('core-js/modules/web.dom-collections.iterator.js')
require('core-js/modules/es.array.from.js')
require('core-js/modules/es.array.slice.js')
require('core-js/modules/es.regexp.exec.js')
require('core-js/modules/es.regexp.test.js')
require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/es.array.reduce.js')
require('core-js/modules/es.object.to-string.js')
require('core-js/modules/esnext.async-iterator.reduce.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.reduce.js')
require('core-js/modules/es.array.concat.js')
require('core-js/modules/es.array.find.js')
require('core-js/modules/esnext.async-iterator.find.js')
require('core-js/modules/esnext.iterator.find.js')
require('core-js/stable')
var _cloneDescriptorDetail = _interopRequireDefault(require('./cloneDescriptorDetail'))
var _uniqueArray = _interopRequireDefault(require('../arrays/uniqueArray'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
function _toConsumableArray (arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread() }
function _nonIterableSpread () { throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.') }
function _unsupportedIterableToArray (o, minLen) { if (!o) return; if (typeof o === 'string') return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) n = o.constructor.name; if (n === 'Map' || n === 'Set') return Array.from(o); if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen) }
function _iterableToArray (iter) { if (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null || iter['@@iterator'] != null) return Array.from(iter) }
function _arrayWithoutHoles (arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr) }
function _arrayLikeToArray (arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i] } return arr2 }
/**
 * Assign properties from other details onto an existing detail.
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptorDetail} originalDetail
 * @param  {...module:objectDescriptors~descriptorDetail} details
 * @returns {module:objectDescriptors~descriptorDetail}
 */
var assignDescriptorDetail = function assignDescriptorDetail (originalDetail) {
  for (var _len = arguments.length, details = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    details[_key - 1] = arguments[_key]
  }
  return details.reduce(function (existingDetail, newDetail) {
    existingDetail.type = (0, _uniqueArray.default)([].concat(_toConsumableArray(existingDetail.type), _toConsumableArray(newDetail.type)))
    existingDetail.value = (0, _uniqueArray.default)([].concat(_toConsumableArray(existingDetail.value), _toConsumableArray(newDetail.value)))
    existingDetail.nullable = existingDetail.nullable || newDetail.nullable
    existingDetail.optional = existingDetail.optional || newDetail.optional
    existingDetail.circular = existingDetail.circular || newDetail.circular
    existingDetail.isReference = existingDetail.isReference || newDetail.isReference
    existingDetail.isInstance = existingDetail.isInstance || newDetail.isInstance
    existingDetail.arrayReference = [existingDetail.arrayReference, newDetail.arrayReference].find(function (ref) {
      return typeof ref === 'number'
    })
    existingDetail.objectReference = [existingDetail.objectReference, newDetail.objectReference].find(function (ref) {
      return typeof ref === 'number'
    })
    existingDetail.arrayReference = typeof existingDetail.arrayReference === 'undefined' ? null : existingDetail.arrayReference
    existingDetail.objectReference = typeof existingDetail.objectReference === 'undefined' ? null : existingDetail.objectReference
    return existingDetail
  }, (0, _cloneDescriptorDetail.default)(originalDetail))
}
var _default = assignDescriptorDetail
exports.default = _default
