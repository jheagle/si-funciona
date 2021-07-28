'use strict'

require('core-js/modules/es.symbol.js')

require('core-js/modules/es.symbol.description.js')

require('core-js/modules/es.symbol.iterator.js')

require('core-js/modules/es.array.iterator.js')

require('core-js/modules/es.string.iterator.js')

require('core-js/modules/web.dom-collections.iterator.js')

require('core-js/modules/es.array.from.js')

require('core-js/modules/es.array.slice.js')

require('core-js/modules/es.function.name.js')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('regenerator-runtime/runtime.js')

require('core-js/modules/es.object.to-string.js')

require('core-js/modules/es.promise.js')

require('core-js/stable')

require('regenerator-runtime/runtime')

function _toConsumableArray (arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread() }

function _nonIterableSpread () { throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.') }

function _unsupportedIterableToArray (o, minLen) { if (!o) return; if (typeof o === 'string') return _arrayLikeToArray(o, minLen); let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) n = o.constructor.name; if (n === 'Map' || n === 'Set') return Array.from(o); if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen) }

function _iterableToArray (iter) { if (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null || iter['@@iterator'] != null) return Array.from(iter) }

function _arrayWithoutHoles (arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr) }

function _arrayLikeToArray (arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i] } return arr2 }

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
 * @returns {queueManagerHandle}
 */
const queueManager = function queueManager () {
  const queue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  let isRunning = false
  return function (fn) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key]
    }

    const runNextItem = function runNextItem () {
      if (queue.length && !isRunning) {
        isRunning = true
        const toRun = queue.shift()
        toRun.generator.next(toRun.item)
      }

      return queue
    }

    return new Promise(function (resolve, reject) {
      const generator = /* #__PURE__ */regeneratorRuntime.mark(function _callee () {
        let item
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

const _default = queueManager
exports.default = _default
