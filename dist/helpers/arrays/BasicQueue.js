'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
/**
 * Class BasicQueue is a functional example of a queue to be used with queueManager.
 */
class BasicQueue {
  /**
   * @param innerList - Items to pre-populate the queue with, in order.
   */
  constructor (innerList = []) {
    this.innerList = innerList
  }

  /**
   * Remove and return the next item in the queue
   */
  dequeue () {
    return this.innerList.shift()
  }

  /**
   * Check if the queue is empty
   */
  empty () {
    return !this.size()
  }

  /**
   * Add an item to the end of the queue
   * @param data
   */
  enqueue (data) {
    this.innerList.push(data)
    return this
  }

  /**
   * Retrieve the next item from the queue
   */
  peek () {
    return this.empty() ? null : this.innerList[0]
  }

  /**
   * Get the quantity of items in the queue
   */
  size () {
    return this.innerList.length
  }
}
const _default = exports.default = BasicQueue
