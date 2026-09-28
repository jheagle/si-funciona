
export type callableLater = { fn?: Function, args?: Array<any> }

export type queuedItem = {
  item: callableLater | any
  generator: Generator
}

export interface IsQueue<queuedItem> {
  dequeue: () => queuedItem | null,
  empty: () => boolean,
  enqueue: (data: queuedItem) => void,
  peek: () => queuedItem | null,
  size: () => number
}

/**
 * Class BasicQueue is a functional example of a queue to be used with queueManager.
 */
class BasicQueue implements IsQueue<queuedItem> {
  private readonly innerList: queuedItem[] | any

  /**
   * @param innerList - Items to pre-populate the queue with, in order.
   */
  constructor (innerList: queuedItem[] | any = []) {
    this.innerList = innerList
  }

  /**
   * Remove and return the next item in the queue
   */
  dequeue (): queuedItem | any {
    return this.innerList.shift()
  }

  /**
   * Check if the queue is empty
   */
  empty (): boolean {
    return !this.size()
  }

  /**
   * Add an item to the end of the queue
   * @param data
   */
  enqueue (data: queuedItem | any): IsQueue<queuedItem> {
    this.innerList.push(data)
    return this
  }

  /**
   * Retrieve the next item from the queue
   */
  peek (): queuedItem | any {
    return this.empty() ? null : this.innerList[0]
  }

  /**
   * Get the quantity of items in the queue
   */
  size (): number {
    return this.innerList.length
  }
}

export default BasicQueue