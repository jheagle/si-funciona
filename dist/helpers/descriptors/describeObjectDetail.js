'use strict'

require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/es.symbol.js')
require('core-js/modules/es.symbol.description.js')
require('core-js/modules/es.object.to-string.js')
require('core-js/modules/es.symbol.iterator.js')
require('core-js/modules/es.array.iterator.js')
require('core-js/modules/es.string.iterator.js')
require('core-js/modules/web.dom-collections.iterator.js')
require('core-js/stable')
var _emptyObject = _interopRequireDefault(require('../objects/emptyObject'))
var _isCloneable = _interopRequireDefault(require('../objects/isCloneable'))
var _isInstanceObject = _interopRequireDefault(require('../objects/isInstanceObject'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
function _typeof (obj) { '@babel/helpers - typeof'; return _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) { return typeof obj } : function (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj }, _typeof(obj) }
/**
 * Trace an object's attribute and provide details about it.
 * @function
 * @memberOf module:objectDescriptors
 * @param {*} value
 * @param {string|number} [key=0]
 * @param {number} [index=0]
 * @returns {module:objectDescriptors~descriptorDetail}
 */
var describeObjectDetail = function describeObjectDetail (value) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0
  var type = _typeof(value)
  return {
    index: index,
    key: key,
    type: [type],
    value: [value],
    nullable: value === null,
    optional: false,
    circular: false,
    isReference: (0, _isCloneable.default)(value) && !(0, _emptyObject.default)(value),
    isInstance: (0, _isInstanceObject.default)(value),
    arrayReference: null,
    objectReference: null
  }
}
var _default = describeObjectDetail
exports.default = _default
