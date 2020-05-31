;(function () {
  'use strict'

  var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

  var _typeof2 = _interopRequireDefault(require('@babel/runtime/helpers/typeof'))

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
  /**
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 */

  /**
 * Some number comparators and random number generators.
 * @module numberHelpers
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 */

  var numberHelpers = {}
  /**
 * Helper for returning the absolute max value
 * @function getAbsoluteMax
 * @param {number} num1 - A number to compare
 * @param {number} num2 - Another number to be compared against
 * @returns {number}
 */

  var getAbsoluteMax = function getAbsoluteMax (num1, num2) {
    return Math.abs(num1) > Math.abs(num2) ? num1 : num2
  }

  numberHelpers.getAbsoluteMax = getAbsoluteMax
  /**
 * Helper for returning the absolute min value
 * @function getAbsoluteMin
 * @param {number} num1 - A number to compare
 * @param {number} num2 - Another number to be compared against
 * @returns {number}
 */

  var getAbsoluteMin = function getAbsoluteMin (num1, num2) {
    return Math.abs(num1) < Math.abs(num2) ? num1 : num2
  }

  numberHelpers.getAbsoluteMin = getAbsoluteMin
  /**
 * Create a single random number within provided range. And with optional offset,
 * The distance between the result numbers can be adjusted with interval.
 * @function randomNumber
 * @param {number} range - Choose the breadth of the random number (0-100 would be 100 for range)
 * @param {number} [offset=0] - Choose the starting number (1-10 would be 1 for offset, 9 for range)
 * @param {number} [interval=1] - Choose the distance between numbers (~5, ~10, ~15 would be 5 for interval, 1 for
 * offset, 2 for range)
 * @returns {number}
 */

  var randomNumber = function randomNumber (range) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
    var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1
    return (Math.random() * range + offset) * interval
  }

  numberHelpers.randomNumber = randomNumber
  /**
 * Create a single random integer within provide range. And with optional offset,
 * The distance between the result numbers can be adjusted with interval.
 * @function randomInteger
 * @param {number} range - Choose the breadth of the random number (0-100 would be 100 for range)
 * @param {number} [offset=0] - Choose the starting number (1-10 would be 1 for offset, 9 for range)
 * @param {number} [interval=1] - Choose the distance between numbers (5, 10, 15 would be 5 for interval, 1 for
 * offset, 2 for range)
 * @returns {number}
 */

  var randomInteger = function randomInteger (range) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
    var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1
    return (Math.floor(Math.random() * range) + offset) * interval
  }

  numberHelpers.randomInteger = randomInteger
  /**
 * Compare two numbers and return:
 * -1 to indicate val1 is less than val2
 * 0 to indicate both values are the equal
 * 1 to indicate val1 is greater than val2
 * @function compare
 * @param {number} val1 - The first number to compare
 * @param {number} val2 - The second number to compare
 * @returns {number}
 */

  var compare = function compare (val1, val2) {
    return val1 === val2 ? 0 : val1 > val2 ? 1 : -1
  }

  numberHelpers.compare = compare
  /**
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 */

  /**
 * Some simple utility functions for generating arrays or performing work on arrays.
 * @module arrayHelpers
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 */

  var arrayHelpers = {}
  /**
 * Generate an array filled with a copy of the provided item or references to the provided item.
 * The length defines how long the array should be.
 * WARNING: This is a recursive function.
 * @param {boolean} useReference - Choose to multiply by clone or reference, true is by reference
 * @param {*} item - The item to be used for each array element
 * @param {number} length - The desired length of the array
 * @param {Array} [arr=[]] - The in-progress array of elements to be built and returned, will be used internally
 * @returns {Array.<*>}
 */

  var buildArrayBase = function buildArrayBase (useReference, item, length) {
    var arr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : []
    item = useReference ? item : cloneObject(item)
    return --length > 0 ? buildArrayBase(useReference, item, length, [].concat((0, _toConsumableArray2.default)(arr), [item])) : [].concat((0, _toConsumableArray2.default)(arr), [item])
  }
  /**
 * Leverage buildArrayBase to generate an array filled with a copy of the provided item.
 * The length defines how long the array should be.
 * @function buildArray
 * @param {*} item - The item to be used for each array element
 * @param {number} length - The desired length of the array
 * @param {Array} [arr=[]] - The in-progress array of elements to be built and returned, will be used internally
 * @returns {Array.<*>}
 */

  var buildArray = curry(buildArrayBase)(false)
  arrayHelpers.buildArray = buildArray
  /**
 * Leverage buildArrayBase to generate an array filled with references to the provided item.
 * The length defines how long the array should be.
 * @function buildArrayOfReferences
 * @param {*} item - The item to be used for each array element
 * @param {number} length - The desired length of the array
 * @param {Array} [arr=[]] - The in-progress array of elements to be built and returned, will be used internally
 * @returns {Array.<*>}
 */

  var buildArrayOfReferences = curry(buildArrayBase)(true)
  arrayHelpers.buildArrayOfReferences = buildArrayOfReferences
  /**
 * Remove duplicate values from an array.
 * @function uniqueArray
 * @param {Array} array - The array to make unique
 * @returns {Array}
 */

  var uniqueArray = function uniqueArray (array) {
    return array.filter(function (item, index) {
      return array.indexOf(item) === index
    })
  }

  arrayHelpers.uniqueArray = uniqueArray
  /**
 * Take multiple arrays and then filter all these into one unique array.
 * @function uniqueArray
 * @param {...Array} arrays - Provide mulitple arrays to create one unique array
 * @returns {Array}
 */

  var mergeArrays = function mergeArrays () {
    for (var _len6 = arguments.length, arrays = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      arrays[_key6] = arguments[_key6]
    }

    return arrays.map(arrayHelpers.uniqueArray).reduce(function (merged, arr) {
      return [].concat((0, _toConsumableArray2.default)(merged), (0, _toConsumableArray2.default)(arr.filter(function (attr) {
        return !merged.includes(attr)
      })))
    }, [])
  }

  arrayHelpers.mergeArrays = mergeArrays
  /**
 * Compare two Arrays and return the Object where the value for each property is as follows:
 * -1 to indicate val1 is less than val2
 * 0 to indicate both values are the equal
 * 1 to indicate val1 is greater than val2
 * The returned Object uses the element values as the property names
 * This functions works by first creating a concatenated array of all unique values. Then for each unique values,
 * convert to a string and use it as a new property name. Array filter each array checking if it has the unique value.
 * Use the lengths of these filtered arrays to compare. So if the first array has the value and the second one doesn't
 * the first length will be one or more and the second will be zero, if the both have the value then both will be one
 * or more.
 * @example
 * // example of input and resulting output
 * arrayHelpers.compareArrays(
 *   ['match1', 'firstMismatch1', 'match2', 'firstMismatch2', 'badMatch1'],
 *   ['match1', 'match2', 'secondMismatch1', 'badMatch1', 'badMatch1']
 * )
 * // unique array
 * ['match1', 'firstMismatch1', 'match2', 'firstMismatch2', 'badMatch1', 'secondMismatch1']
 * // result object
 * [
 *   {
 *     value: 'match1',
 *     result: [0, 0]
 *   },
 *   {
 *     value: 'firstMismatch1',
 *     result: [1, -1]
 *   },
 *   {
 *     value: 'match2',
 *     result: [0, 0]
 *   },
 *   {
 *     value: 'firstMismatch2',
 *     result: [1, -1]
 *   },
 *   {
 *     value: 'badMatch1',
 *     result: [0, 0]
 *   },
 *   {
 *     value: 'secondMismatch1',
 *     result: [-1, 1]
 *   }
 * ]
 *
 * @function compareArrays
 * @param {Array} arr1 - The first array to compare
 * @param {Array} arr2 - The second array to compare
 * @returns {Object.<string, number>}
 */

  var compareArrays = function compareArrays () {
    for (var _len7 = arguments.length, arrays = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      arrays[_key7] = arguments[_key7]
    }

    return arrayHelpers.mergeArrays.apply(arrayHelpers, arrays).reduce(function (results, attr) {
      var arrayResults = arrays.map(function (array) {
        return array.includes(attr) ? 1 : -1
      })
      return [].concat((0, _toConsumableArray2.default)(results), [{
        value: attr,
        result: arrayResults.every(function (result) {
          return result === 1
        }) ? arrayResults.map(function (result) {
            return 0
          }) : arrayResults
      }])
    }, [])
  }

  arrayHelpers.compareArrays = compareArrays
  /**
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 */

  /**
 * Simplify working with object by providing array-like parsing. Also, provides cloning and merging along with accessors that always have a return value for optimal nesting.
 * @module objectHelpers
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 */

  var objectHelpers = {}
  /**
 * Set a value on an item, then return the item
 * @function setValue
 * @param {string|number} key - The key on the item which will have its value set
 * @param {*} value - Any value to be applied to the key
 * @param {Object|Array} item - An object or array to be updated
 * @returns {Object|Array}
 */

  var setValue = function setValue (key, value, item) {
    item[key] = value
    return item
  }

  objectHelpers.setValue = setValue
  /**
 * Set a value on an item, then return the value
 * @function setAndReturnValue
 * @param {Object|Array} item - An object or array to be updated
 * @param {string|number} key - The key on the item which will have its value set
 * @param {*} value - Any value to be applied to the key
 * @returns {*}
 */

  var setAndReturnValue = function setAndReturnValue (item, key, value) {
    item[key] = value
    return value
  }

  objectHelpers.setAndReturnValue = setAndReturnValue
  /**
 * Function that produces a property of the new Object, taking three arguments
 * @callback module:objectHelpers~mapCallback
 * @param {*} currentProperty - The current property being processed in the object.
 * @param {string} [currentIndex] - The property name of the current property being processed in the object.
 * @param {Object|Array} [object] - The object map was called upon.
 * @returns {*}
 */

  /**
 * This function is intended to replicate behaviour of the Array.map() function but for Objects.
 * If an array is passed in instead then it will perform standard map(). It is recommended to
 * always use the standard map() function when it is known that the object is actually an array.
 * @function mapObject
 * @param {Object|Array} obj - The Object (or Array) to be mapped
 * @param {module:objectHelpers~mapCallback|function} fn - The function to be processed for each mapped property
 * @param {Object|Array} [thisArg] - Optional. Value to use as this when executing callback.
 * @returns {Object|Array}
 */

  var mapObject = function mapObject (obj, fn) {
    var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined
    return Array.isArray(obj) ? obj.map(fn, thisArg) : Object.keys(obj).reduce(function (newObj, curr) {
      return setValue(curr, callWithParams(fn, [obj[curr], curr, obj], 2), newObj)
    }, thisArg || {})
  }

  objectHelpers.mapObject = mapObject
  /**
 * Perform map on an array property of an object, then return the object
 * @function mapArrayProperty
 * @param {string} property - The string key for the array property to be mapped
 * @param {module:objectHelpers~mapCallback|function} mapFunction - A function suitable to be passed to map
 * @param {Object|Array} obj - An object having an array property
 * @returns {object}
 */

  var mapProperty = function mapProperty (property, mapFunction, obj) {
    obj[property] = mapObject(obj[property] || [], mapFunction)
    return obj
  }

  objectHelpers.mapProperty = mapProperty
  /**
 * Function is a predicate, to test each property value of the object. Return true to keep the element, false
 * otherwise, taking three arguments
 * @callback module:objectHelpers~filterCallback
 * @param {*} currentProperty - The current property being processed in the object.
 * @param {string} [currentIndex] - The property name of the current property being processed in the object.
 * @param {Object|Array} [object] - The object filter was called upon.
 * @returns {boolean}
 */

  /**
 * This function is intended to replicate behaviour of the Array.filter() function but for Objects.
 * If an array is passed in instead then it will perform standard filter(). It is recommended to
 * always use the standard filter() function when it is known that the object is actually an array.
 * @function filterObject
 * @param {Object|Array} obj - The Object (or Array) to be filtered
 * @param {module:objectHelpers~filterCallback|function} fn - The function to be processed for each filtered property
 * @param {Object|Array} [thisArg] - Optional. Value to use as this when executing callback.
 * @returns {Object|Array}
 */

  var filterObject = function filterObject (obj, fn) {
    var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined
    return Array.isArray(obj) ? obj.filter(fn, thisArg) : Object.keys(obj).reduce(function (newObj, curr) {
      if (callWithParams(fn, [obj[curr], curr, obj], 2)) {
        newObj[curr] = obj[curr]
      } else {
        delete newObj[curr]
      }

      return newObj
    }, thisArg || {})
  }

  objectHelpers.filterObject = filterObject
  /**
 * Function to execute on each property in the object, taking four arguments
 * @callback module:objectHelpers~reduceCallback
 * @param {*} [accumulator={}] - The accumulator accumulates the callback's return values; it is the accumulated
 * value previously returned in the last invocation of the callback, or initialValue, if supplied (see below).
 * @param {*} [currentProperty={}] - The current property being processed in the object.
 * @param {string} [currentIndex=0] - The index of the current element being processed in the array. Starts at index
 * 0, if an initialValue is provided, and at index 1 otherwise.
 * @param {Object|Array} [object={}] - The object reduce was called upon.
 * @returns {*}
 */

  /**
 * This function is intended to replicate behaviour of the Array.reduce() function but for Objects.
 * If an array is passed in instead then it will perform standard reduce(). It is recommended to
 * always use the standard reduce() function when it is known that the object is actually an array.
 * @function reduceObject
 * @param {Object|Array} obj - The Object (or Array) to be filtered
 * @param {module:objectHelpers~reduceCallback|function} fn - The function to be processed for each filtered property
 * @param {Object|Array} [initialValue] - Optional. Value to use as the first argument to the first call of the
 * callback. If no initial value is supplied, the first element in the array will be used. Calling reduce on an empty
 * array without an initial value is an error.
 * @returns {Object|Array}
 */

  var reduceObject = function reduceObject (obj, fn) {
    var initialValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : obj[Object.keys(obj)[0]] || obj[0]
    return Array.isArray(obj) ? obj.reduce(fn, initialValue) : Object.keys(obj).reduce(function (newObj, curr) {
      return callWithParams(fn, [newObj, obj[curr], curr, obj], 2)
    }, initialValue)
  }

  objectHelpers.reduceObject = reduceObject
  /**
 * Helper function for testing if the item is an Object or Array that contains properties or elements
 * @function notEmptyObjectOrArray
 * @param {Object|Array} item - Object or Array to test
 * @returns {boolean}
 */

  var notEmptyObjectOrArray = function notEmptyObjectOrArray (item) {
    return !!((0, _typeof2.default)(item) === 'object' && Object.keys(item).length || Array.isArray(item) && item.length)
  }

  objectHelpers.notEmptyObjectOrArray = notEmptyObjectOrArray
  /**
 * Re-add the Object Properties which cannot be cloned and must be directly copied to the new cloned object
 * WARNING: This is a recursive function.
 * @param {Object} cloned - A value-only copy of the original object
 * @param {Object} object - The original object that is being cloned
 * @returns {Object|Array}
 */

  var cloneCopy = function cloneCopy (object, cloned) {
    return notEmptyObjectOrArray(object) ? reduceObject(object, function (start, prop, key) {
      start[key] = cloned[key] && !/^(parentItem|listenerArgs|element)$/.test(key) ? cloneCopy(prop, cloned[key]) : prop
      return start
    }, cloned) : cloned
  }
  /**
 * Clone objects for manipulation without data corruption, returns a copy of the provided object.
 * @function cloneObject
 * @param {Object} object - The original object that is being cloned
 * @returns {Object}
 */

  var cloneObject = function cloneObject (object) {
    return cloneCopy(object, JSON.parse(JSON.stringify(object, function (key, val) {
      return !/^(parentItem|listenerArgs|element)$/.test(key) ? val : undefined
    })))
  }

  objectHelpers.cloneObject = cloneObject
  /**
 * Merge two objects and provide clone or original on the provided function.
 * The passed function should accept a minimum of two objects to be merged.
 * If the desire is to mutate the input objects, then the function name should
 * have the word 'mutable' in the name (case-insensitive).
 * @param {module:objectHelpers.mergeObjects|module:objectHelpers.mergeObjectsMutable|Function} fn - Pass one of
 * the mergeObjects functions to be used
 * @param {Object} obj1 - The receiving object; this is the object which will have it's properties overridden
 * @param {Object} obj2 - The contributing object; this is the object which will contribute new properties and
 * override existing ones
 * @param {boolean} [isMutable=false] - An optional flag which indicates whether we will clone objects or directly
 * modify them
 * @returns {Object}
 */

  var mergeObjectsBase = function mergeObjectsBase (fn, obj1, obj2) {
    var isMutable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false
    return notEmptyObjectOrArray(obj2) ? mapObject(obj2, function (prop, key) {
      return obj1[key] && !/^(parentItem|listenerArgs|element)$/.test(key) ? fn(obj1[key], prop) : prop
    }, isMutable ? obj1 : cloneObject(obj1)) : obj2
  }
  /**
 * Perform a deep merge of objects. This will combine all objects and sub-objects,
 * objects having the same attributes will overwrite starting from the end of the argument
 * list and bubbling up to return a merged version of the first object.
 * WARNING: This is a recursive function.
 * @function mergeObjects
 * @param {...Object} args - Provide a list of objects which will be merged starting from the end up into the first
 * object
 * @returns {Object}
 */

  var mergeObjects = function mergeObjects () {
    for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8]
    }

    return args.length === 2 ? mergeObjectsBase(mergeObjects, args[0], args[1]) : args.length === 1 ? cloneObject(args[0]) : args.reduce(curry(mergeObjectsBase)(mergeObjects), {})
  }

  objectHelpers.mergeObjects = mergeObjects
  /**
 * Perform a deep merge of objects. This will combine all objects and sub-objects,
 * objects having the same attributes will overwrite starting from the end of the argument
 * list and bubbling up to return the overwritten first object.
 * WARNING: This is a recursive function.
 * WARNING: This will mutate the first object passed in as input
 * @function mergeObjectsMutable
 * @param {...Object} args - Provide a list of objects which will be merged starting from the end up into the first
 * object
 * @returns {Object}
 */

  var mergeObjectsMutable = function mergeObjectsMutable () {
    for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      args[_key9] = arguments[_key9]
    }

    return args.length === 2 ? mergeObjectsBase(mergeObjectsMutable, args[0], args[1], true) : args.length === 1 ? args[0] : args.reduce(curry(mergeObjectsBase)(mergeObjectsMutable), {})
  }

  objectHelpers.mergeObjectsMutable = mergeObjectsMutable
  /**
 * @file All of the functionalHelpers system functions for stringing together functions and simplifying logic.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 */

  /**
   * Store a reference to this scope which will be Window if rendered via browser
   */

  var root = void 0 || {}
  /**
   * Store reference to any pre-existing module of the same name
   * @type {module|*}
   */

  var previousFunctionalHelpers = root.functionalHelpers || {}
  /**
   * All methods exported from this module are encapsulated within functionalHelpers.
   * @author Joshua Heagle <joshuaheagle@gmail.com>
   * @typedef {Object} functionalHelpers
   * @module functionalHelpers
   */

  var functionalHelpers = {}
  root.functionalHelpers = functionalHelpers
  /**
   * Return a reference to this library while preserving the original same-named library
   * @function noConflict
   * @returns {functionalHelpers}
   */

  functionalHelpers.noConflict = function () {
    root.functionalHelpers = previousFunctionalHelpers
    return functionalHelpers
  }

  Object.assign(functionalHelpers, arrayHelpers, functionHelpers, numberHelpers, objectHelpers)
  this.functionalHelpers = functionalHelpers
}).call(this || window || {})
