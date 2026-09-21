'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
Object.defineProperty(exports, 'BasicQueue', {
  enumerable: true,
  get: function () {
    return _BasicQueue.default
  }
})
Object.defineProperty(exports, 'addUniqueToArray', {
  enumerable: true,
  get: function () {
    return _addUniqueToArray.default
  }
})
Object.defineProperty(exports, 'buildArray', {
  enumerable: true,
  get: function () {
    return _buildArray.default
  }
})
Object.defineProperty(exports, 'buildArrayOfReferences', {
  enumerable: true,
  get: function () {
    return _buildArrayOfReferences.default
  }
})
Object.defineProperty(exports, 'compareArrays', {
  enumerable: true,
  get: function () {
    return _compareArrays.default
  }
})
exports.default = void 0
Object.defineProperty(exports, 'mergeArrays', {
  enumerable: true,
  get: function () {
    return _mergeArrays.default
  }
})
Object.defineProperty(exports, 'uniqueArray', {
  enumerable: true,
  get: function () {
    return _uniqueArray.default
  }
})
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
 * Utilities for building, merging, deduplicating and comparing arrays, plus a basic FIFO queue (BasicQueue) for
 * use with functionHelpers' queueManager/queueTimeout.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module arrayHelpers
 * @memberOf module:siFunciona
 */
const _default = exports.default = {
  addUniqueToArray: _addUniqueToArray.default,
  BasicQueue: _BasicQueue.default,
  buildArray: _buildArray.default,
  buildArrayOfReferences: _buildArrayOfReferences.default,
  compareArrays: _compareArrays.default,
  mergeArrays: _mergeArrays.default,
  uniqueArray: _uniqueArray.default
}
