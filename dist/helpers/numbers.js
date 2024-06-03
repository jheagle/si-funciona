'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _absoluteMax = _interopRequireDefault(require('./numbers/absoluteMax'))
var _absoluteMin = _interopRequireDefault(require('./numbers/absoluteMin'))
var _compare = _interopRequireDefault(require('./numbers/compare'))
var _randomInteger = _interopRequireDefault(require('./numbers/randomInteger'))
var _randomNumber = _interopRequireDefault(require('./numbers/randomNumber'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Some number comparators and random number generators.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module numberHelpers
 * @memberOf module:siFunciona
 */
var _default = exports.default = {
  absoluteMax: _absoluteMax.default,
  absoluteMin: _absoluteMin.default,
  compare: _compare.default,
  randomInteger: _randomInteger.default,
  randomNumber: _randomNumber.default
}
