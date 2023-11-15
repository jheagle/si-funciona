'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
/**
 * Class BasicQueue is a functional example of a queue to be used with queueManager.
 * @memberOf module:arrayHelpers
 */
class BasicQueue {
  constructor () {
    const innerList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
    this.innerList = innerList
  }

  /**
   * Remove and return the next item in the queue
   * @returns {queuedItem|*}
   */
  dequeue () {
    return this.innerList.shift()
  }

  /**
   * Check if the queue is empty
   * @returns {boolean}
   */
  empty () {
    return !this.size()
  }

  /**
   * Add an item to the end of the queue
   * @param {queuedItem|*} data
   * @returns {BasicQueue}
   */
  enqueue (data) {
    this.innerList.push(data)
    return this
  }

  /**
   * Retrieve the next item from the queue
   * @returns {queuedItem|*}
   */
  peek () {
    return this.empty() ? null : this.innerList[0]
  }

  /**
   * Get the quantity of items in the queue
   * @returns {number}
   */
  size () {
    return this.innerList.length
  }
}
var _default = exports.default = BasicQueue
