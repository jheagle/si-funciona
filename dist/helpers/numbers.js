'use strict'

require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _absoluteMax = _interopRequireDefault(require('./numbers/absoluteMax.js'))
var _absoluteMin = _interopRequireDefault(require('./numbers/absoluteMin.js'))
var _compare = _interopRequireDefault(require('./numbers/compare.js'))
var _randomInteger = _interopRequireDefault(require('./numbers/randomInteger.js'))
var _randomNumber = _interopRequireDefault(require('./numbers/randomNumber.js'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Some number comparators and random number generators.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module numberHelpers
 * @memberOf module:functionalHelpers
 */
var _default = {
  absoluteMax: _absoluteMax.default,
  absoluteMin: _absoluteMin.default,
  compare: _compare.default,
  randomInteger: _randomInteger.default,
  randomNumber: _randomNumber.default
}
exports.default = _default
