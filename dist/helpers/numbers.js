'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/stable')

const _absoluteMax = _interopRequireDefault(require('./numbers/absoluteMax'))

const _absoluteMin = _interopRequireDefault(require('./numbers/absoluteMin'))

const _compare = _interopRequireDefault(require('./numbers/compare'))

const _randomInteger = _interopRequireDefault(require('./numbers/randomInteger'))

const _randomNumber = _interopRequireDefault(require('./numbers/randomNumber'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * Some number comparators and random number generators.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module numberHelpers
 */
const _default = {
  absoluteMax: _absoluteMax.default,
  absoluteMin: _absoluteMin.default,
  compare: _compare.default,
  randomInteger: _randomInteger.default,
  randomNumber: _randomNumber.default
}
exports.default = _default
