import 'core-js/stable'
import mergeObjectsBase from './mergeObjectsBase'

/**
 * Clone objects for manipulation without data corruption, returns a copy of the provided object.
 * @function
 * @memberOf module:objectHelpers
 * @param {Object} object - The original object that is being cloned
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=1000]
 * @param {number} [options.depthLimit=-1]
 * @param {number} [options.relevancyRange=100]
 * @param {Iterable} [options.map=[]]
 * @returns {Object}
 */
const cloneObject = (object, { mapLimit = 100, depthLimit = -1, relevancyRange = 100, map = [] } = {}) =>
  mergeObjectsBase({ mapLimit, depthLimit, relevancyRange, map, useClone: true })(object)

export default cloneObject
