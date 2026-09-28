import 'regenerator-runtime/runtime'

type delayHandler = {
  resolver: Promise<any>,
  cancel: () => void,
}

/**
 * Provide a timeout which returns a promise.
 * @param time - Delay in milliseconds
 */
const delay = (time: number = 0): delayHandler => {
  let cancel = (): void => undefined
  return {
    resolver: new Promise(
      (resolve: Function, reject: Function): void => {
        if (isNaN(time)) {
          reject(new Error(`Invalid delay: ${time}`))
        } else {
          const timeoutId = setTimeout(resolve, time, `Delayed for: ${time}`)
          cancel = (): void => {
            clearTimeout(timeoutId)
            reject(new Error(`Cancelled delay: ${time}`))
          }
        }
      }
    ),
    cancel: cancel
  }
}

export default delay
