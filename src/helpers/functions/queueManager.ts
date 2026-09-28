import 'regenerator-runtime/runtime'
import { callableLater, IsQueue, queuedItem } from '../arrays/BasicQueue'
import makeBasicQueue from './makeBasicQueue'

export type queuedRunnable = {
  item: { fn: Function | queuedItem, args: any[] },
  generator: Generator
}

export type queuePush = (fn: Function, ...args: any) => Promise<any>

export type queueManagerHandle = {
  start: () => void
  pause: () => void
  push: queuePush
}

/**
 * Manage functions to run sequentially.
 * @param queue - The queue to manage. Pass a plain array to have it converted into a
 * {@link module:arrayHelpers.BasicQueue} automatically, or a custom queue implementing `IsQueue`; omit it (or pass
 * `null`) to have one created for you.
 */
const queueManager = (queue: IsQueue<queuedItem> = null): queueManagerHandle => {
  let isRunning = false
  let isPaused = true
  /**
   * Convert a function to a queueable object.
   * @param resolve
   * @param reject
   * @param fn
   * @param args
   */
  const makeQueuedRunnable = (resolve: Function, reject: Function, fn: Function | queuedItem, ...args: any): queuedRunnable => {
    const generator = (function * (): Generator<callableLater> {
      const item: callableLater = yield
      if (typeof item.fn !== 'function') {
        return reject(item)
      }
      try {
        return resolve(item.fn(...item.args))
      } catch (error) {
        // A function which throws rejects its own promise (as one which returns a rejected promise does), instead of
        // throwing out of whichever function happened to finish just before it and starting the next item.
        return reject(error)
      }
    })()
    // Prepare the generator to be used on the subsequent call
    generator.next()
    return {
      item: { fn: fn, args: args },
      generator: generator
    }
  }
  /**
   * After an item is run, THEN run this function to reset isRunning
   * @param result
   */
  const postRun = (result: any): any => {
    isRunning = false
    runNextItem()
    return result
  }

  /**
   * When a queued function throws (or returns a promise which rejects), carry on with the rest of the queue and pass the
   * error on to whoever queued it - otherwise the queue would stay marked as running and never start another function.
   * @param error
   * @throws {*} The same error
   */
  const postFailedRun = (error: any): never => {
    isRunning = false
    runNextItem()
    throw error
  }
  /**
   * When ready, runs the next queued runnable generator.
   */
  const runNextItem = (): any | null => {
    if (!isPaused && !queue.empty() && !isRunning) {
      isRunning = true
      let toRun = queue.dequeue()
      if (typeof toRun === 'undefined' || toRun === null) {
        return null
      }
      if (typeof toRun === 'function') {
        new Promise((resolve, reject) => {
          toRun = makeQueuedRunnable(resolve, reject, toRun)
          runNextItem()
        }).then(postRun, postFailedRun)
      }
      if ('success' in toRun) {
        // Some run responses return an object with 'success' property.
        console.info(toRun.success)
        return null
      }
      if (!toRun.generator || 'error' in toRun) {
        // Some run responses return an object with an 'error' property
        let errorMessage = 'Verify queued function implements "done()" state.'
        if ('error' in toRun && toRun.error) {
          errorMessage = `[${toRun.error}]: ${errorMessage}`
        }
        throw new Error(errorMessage)
      }
      if (toRun.generator && toRun.item) {
        // Ensure the returned result has both the generator and the item to be valid
        return toRun.generator.next(toRun.item)
      }
    }
    return null
  }
  /**
   * Add a function into the queue to be run when ready.
   * @param fn - The function to run when ready
   * @param args - Optional arguments to apply when the function is ready to be run
   * @returns Promise
   */
  const pushAnother = (fn: Function, ...args: any): Promise<any> => new Promise(
    (resolve: Function, reject: Function) => {
      queue.enqueue(makeQueuedRunnable(resolve, reject, fn, ...args))
      runNextItem()
    }
  )
    .then(postRun, postFailedRun)
  if (Array.isArray(queue)) {
    const queueArray = queue
    queue = makeBasicQueue()
    queueArray.forEach((queued: Function): Promise<any> => pushAnother(queued))
  }
  if (queue === null) {
    queue = makeBasicQueue()
  }
  runNextItem()
  return {
    start: (): void => {
      isPaused = false
      runNextItem()
    },
    pause: (): void => {
      isPaused = true
    },
    push: pushAnother
  }
}

export default queueManager
