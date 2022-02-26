'use strict'

require('core-js/modules/es.object.define-property.js')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/stable')

var _mergeObjectsBase = _interopRequireDefault(require('./mergeObjectsBase'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * Uses mergeObjectsBase deep merge objects and arrays, merge by value.
 * @function
 * @memberOf module:objectHelpers
 * @see {@link module:objectHelpers~mergeObjectsCallback}
 * @param {...Object} objects - Provide a list of objects which will be merged starting from the end up into the first
 * @returns {*}
 */
var mergeObjects = (0, _mergeObjectsBase.default)({
  useClone: true
})
var _default = mergeObjects
exports.default = _default
