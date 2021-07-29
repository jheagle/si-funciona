'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/stable')

const _buildArray = _interopRequireDefault(require('./arrays/buildArray'))

const _buildArrayOfReferences = _interopRequireDefault(require('./arrays/buildArrayOfReferences'))

const _compareArrays = _interopRequireDefault(require('./arrays/compareArrays'))

const _mergeArrays = _interopRequireDefault(require('./arrays/mergeArrays'))

const _uniqueArray = _interopRequireDefault(require('./arrays/uniqueArray'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * Some simple utility functions for generating arrays or performing work on arrays.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module arrayHelpers
 * @memberOf module:functionalHelpers
 */
const _default = {
  buildArray: _buildArray.default,
  buildArrayOfReferences: _buildArrayOfReferences.default,
  compareArrays: _compareArrays.default,
  mergeArrays: _mergeArrays.default,
  uniqueArray: _uniqueArray.default
}
exports.default = _default
