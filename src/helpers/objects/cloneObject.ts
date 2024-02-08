import 'core-js/stable'
import mergeObjectsBase from './mergeObjectsBase'

type cloneObjectOptions = { mapLimit?: number; depthLimit?: number; relevancyRange?: number }

/**
 * Clone objects for manipulation without data corruption, returns a copy of the provided object.
 * NOTE: Use the mapLimit and relevancyRange to resolve "too much recursion" when the object is large and is known to
 * have circular references. A high mapLimit may lead to heavy memory usage and slow performance.
 * @memberOf module:objectHelpers
 * @param {Object} object - The original object that is being cloned
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=100] - Size of temporary reference array used in memory before assessing relevancy.
 * @param {number} [options.depthLimit=-1] - Control how many nested levels deep will be used, -1 = no limit, >-1 = nth level limited.
 * @param {number} [options.relevancyRange=1000] - Total reference map length subtract this range, any relevancy less than that amount at time of evaluation will be removed.
 * @returns {Object}
 */
const cloneObject = (object: object, { mapLimit = 100, depthLimit = -1, relevancyRange = 1000 }: cloneObjectOptions = {}): object =>
  mergeObjectsBase({ mapLimit, depthLimit, relevancyRange, useClone: true })(object)

export default cloneObject
