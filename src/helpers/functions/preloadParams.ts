
type callWithMissing = (missing: any) => any

/**
 * Provide an array of parameters to be used with a function, allow the function to be called later
 * with the missing parameter.
 * @param fn - The function to be called
 * @param params - The parameters to preload
 * @param unassignedParam - Position of missing parameter (zero indexed)
 */
const preloadParams = (fn: Function, params: Array<any> = [], unassignedParam: number = 0): callWithMissing => (missing: any): any => {
  params.splice(unassignedParam, 0, missing)
  return fn(...params)
}

export default preloadParams
