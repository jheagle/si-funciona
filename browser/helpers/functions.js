;(function () {
  'use strict'

  var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

  var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

  var _toConsumableArray2 = _interopRequireDefault(require('@babel/runtime/helpers/toConsumableArray'))

  /**
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 */

  /**
 * Manage how functions are called with these utilities.
 * @module functionHelpers
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 */
  var functionHelpers = {}
  /**
 * Return a curried version of the passed function.
 * The returned function expects the same number of arguments minus the ones provided.
 * fn is the name of the function being curried.
 * @function curry
 * @param {function} fn - Receives a function to be curried
 * @returns {function|*}
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

  functionHelpers.curry = curry
  /**
 * Take one or more function with a single parameter and return value.
 * Pass a paramter and the value will be transformed by each function then returned.
 * @function pipe
 * @param {...function} fns - Takes a series of functions having the same parameter
 * @returns {*}
 */

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

  functionHelpers.pipe = pipe
  /**
 * Given a function, call with the correct number of paramters from an array of possible parameters.
 * @function callWithParams
 * @param {function} fn - The function to be called
 * @param {Array} params - Array of possible function parameters
 * @param {number} [minimum=2] - Minimumn number of parameters to use in the function
 * @returns {*}
 */

  var callWithParams = function callWithParams (fn) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : []
    var minimum = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2
    return fn.apply(void 0, (0, _toConsumableArray2.default)(params.slice(0, fn.length || minimum)))
  }

  functionHelpers.callWithParams = callWithParams
  /**
 * Provide a way to cancel a request or attach a resolve event.
 * @typedef {Object} delayHandler
 * @property {Promise} resolver
 * @property {Function} cancel
 */

  /**
 * Provide a timeout which returns a promise.
 * @param {number} time - Delay in milliseconds
 * @returns {delayHandler}
 */

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

  functionHelpers.delay = delay
  /**
 * Manage functions to run sequentially. Each time queue manager is called the passed function is added to the queue to be called when ready.
 * @function queueManager
 * @param {*} fn - A function to enqueue
 * @param  {...any} args - Arguments to be passed to the function once it is ready
 * @returns {Promise}
 */

  var queueManager = function queueManager (fn) {
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4]
    }

    queueManager.queue = queueManager.queue || []
    queueManager.isRunning = queueManager.isRunning || false

    var runNextItem = function runNextItem () {
      if (queueManager.queue.length && !queueManager.isRunning) {
        queueManager.isRunning = true
        var toRun = queueManager.queue.shift()
        toRun.generator.next(toRun.item)
      }

      return queueManager.queue
    }

    return new Promise(function (resolve, reject) {
      var generator = /* #__PURE__ */_regenerator.default.mark(function _callee () {
        var item
        return _regenerator.default.wrap(function _callee$ (_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2
                return

              case 2:
                item = _context.sent
                return _context.abrupt('return', typeof item.fn === 'function' ? resolve(item.fn.apply(item, (0, _toConsumableArray2.default)(item.args))) : reject(item))

              case 4:
              case 'end':
                return _context.stop()
            }
          }
        }, _callee)
      })()

      generator.next()
      queueManager.queue.push({
        item: {
          fn: fn,
          args: args
        },
        generator: generator
      })
      runNextItem()
    }).then(function (resolvedResult) {
      queueManager.isRunning = false
      runNextItem()
      return resolvedResult
    })
  }

  functionHelpers.queueManager = queueManager
  /**
 * Run Timeout functions one after the other in queue.
 * @function queueTimeout
 * @param {function} fn - A callback function to be performed at some time in the future.
 * @param {number} time - The time in milliseconds to delay.
 * @param {...*} args - Arguments to be passed to the callback once it is implemented.
 * @returns {Promise}
 */

  var queueTimeout = function queueTimeout (fn) {
    var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0

    for (var _len5 = arguments.length, args = new Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
      args[_key5 - 2] = arguments[_key5]
    }

    return queueManager(function () {
      return delay(time).resolver.then(function () {
        return fn.apply(void 0, args)
      })
    })
  }

  functionHelpers.queueTimeout = queueTimeout
  this.functionHelpers = functionHelpers
}).call(this || window || {})
