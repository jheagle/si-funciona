'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/stable')

const _callWithParams = _interopRequireDefault(require('./functions/callWithParams.js'))

const _curry = _interopRequireDefault(require('./functions/curry.js'))

const _delay = _interopRequireDefault(require('./functions/delay.js'))

const _onBodyLoad = _interopRequireDefault(require('./functions/onBodyLoad.js'))

const _pipe = _interopRequireDefault(require('./functions/pipe.js'))

const _preloadParams = _interopRequireDefault(require('./functions/preloadParams.js'))

const _queueManager = _interopRequireDefault(require('./functions/queueManager.js'))

const _queueTimeout = _interopRequireDefault(require('./functions/queueTimeout.js'))

const _trace = _interopRequireDefault(require('./functions/trace.js'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * Manage how functions are called with these utilities.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module functionHelpers
 * @memberOf module:functionalHelpers
 */
const _default = {
  callWithParams: _callWithParams.default,
  curry: _curry.default,
  delay: _delay.default,
  onBodyLoad: _onBodyLoad.default,
  pipe: _pipe.default,
  preloadParams: _preloadParams.default,
  queueManager: _queueManager.default,
  queueTimeout: _queueTimeout.default,
  trace: _trace.default
}
exports.default = _default
