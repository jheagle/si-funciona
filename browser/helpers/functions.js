"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

;
(function () {
  /**
   * @file All of the functionHelpers system functions for stringing together functions and simplifying logic.
   * @author Joshua Heagle <joshuaheagle@gmail.com>
   * @version 1.0.0
   */

  /**
   * All methods exported from this module are encapsulated within functionHelpers.
   * @author Joshua Heagle <joshuaheagle@gmail.com>
   * @typedef {Object} functionHelpers
   * @module functionHelpers
   */
  var functionHelpers = {};
  /**
   * Return a curried version of the passed function.
   * The returned function expects the same number of arguments minus the ones provided.
   * fn is the name of the function being curried.
   * @function curry
   * @param {function} fn - Receives a function to be curried
   * @returns {function(...[*]): function(...[*])}
   */

  var curry = function curry(fn) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return args.length >= fn.length ? fn.apply(void 0, args) : function () {
        for (var _len2 = arguments.length, a = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          a[_key2] = arguments[_key2];
        }

        return curry(fn).apply(void 0, [].concat(args, a));
      };
    };
  };

  functionHelpers.curry = curry;
  /**
   * Take one or more function with a single parameter and return value.
   * Pass a paramter and the value will be transformed by each function then returned.
   * @function pipe
   * @param {...function} fns - Takes a series of functions having the same parameter
   * @returns {function(*=): (*|any)}
   */

  var pipe = function pipe() {
    for (var _len3 = arguments.length, fns = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      fns[_key3] = arguments[_key3];
    }

    return function (x) {
      return fns.reduce(function (y, f) {
        return f(y);
      }, x);
    };
  };

  functionHelpers.pipe = pipe;
  /**
   * Given a function, call with the correct number of paramters from an array of possible parameters.
   * @function callWithParams
   * @param {function} fn
   * @param {Array} params
   * @param {number} [minimum]
   * @returns {*}
   */

  var callWithParams = function callWithParams(fn) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var minimum = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    return fn.apply(void 0, _toConsumableArray(params.slice(0, fn.length || minimum)));
  };

  functionHelpers.callWithParams = callWithParams;
  /**
   * Run Timeout functions one after the other in queue. This function needs some work to comply with the standards
   * applied to the rest of this file where this is not a Pure function, and it does not reliably return a result. This
   * implementation should likely be used with Promise instead.
   * WARNING: This is a recursive function.
   * @function queueTimeout
   * @param {function|object|boolean} fn - A callback function to be performed at some time in the future.
   * @param {number} time - The time in milliseconds to delay.
   * @param {...*} args - Arguments to be passed to the callback once it is implemented.
   * @returns {{id: number, func: function, timeout: number, args: {Array}, result: *}}
   */

  var queueTimeout = function queueTimeout() {
    var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    // Track the queue to be processed in FIFO
    queueTimeout.queue = queueTimeout.queue || []; // Do not run more than one queued item at a time

    queueTimeout.isRunning = queueTimeout.isRunning || false; // Construct an object which will store the queued function data

    for (var _len4 = arguments.length, args = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
      args[_key4 - 2] = arguments[_key4];
    }

    var queueItem = {
      id: 0,
      func: fn,
      timeout: time,
      args: args,
      result: 0
    };

    if (fn) {
      // When the function is valid, append it to the end of the queue
      queueTimeout.queue.push(queueItem);
    }

    if (queueTimeout.queue.length && !queueTimeout.isRunning) {
      // Check that the queue is not empty, and it is not running a queued item
      // Set isRunning flag to begin processing the next queued item
      queueTimeout.isRunning = true; // Pick an item off the front of the queue, and thereby reduce the queue size

      var toRun = queueTimeout.queue.shift(); // Get the timeout ID when it has begun

      toRun.id = setTimeout(function () {
        // Run the function after the provided timeout
        toRun.result = toRun.func.apply(toRun, _toConsumableArray(toRun.args)); // Reset isRunning flag

        queueTimeout.isRunning = false; // Re-run the queue which will get the next queued item if there is one

        return queueTimeout(false);
      }, toRun.timeout); // Return whatever object we have for the current queued item being processed, likely incomplete because the
      // function will complete in the future

      return toRun;
    } // Return newly created queuedItem


    return queueItem;
  };

  functionHelpers.queueTimeout = queueTimeout;
  this.Functions = functionHelpers;
}).call(void 0);