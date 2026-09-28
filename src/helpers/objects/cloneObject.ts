import mergeObjectsBase from './mergeObjectsBase'

type cloneObjectOptions = { mapLimit?: number; depthLimit?: number; relevancyRange?: number }

/**
 * Clone objects for manipulation without data corruption, returns a copy of the provided object.
 * @param object - The original object that is being cloned
 * @param options
 * @param options.mapLimit - Deprecated and ignored (circular references are handled without trimming).
 * @param options.depthLimit - Control how many nested levels deep will be used, -1 = no limit, >-1 = nth level limited.
 * @param options.relevancyRange - Deprecated and ignored: see mapLimit.
 */
const cloneObject = (object: object, { mapLimit = 100, depthLimit = -1, relevancyRange = 1000 }: cloneObjectOptions = {}): object =>
  mergeObjectsBase({ mapLimit, depthLimit, relevancyRange, useClone: true })(object)

export default cloneObject
