'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _mergeObjectsBase = _interopRequireDefault(require('./mergeObjectsBase'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Uses mergeObjectsBase deep merge objects and arrays, merge by reference.
 * @memberOf module:objectHelpers
 * @see {@link module:objectHelpers~mergeObjectsCallback}
 * @param {...Object} objects - Provide a list of objects which will be merged starting from the end up into the first
 * @returns {*}
 */
const mergeObjectsMutable = (0, _mergeObjectsBase.default)()
var _default = exports.default = mergeObjectsMutable
