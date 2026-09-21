'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
Object.defineProperty(exports, 'absoluteMax', {
  enumerable: true,
  get: function () {
    return _absoluteMax.default
  }
})
Object.defineProperty(exports, 'absoluteMin', {
  enumerable: true,
  get: function () {
    return _absoluteMin.default
  }
})
Object.defineProperty(exports, 'compare', {
  enumerable: true,
  get: function () {
    return _compare.default
  }
})
exports.default = void 0
Object.defineProperty(exports, 'greatestCommonDivisor', {
  enumerable: true,
  get: function () {
    return _greatestCommonDivisor.default
  }
})
Object.defineProperty(exports, 'leastCommonMultiple', {
  enumerable: true,
  get: function () {
    return _leastCommonMultiple.default
  }
})
Object.defineProperty(exports, 'lowestCommonDenominator', {
  enumerable: true,
  get: function () {
    return _lowestCommonDenominator.default
  }
})
Object.defineProperty(exports, 'randomInteger', {
  enumerable: true,
  get: function () {
    return _randomInteger.default
  }
})
Object.defineProperty(exports, 'randomNumber', {
  enumerable: true,
  get: function () {
    return _randomNumber.default
  }
})
Object.defineProperty(exports, 'simplestRatio', {
  enumerable: true,
  get: function () {
    return _simplestRatio.default
  }
})
require('core-js/stable')
var _absoluteMax = _interopRequireDefault(require('./numbers/absoluteMax'))
var _absoluteMin = _interopRequireDefault(require('./numbers/absoluteMin'))
var _compare = _interopRequireDefault(require('./numbers/compare'))
var _greatestCommonDivisor = _interopRequireDefault(require('./numbers/greatestCommonDivisor'))
var _leastCommonMultiple = _interopRequireDefault(require('./numbers/leastCommonMultiple'))
var _lowestCommonDenominator = _interopRequireDefault(require('./numbers/lowestCommonDenominator'))
var _randomInteger = _interopRequireDefault(require('./numbers/randomInteger'))
var _randomNumber = _interopRequireDefault(require('./numbers/randomNumber'))
var _simplestRatio = _interopRequireDefault(require('./numbers/simplestRatio'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Some number comparators and random number generators.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module numberHelpers
 * @memberOf module:siFunciona
 */
const _default = exports.default = {
  absoluteMax: _absoluteMax.default,
  absoluteMin: _absoluteMin.default,
  compare: _compare.default,
  greatestCommonDivisor: _greatestCommonDivisor.default,
  leastCommonMultiple: _leastCommonMultiple.default,
  lowestCommonDenominator: _lowestCommonDenominator.default,
  randomInteger: _randomInteger.default,
  randomNumber: _randomNumber.default,
  simplestRatio: _simplestRatio.default
}
