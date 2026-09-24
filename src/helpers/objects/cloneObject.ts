import mergeObjectsBase from './mergeObjectsBase'

type cloneObjectOptions = { mapLimit?: number; depthLimit?: number; relevancyRange?: number }

/**
 * Clone objects for manipulation without data corruption, returns a copy of the provided object.
 * @memberOf module:objectHelpers
 * @param {Object} object - The original object that is being cloned
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=100] - Deprecated and ignored (circular references are handled without trimming).
 * @param {number} [options.depthLimit=-1] - Control how many nested levels deep will be used, -1 = no limit, >-1 = nth level limited.
 * @param {number} [options.relevancyRange=1000] - Deprecated and ignored: see mapLimit.
 * @returns {Object}
 */
const cloneObject = (object: object, { mapLimit = 100, depthLimit = -1, relevancyRange = 1000 }: cloneObjectOptions = {}): object =>
  mergeObjectsBase({ mapLimit, depthLimit, relevancyRange, useClone: true })(object)

export default cloneObject
