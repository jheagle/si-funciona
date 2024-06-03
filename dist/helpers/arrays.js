'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _addUniqueToArray = _interopRequireDefault(require('./arrays/addUniqueToArray'))
var _BasicQueue = _interopRequireDefault(require('./arrays/BasicQueue'))
var _buildArray = _interopRequireDefault(require('./arrays/buildArray'))
var _buildArrayOfReferences = _interopRequireDefault(require('./arrays/buildArrayOfReferences'))
var _compareArrays = _interopRequireDefault(require('./arrays/compareArrays'))
var _mergeArrays = _interopRequireDefault(require('./arrays/mergeArrays'))
var _uniqueArray = _interopRequireDefault(require('./arrays/uniqueArray'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Some simple utility functions for generating arrays or performing work on arrays.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module arrayHelpers
 * @memberOf module:siFunciona
 */
var _default = exports.default = {
  addUniqueToArray: _addUniqueToArray.default,
  BasicQueue: _BasicQueue.default,
  buildArray: _buildArray.default,
  buildArrayOfReferences: _buildArrayOfReferences.default,
  compareArrays: _compareArrays.default,
  mergeArrays: _mergeArrays.default,
  uniqueArray: _uniqueArray.default
}
