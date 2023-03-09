'use strict'

require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _addUniqueToArray = _interopRequireDefault(require('./arrays/addUniqueToArray.js'))
var _buildArray = _interopRequireDefault(require('./arrays/buildArray.js'))
var _buildArrayOfReferences = _interopRequireDefault(require('./arrays/buildArrayOfReferences.js'))
var _compareArrays = _interopRequireDefault(require('./arrays/compareArrays.js'))
var _mergeArrays = _interopRequireDefault(require('./arrays/mergeArrays.js'))
var _uniqueArray = _interopRequireDefault(require('./arrays/uniqueArray.js'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Some simple utility functions for generating arrays or performing work on arrays.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module arrayHelpers
 * @memberOf module:siFunciona
 */
var _default = {
  addUniqueToArray: _addUniqueToArray.default,
  buildArray: _buildArray.default,
  buildArrayOfReferences: _buildArrayOfReferences.default,
  compareArrays: _compareArrays.default,
  mergeArrays: _mergeArrays.default,
  uniqueArray: _uniqueArray.default
}
exports.default = _default
