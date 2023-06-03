'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _mergeObjectsBase = _interopRequireDefault(require('./mergeObjectsBase'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Uses mergeObjectsBase deep merge objects and arrays, merge by reference.
 * @function
 * @memberOf module:objectHelpers
 * @see {@link module:objectHelpers~mergeObjectsCallback}
 * @param {...Object} objects - Provide a list of objects which will be merged starting from the end up into the first
 * @returns {*}
 */
const mergeObjectsMutable = (0, _mergeObjectsBase.default)()
var _default = mergeObjectsMutable
exports.default = _default
