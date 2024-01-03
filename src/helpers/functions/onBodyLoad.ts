import 'core-js/stable'
import queueManager from './queueManager'

const queue: Array<Function> = []
const manager = queueManager()
manager.start()
let observer: MutationObserver | null = null
const doReset = (): void => observer = null
const initializeObserver = async () => {
  observer = new MutationObserver(
    () => {
      if (document.body) {
        while (queue.length) {
          manager.push(queue.shift())
        }
        observer.disconnect()
        doReset()
      }
    }
  )
  observer.observe(document.documentElement, {
    childList: true
  })
  return observer
}

/**
 * Prepare functions to be called once the body is available.
 * @function
 * @memberOf module:functionHelpers
 * @param {Function} callback
 * @param {boolean} [reset=false]
 * @returns {Array.<Function>}
 */
const onBodyLoad = (callback: Function, reset: boolean = false): Array<Function> => {
  if (reset) {
    doReset()
  }
  queue.push(callback)
  if (observer === null) {
    initializeObserver()
  }
  return queue
}

export default onBodyLoad
