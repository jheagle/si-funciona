'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/stable')

const _absoluteMax = _interopRequireDefault(require('./numbers/absoluteMax.js'))

const _absoluteMin = _interopRequireDefault(require('./numbers/absoluteMin.js'))

const _compare = _interopRequireDefault(require('./numbers/compare.js'))

const _randomInteger = _interopRequireDefault(require('./numbers/randomInteger.js'))

const _randomNumber = _interopRequireDefault(require('./numbers/randomNumber.js'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * Some number comparators and random number generators.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module numberHelpers
 * @memberOf module:functionalHelpers
 */
const _default = {
  absoluteMax: _absoluteMax.default,
  absoluteMin: _absoluteMin.default,
  compare: _compare.default,
  randomInteger: _randomInteger.default,
  randomNumber: _randomNumber.default
}
exports.default = _default
