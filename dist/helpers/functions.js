'use strict'

require('core-js/modules/es.symbol')

require('core-js/modules/es.symbol.description')

require('core-js/modules/es.symbol.iterator')

require('core-js/modules/es.array.concat')

require('core-js/modules/es.array.from')

require('core-js/modules/es.array.iterator')

require('core-js/modules/es.array.reduce')

require('core-js/modules/es.array.slice')

require('core-js/modules/es.array.splice')

require('core-js/modules/es.function.name')

require('core-js/modules/es.object.to-string')

require('core-js/modules/es.promise')

require('core-js/modules/es.regexp.to-string')

require('core-js/modules/es.string.iterator')

require('core-js/modules/web.dom-collections.iterator')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.queueTimeout = exports.queueManager = exports.delay = exports.preloadParams = exports.callWithParams = exports.pipe = exports.curry = void 0

require('regenerator-runtime/runtime')

require('core-js/stable')

function _toConsumableArray (arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread() }

function _nonIterableSpread () { throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.') }

function _unsupportedIterableToArray (o, minLen) { if (!o) return; if (typeof o === 'string') return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) n = o.constructor.name; if (n === 'Map' || n === 'Set') return Array.from(o); if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen) }

function _iterableToArray (iter) { if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(iter)) return Array.from(iter) }

function _arrayWithoutHoles (arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr) }

function _arrayLikeToArray (arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i] } return arr2 }

/**
 * Return a curried version of the passed function.
 * The returned function expects the same number of arguments minus the ones provided.
 * fn is the name of the function being curried.
 * @function
 * @param {Function} fn - Receives a function to be curried
 * @returns {Function|*}
 */
var curry = function curry (fn) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }

    return args.length >= fn.length ? fn.apply(void 0, args) : function () {
      for (var _len2 = arguments.length, a = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        a[_key2] = arguments[_key2]
      }

      return curry(fn).apply(void 0, [].concat(args, a))
    }
  }
}
/**
 * Take one or more function with a single parameter and return value.
 * Pass a paramter and the value will be transformed by each function then returned.
 * @function
 * @param {...Function} fns - Takes a series of functions having the same parameter
 * @returns {*}
 */

exports.curry = curry

var pipe = function pipe () {
  for (var _len3 = arguments.length, fns = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    fns[_key3] = arguments[_key3]
  }

  return function (x) {
    return fns.reduce(function (y, f) {
      return f(y)
    }, x)
  }
}
/**
 * Given a function, call with the correct number of paramters from an array of possible parameters.
 * @function
 * @param {Function} fn - The function to be called
 * @param {Array} params - Array of possible function parameters
 * @param {number} [minimum=2] - Minimumn number of parameters to use in the function
 * @returns {*}
 */

exports.pipe = pipe

var callWithParams = function callWithParams (fn) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : []
  var minimum = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2
  return fn.apply(void 0, _toConsumableArray(params.slice(0, fn.length || minimum)))
}
/**
 * The return function which takes the missing parameter in order to call the preloaded function.
 * @typedef {Function} callWithMissing
 * @param {*} missing - The missing parameter to be applied
 * @returns {*}
 */

/**
 * Provide an array of parameters to be used with a function, allow the function to be called later
 * with the missing parameter.
 * @function
 * @param {Function} fn - The function to be called
 * @param {Array} params - The parameters to preload
 * @param {number} [unassignedParam=0] - Position of missing parameter (zero indexed)
 * @returns {module:functionHelpers~callWithMissing}
 */

exports.callWithParams = callWithParams

var preloadParams = function preloadParams (fn) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : []
  var unassignedParam = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0
  return function (missing) {
    params.splice(unassignedParam, 0, missing)
    return fn.apply(void 0, _toConsumableArray(params))
  }
}
/**
 * Provide a way to cancel a request or attach a resolve event.
 * @typedef {Object} delayHandler
 * @property {Promise} resolver
 * @property {Function} cancel
 */

/**
 * Provide a timeout which returns a promise.
 * @function
 * @param {number} time - Delay in milliseconds
 * @returns {delayHandler}
 */

exports.preloadParams = preloadParams

var delay = function delay () {
  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0

  var cancel = function cancel () {
    return undefined
  }

  return {
    resolver: new Promise(function (resolve, reject) {
      if (isNaN(time)) {
        reject(new Error('Invalid delay: '.concat(time)))
      } else {
        var timeoutId = setTimeout(resolve, time, 'Delayed for: '.concat(time))

        cancel = function cancel () {
          clearTimeout(timeoutId)
          reject(new Error('Cancelled delay: '.concat(time)))
        }
      }
    }),
    cancel: cancel
  }
}
/**
 * Each time queue handle is called the passed function is added to the queue to be called when ready.
 * @typedef {Function} queueManagerHandle
 * @param {Function} fn - A function to enqueue
 * @param  {...*} args - Arguments to be passed to the function once it is ready
 * @returns {Promise}
 */

/**
 * Manage functions to run sequentially.
 * @function
 * @param {Iterable} [queue=[]] - The iterable that can be used to store queued functions
 * @returns {module:functionHelpers~queueManagerHandle}
 */

exports.delay = delay

var queueManager = function queueManager () {
  var queue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  var isRunning = false
  return function (fn) {
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4]
    }

    var runNextItem = function runNextItem () {
      if (queue.length && !isRunning) {
        isRunning = true
        var toRun = queue.shift()
        toRun.generator.next(toRun.item)
      }

      return queue
    }

    return new Promise(function (resolve, reject) {
      var generator = /* #__PURE__ */regeneratorRuntime.mark(function _callee () {
        var item
        return regeneratorRuntime.wrap(function _callee$ (_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2
                return

              case 2:
                item = _context.sent
                return _context.abrupt('return', typeof item.fn === 'function' ? resolve(item.fn.apply(item, _toConsumableArray(item.args))) : reject(item))

              case 4:
              case 'end':
                return _context.stop()
            }
          }
        }, _callee)
      })()
      generator.next()
      queue.push({
        item: {
          fn: fn,
          args: args
        },
        generator: generator
      })
      runNextItem()
    }).then(function (resolvedResult) {
      isRunning = false
      runNextItem()
      return resolvedResult
    })
  }
}
/**
 * Run Timeout functions one after the otherin queue.
 * @typedef {Function} queueTimeoutHandle
 * @param {Function} fn - A callback function to be performed at some time in the future.
 * @param {number} time - The time in milliseconds to delay.
 * @param {...*} args - Arguments to be passed to the callback once it is implemented.
 * @returns {Promise}
 */

/**
 * Manage functions to run sequentially with delays.
 * @function
 * @param {Iterable} [queue=[]] - The iterable that can be used to store queued functions
 * @returns {module:functionHelpers~queueTimeoutHandle}
 */

exports.queueManager = queueManager

var queueTimeout = function queueTimeout () {
  var queue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  var manager = queueManager(queue)
  return function (fn) {
    var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0

    for (var _len5 = arguments.length, args = new Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
      args[_key5 - 2] = arguments[_key5]
    }

    return manager(function () {
      return delay(time).resolver.then(function () {
        return fn.apply(void 0, args)
      })
    })
  }
}

exports.queueTimeout = queueTimeout
