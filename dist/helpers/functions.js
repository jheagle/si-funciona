'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _callWithParams = _interopRequireDefault(require('./functions/callWithParams'))
var _curry = _interopRequireDefault(require('./functions/curry'))
var _delay = _interopRequireDefault(require('./functions/delay'))
var _onBodyLoad = _interopRequireDefault(require('./functions/onBodyLoad'))
var _pipe = _interopRequireDefault(require('./functions/pipe'))
var _preloadParams = _interopRequireDefault(require('./functions/preloadParams'))
var _queueManager = _interopRequireDefault(require('./functions/queueManager'))
var _queueTimeout = _interopRequireDefault(require('./functions/queueTimeout'))
var _relevancyFilter = _interopRequireDefault(require('./functions/relevancyFilter'))
var _trace = _interopRequireDefault(require('./functions/trace'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Manage how functions are called with these utilities.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module functionHelpers
 * @memberOf module:siFunciona
 */
var _default = {
  callWithParams: _callWithParams.default,
  curry: _curry.default,
  delay: _delay.default,
  onBodyLoad: _onBodyLoad.default,
  pipe: _pipe.default,
  preloadParams: _preloadParams.default,
  queueManager: _queueManager.default,
  queueTimeout: _queueTimeout.default,
  relevancyFilter: _relevancyFilter.default,
  trace: _trace.default
}
exports.default = _default
