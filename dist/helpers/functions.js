'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
Object.defineProperty(exports, 'callWithParams', {
  enumerable: true,
  get: function () {
    return _callWithParams.default
  }
})
Object.defineProperty(exports, 'curry', {
  enumerable: true,
  get: function () {
    return _curry.default
  }
})
exports.default = void 0
Object.defineProperty(exports, 'delay', {
  enumerable: true,
  get: function () {
    return _delay.default
  }
})
Object.defineProperty(exports, 'makeBasicQueue', {
  enumerable: true,
  get: function () {
    return _makeBasicQueue.default
  }
})
Object.defineProperty(exports, 'onBodyLoad', {
  enumerable: true,
  get: function () {
    return _onBodyLoad.default
  }
})
Object.defineProperty(exports, 'pipe', {
  enumerable: true,
  get: function () {
    return _pipe.default
  }
})
Object.defineProperty(exports, 'preloadParams', {
  enumerable: true,
  get: function () {
    return _preloadParams.default
  }
})
Object.defineProperty(exports, 'queueManager', {
  enumerable: true,
  get: function () {
    return _queueManager.default
  }
})
Object.defineProperty(exports, 'queueTimeout', {
  enumerable: true,
  get: function () {
    return _queueTimeout.default
  }
})
Object.defineProperty(exports, 'relevancyFilter', {
  enumerable: true,
  get: function () {
    return _relevancyFilter.default
  }
})
Object.defineProperty(exports, 'trace', {
  enumerable: true,
  get: function () {
    return _trace.default
  }
})
require('core-js/stable')
var _callWithParams = _interopRequireDefault(require('./functions/callWithParams'))
var _curry = _interopRequireDefault(require('./functions/curry'))
var _delay = _interopRequireDefault(require('./functions/delay'))
var _makeBasicQueue = _interopRequireDefault(require('./functions/makeBasicQueue'))
var _onBodyLoad = _interopRequireDefault(require('./functions/onBodyLoad'))
var _pipe = _interopRequireDefault(require('./functions/pipe'))
var _preloadParams = _interopRequireDefault(require('./functions/preloadParams'))
var _queueManager = _interopRequireDefault(require('./functions/queueManager'))
var _queueTimeout = _interopRequireDefault(require('./functions/queueTimeout'))
var _relevancyFilter = _interopRequireDefault(require('./functions/relevancyFilter'))
var _trace = _interopRequireDefault(require('./functions/trace'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Manage how functions are called with these utilities.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module functionHelpers
 * @memberOf module:siFunciona
 */
const _default = exports.default = {
  callWithParams: _callWithParams.default,
  curry: _curry.default,
  delay: _delay.default,
  makeBasicQueue: _makeBasicQueue.default,
  onBodyLoad: _onBodyLoad.default,
  pipe: _pipe.default,
  preloadParams: _preloadParams.default,
  queueManager: _queueManager.default,
  queueTimeout: _queueTimeout.default,
  relevancyFilter: _relevancyFilter.default,
  trace: _trace.default
}
