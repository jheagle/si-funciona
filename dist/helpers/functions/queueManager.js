'use strict'

function _typeof (obj) { '@babel/helpers - typeof'; return _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) { return typeof obj } : function (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj }, _typeof(obj) }
require('core-js/modules/es.symbol.js')
require('core-js/modules/es.symbol.description.js')
require('core-js/modules/es.symbol.iterator.js')
require('core-js/modules/es.array.iterator.js')
require('core-js/modules/es.string.iterator.js')
require('core-js/modules/web.dom-collections.iterator.js')
require('core-js/modules/es.array.from.js')
require('core-js/modules/es.array.slice.js')
require('core-js/modules/es.regexp.exec.js')
require('core-js/modules/es.regexp.test.js')
require('core-js/modules/es.object.define-property.js')
require('core-js/modules/es.symbol.async-iterator.js')
require('core-js/modules/es.symbol.to-string-tag.js')
require('core-js/modules/es.json.to-string-tag.js')
require('core-js/modules/es.math.to-string-tag.js')
require('core-js/modules/es.object.get-prototype-of.js')
require('core-js/modules/esnext.async-iterator.for-each.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.for-each.js')
require('core-js/modules/web.dom-collections.for-each.js')
require('core-js/modules/es.object.set-prototype-of.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/es.object.to-string.js')
require('core-js/modules/es.promise.js')
require('core-js/stable')
require('regenerator-runtime/runtime')
function _regeneratorRuntime () { 'use strict'; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime () { return exports }; var exports = {}; var Op = Object.prototype; var hasOwn = Op.hasOwnProperty; var defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value }; var $Symbol = typeof Symbol === 'function' ? Symbol : {}; var iteratorSymbol = $Symbol.iterator || '@@iterator'; var asyncIteratorSymbol = $Symbol.asyncIterator || '@@asyncIterator'; var toStringTagSymbol = $Symbol.toStringTag || '@@toStringTag'; function define (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key] } try { define({}, '') } catch (err) { define = function define (obj, key, value) { return obj[key] = value } } function wrap (innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator; var generator = Object.create(protoGenerator.prototype); var context = new Context(tryLocsList || []); return defineProperty(generator, '_invoke', { value: makeInvokeMethod(innerFn, self, context) }), generator } function tryCatch (fn, obj, arg) { try { return { type: 'normal', arg: fn.call(obj, arg) } } catch (err) { return { type: 'throw', arg: err } } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator () {} function GeneratorFunction () {} function GeneratorFunctionPrototype () {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this }); var getProto = Object.getPrototypeOf; var NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods (prototype) { ['next', 'throw', 'return'].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg) }) }) } function AsyncIterator (generator, PromiseImpl) { function invoke (method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if (record.type !== 'throw') { var result = record.arg; var value = result.value; return value && _typeof(value) == 'object' && hasOwn.call(value, '__await') ? PromiseImpl.resolve(value.__await).then(function (value) { invoke('next', value, resolve, reject) }, function (err) { invoke('throw', err, resolve, reject) }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result) }, function (error) { return invoke('throw', error, resolve, reject) }) } reject(record.arg) } var previousPromise; defineProperty(this, '_invoke', { value: function value (method, arg) { function callInvokeWithMethodAndArg () { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject) }) } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg() } }) } function makeInvokeMethod (innerFn, self, context) { var state = 'suspendedStart'; return function (method, arg) { if (state === 'executing') throw new Error('Generator is already running'); if (state === 'completed') { if (method === 'throw') throw arg; return doneResult() } for (context.method = method, context.arg = arg; ;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult } } if (context.method === 'next') context.sent = context._sent = context.arg; else if (context.method === 'throw') { if (state === 'suspendedStart') throw state = 'completed', context.arg; context.dispatchException(context.arg) } else context.method === 'return' && context.abrupt('return', context.arg); state = 'executing'; var record = tryCatch(innerFn, self, context); if (record.type === 'normal') { if (state = context.done ? 'completed' : 'suspendedYield', record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done } } record.type === 'throw' && (state = 'completed', context.method = 'throw', context.arg = record.arg) } } } function maybeInvokeDelegate (delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, context.method === 'throw') { if (delegate.iterator.return && (context.method = 'return', context.arg = undefined, maybeInvokeDelegate(delegate, context), context.method === 'throw')) return ContinueSentinel; context.method = 'throw', context.arg = new TypeError("The iterator does not provide a 'throw' method") } return ContinueSentinel } var record = tryCatch(method, delegate.iterator, context.arg); if (record.type === 'throw') return context.method = 'throw', context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, context.method !== 'return' && (context.method = 'next', context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = 'throw', context.arg = new TypeError('iterator result is not an object'), context.delegate = null, ContinueSentinel) } function pushTryEntry (locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry) } function resetTryEntry (entry) { var record = entry.completion || {}; record.type = 'normal', delete record.arg, entry.completion = record } function Context (tryLocsList) { this.tryEntries = [{ tryLoc: 'root' }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0) } function values (iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if (typeof iterable.next === 'function') return iterable; if (!isNaN(iterable.length)) { var i = -1; var next = function next () { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next } return next.value = undefined, next.done = !0, next }; return next.next = next } } return { next: doneResult } } function doneResult () { return { value: undefined, done: !0 } } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, 'constructor', { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, 'constructor', { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, 'GeneratorFunction'), exports.isGeneratorFunction = function (genFun) { var ctor = typeof genFun === 'function' && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || (ctor.displayName || ctor.name) === 'GeneratorFunction') }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, 'GeneratorFunction')), genFun.prototype = Object.create(Gp), genFun }, exports.awrap = function (arg) { return { __await: arg } }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next() }) }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, 'Generator'), define(Gp, iteratorSymbol, function () { return this }), define(Gp, 'toString', function () { return '[object Generator]' }), exports.keys = function (val) { var object = Object(val); var keys = []; for (var key in object) { keys.push(key) } return keys.reverse(), function next () { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next } return next.done = !0, next } }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset (skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = 'next', this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { name.charAt(0) === 't' && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined) } }, stop: function stop () { this.done = !0; var rootRecord = this.tryEntries[0].completion; if (rootRecord.type === 'throw') throw rootRecord.arg; return this.rval }, dispatchException: function dispatchException (exception) { if (this.done) throw exception; var context = this; function handle (loc, caught) { return record.type = 'throw', record.arg = exception, context.next = loc, caught && (context.method = 'next', context.arg = undefined), !!caught } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; var record = entry.completion; if (entry.tryLoc === 'root') return handle('end'); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, 'catchLoc'); var hasFinally = hasOwn.call(entry, 'finallyLoc'); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc) } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0) } else { if (!hasFinally) throw new Error('try statement without catch or finally'); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc) } } } }, abrupt: function abrupt (type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, 'finallyLoc') && this.prev < entry.finallyLoc) { var finallyEntry = entry; break } } finallyEntry && (type === 'break' || type === 'continue') && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = 'next', this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record) }, complete: function complete (record, afterLoc) { if (record.type === 'throw') throw record.arg; return record.type === 'break' || record.type === 'continue' ? this.next = record.arg : record.type === 'return' ? (this.rval = this.arg = record.arg, this.method = 'return', this.next = 'end') : record.type === 'normal' && afterLoc && (this.next = afterLoc), ContinueSentinel }, finish: function finish (finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel } }, catch: function _catch (tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if (record.type === 'throw') { var thrown = record.arg; resetTryEntry(entry) } return thrown } } throw new Error('illegal catch attempt') }, delegateYield: function delegateYield (iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, this.method === 'next' && (this.arg = undefined), ContinueSentinel } }, exports }
function _toConsumableArray (arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread() }
function _nonIterableSpread () { throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.') }
function _unsupportedIterableToArray (o, minLen) { if (!o) return; if (typeof o === 'string') return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) n = o.constructor.name; if (n === 'Map' || n === 'Set') return Array.from(o); if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen) }
function _iterableToArray (iter) { if (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null || iter['@@iterator'] != null) return Array.from(iter) }
function _arrayWithoutHoles (arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr) }
function _arrayLikeToArray (arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i] } return arr2 }
/**
 * Each time queue handle is called the passed function is added to the queue to be called when ready.
 * @typedef {Function} module:functionHelpers~queueManagerHandle
 * @memberOf module:functionHelpers
 * @param {Function} fn - A function to enqueue
 * @param  {...*} args - Arguments to be passed to the function once it is ready
 * @returns {Promise}
 */

/**
 * Manage functions to run sequentially.
 * @function
 * @memberOf module:functionHelpers
 * @param {Iterable|array} [queue=[]] - The iterable that can be used to store queued functions
 * @returns {module:functionHelpers~queueManagerHandle}
 */
var queueManager = function queueManager () {
  var queue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  var isRunning = false
  return function (fn) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key]
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
      var generator = /* #__PURE__ */_regeneratorRuntime().mark(function _callee () {
        var item
        return _regeneratorRuntime().wrap(function _callee$ (_context) {
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
var _default = queueManager
exports.default = _default
