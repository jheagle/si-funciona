import 'core-js/stable'

export type callableLater = { fn?: Function, args?: Array<any> }

export type queuedItem = {
  item: callableLater | any
  generator: Generator
}

/**
 * Define the format of a queue
 * @typdef {Object} IsQueue
 * @property {Array|*} innerList - Stores the data for the queue
 * @method dequeue - Pulls the first item from the queue
 * @method empty - Check if the queue is empty
 * @method enqueue - Adds and item to the end of the queue
 * @method peek - Get the next queue item but does not remove it
 * @method size - Get the size of the queue
 */

export interface IsQueue<queuedItem> {
  dequeue: () => queuedItem | null,
  empty: () => boolean,
  enqueue: (data: queuedItem) => void,
  peek: () => queuedItem | null,
  size: () => number
}

/**
 * Class BasicQueue is a functional example of a queue to be used with queueManager.
 * @memberOf module:arrayHelpers
 */
class BasicQueue implements IsQueue<queuedItem> {
  private readonly innerList: queuedItem[] | any

  constructor (innerList: queuedItem[] | any = []) {
    this.innerList = innerList
  }

  /**
   * Remove and return the next item in the queue
   * @returns {queuedItem|*}
   */
  dequeue (): queuedItem | any {
    return this.innerList.shift()
  }

  /**
   * Check if the queue is empty
   * @returns {boolean}
   */
  empty (): boolean {
    return !this.size()
  }

  /**
   * Add an item to the end of the queue
   * @param {queuedItem|*} data
   * @returns {BasicQueue}
   */
  enqueue (data: queuedItem | any): IsQueue<queuedItem> {
    this.innerList.push(data)
    return this
  }

  /**
   * Retrieve the next item from the queue
   * @returns {queuedItem|*}
   */
  peek (): queuedItem | any {
    return this.empty() ? null : this.innerList[0]
  }

  /**
   * Get the quantity of items in the queue
   * @returns {number}
   */
  size (): number {
    return this.innerList.length
  }
}

export default BasicQueue