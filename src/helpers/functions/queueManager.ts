import 'core-js/stable'
import 'regenerator-runtime/runtime'

/**
 * Each time queue handle is called the passed function is added to the queue to be called when ready.
 * @typedef {Function} module:functionHelpers~queueManagerHandle
 * @memberOf module:functionHelpers
 * @param {Function} fn - A function to enqueue
 * @param  {...*} args - Arguments to be passed to the function once it is ready
 * @returns {Promise}
 */
export type queueManagerHandle = (fn: Function, ...args: any) => Promise<any>

type callableLater = { fn?: Function, args?: Array<any> }

export type queuedItem = {
  item: callableLater
  generator: Generator
}

/**
 * Manage functions to run sequentially.
 * @function
 * @memberOf module:functionHelpers
 * @param {Iterable|array} [queue=[]] - The iterable that can be used to store queued functions
 * @returns {module:functionHelpers~queueManagerHandle}
 */
const queueManager = (queue: Array<queuedItem> = []): queueManagerHandle => {
  let isRunning = false
  return (fn: Function, ...args: any): Promise<any> => {
    const runNextItem = () => {
      if (queue.length && !isRunning) {
        isRunning = true
        const toRun = queue.shift()
        toRun.generator.next(toRun.item)
      }
      return queue
    }
    return new Promise((resolve: Function, reject: Function): void => {
      const generator = (function * (): Generator<callableLater> {
        const item: callableLater = yield
        return typeof item.fn === 'function' ? resolve(item.fn(...item.args)) : reject(item)
      })()
      generator.next()
      queue.push({
        item: { fn: fn, args: args },
        generator: generator
      })
      runNextItem()
    }).then((resolvedResult: any): any => {
      isRunning = false
      runNextItem()
      return resolvedResult
    })
  }
}

export default queueManager
