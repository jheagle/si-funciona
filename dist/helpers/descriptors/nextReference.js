'use strict'

require('core-js/modules/es.symbol.js')
require('core-js/modules/es.symbol.description.js')
require('core-js/modules/es.symbol.iterator.js')
require('core-js/modules/es.array.iterator.js')
require('core-js/modules/es.string.iterator.js')
require('core-js/modules/web.dom-collections.iterator.js')
require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/es.array.find.js')
require('core-js/modules/es.object.to-string.js')
require('core-js/modules/esnext.async-iterator.find.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.find.js')
require('core-js/stable')
var _objectKeys = _interopRequireDefault(require('../objects/objectKeys'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
function _typeof (obj) { '@babel/helpers - typeof'; return _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) { return typeof obj } : function (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj }, _typeof(obj) }
/**
 * Find the index of the next module:objectDescriptors.descriptorDetail to build a resource for.
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor
 * @param {number} currentReference
 * @returns {number|undefined}
 */
var nextReference = function nextReference (descriptor, currentReference) {
  return descriptor.references.find(function (nextRef) {
    if (nextRef <= currentReference) {
      return false
    }
    var val = descriptor.details[nextRef].value[descriptor.details[nextRef].value.length - 1]
    if (_typeof(val) !== 'object' || val === null || typeof val === 'undefined' || descriptor.details[nextRef].circular || descriptor.details[nextRef].isInstance) {
      return false
    }
    return !!(0, _objectKeys.default)(val).length
  })
}
var _default = nextReference
exports.default = _default
