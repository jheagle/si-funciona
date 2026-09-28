import 'regenerator-runtime/runtime'
import delay from './delay'
import queueManager, { queueManagerHandle } from './queueManager'

type queueTimeoutHandle = (fn: Function, time: number, ...args: any) => Promise<any>

/**
 * Manage functions to run sequentially with delays.
 * @param queueManagerHandle
 */
const queueTimeout = (queueManagerHandle: queueManagerHandle = null): queueTimeoutHandle => {
  const manager: queueManagerHandle = queueManagerHandle || queueManager()
  manager.start()
  return (fn: Function, time: number = 0, ...args: any): Promise<any> => manager.push(() => delay(time).resolver.then(() => fn(...args)))
}

export default queueTimeout
