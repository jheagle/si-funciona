import 'core-js/stable'
import queueManager from './queueManager'

const queue = []
const manager = queueManager()
let observer = null
const doReset = () => observer = null
const initializeObserver = () => {
  observer = new MutationObserver(
    () => {
      if (document.body) {
        while (queue.length) {
          manager(queue.shift())
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
const onBodyLoad = (callback, reset = false) => {
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
