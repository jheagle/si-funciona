'use strict'

require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _callWithParams = _interopRequireDefault(require('./functions/callWithParams.js'))
var _curry = _interopRequireDefault(require('./functions/curry.js'))
var _delay = _interopRequireDefault(require('./functions/delay.js'))
var _onBodyLoad = _interopRequireDefault(require('./functions/onBodyLoad.js'))
var _pipe = _interopRequireDefault(require('./functions/pipe.js'))
var _preloadParams = _interopRequireDefault(require('./functions/preloadParams.js'))
var _queueManager = _interopRequireDefault(require('./functions/queueManager.js'))
var _queueTimeout = _interopRequireDefault(require('./functions/queueTimeout.js'))
var _trace = _interopRequireDefault(require('./functions/trace.js'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Manage how functions are called with these utilities.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module functionHelpers
 * @memberOf module:functionalHelpers
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
  trace: _trace.default
}
exports.default = _default
